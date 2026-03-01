import { z } from "zod/v4";
import { eq, and, desc, sql, count, asc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, businessProcedure } from "../init";
import { db } from "@/lib/db";
import {
  conversations,
  messages,
  customers,
  businesses,
} from "@/lib/db/schema";
import { sendTextMessage } from "@/lib/whatsapp/client";
import { saveMessage } from "@/lib/db/queries";

export const conversationsRouter = createTRPCRouter({
  list: businessProcedure
    .input(
      z
        .object({
          status: z.enum(["active", "escalated", "closed"]).optional(),
          limit: z.number().min(1).max(100).optional().default(50),
          offset: z.number().min(0).optional().default(0),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 50;
      const offset = input?.offset ?? 0;

      const conditions = [eq(conversations.businessId, ctx.businessId)];
      if (input?.status) {
        conditions.push(eq(conversations.status, input.status));
      }

      const [items, [total]] = await Promise.all([
        db
          .select({
            id: conversations.id,
            status: conversations.status,
            escalatedReason: conversations.escalatedReason,
            lastMessageAt: conversations.lastMessageAt,
            startedAt: conversations.startedAt,
            customerId: conversations.customerId,
            customerName: customers.name,
            customerPhone: customers.phone,
            // Last message preview via subquery
            lastMessage:
              sql<string>`(select content from messages where conversation_id = ${conversations.id} order by created_at desc limit 1)`,
            lastMessageDirection:
              sql<string>`(select direction from messages where conversation_id = ${conversations.id} order by created_at desc limit 1)`,
            messageCount:
              sql<number>`(select count(*) from messages where conversation_id = ${conversations.id})::int`,
          })
          .from(conversations)
          .leftJoin(customers, eq(conversations.customerId, customers.id))
          .where(and(...conditions))
          .orderBy(desc(conversations.lastMessageAt))
          .limit(limit)
          .offset(offset),
        db
          .select({ count: count() })
          .from(conversations)
          .where(and(...conditions)),
      ]);

      return { items, total: total?.count ?? 0 };
    }),

  get: businessProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [conv] = await db
        .select({
          id: conversations.id,
          status: conversations.status,
          escalatedReason: conversations.escalatedReason,
          lastMessageAt: conversations.lastMessageAt,
          startedAt: conversations.startedAt,
          customerId: conversations.customerId,
          customerName: customers.name,
          customerPhone: customers.phone,
        })
        .from(conversations)
        .leftJoin(customers, eq(conversations.customerId, customers.id))
        .where(
          and(
            eq(conversations.id, input.id),
            eq(conversations.businessId, ctx.businessId)
          )
        );

      if (!conv) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const msgs = await db
        .select({
          id: messages.id,
          direction: messages.direction,
          messageType: messages.messageType,
          content: messages.content,
          mediaUrl: messages.mediaUrl,
          mediaMimeType: messages.mediaMimeType,
          status: messages.status,
          createdAt: messages.createdAt,
        })
        .from(messages)
        .where(eq(messages.conversationId, input.id))
        .orderBy(asc(messages.createdAt))
        .limit(200);

      return { ...conv, messages: msgs };
    }),

  sendMessage: businessProcedure
    .input(
      z.object({
        conversationId: z.string().uuid(),
        content: z.string().min(1).max(1024),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify conversation belongs to this business
      const [conv] = await db
        .select({
          id: conversations.id,
          customerId: conversations.customerId,
        })
        .from(conversations)
        .where(
          and(
            eq(conversations.id, input.conversationId),
            eq(conversations.businessId, ctx.businessId)
          )
        );

      if (!conv) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      // Get customer phone
      const [customer] = await db
        .select({ phone: customers.phone })
        .from(customers)
        .where(eq(customers.id, conv.customerId!));

      if (!customer) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cliente no encontrado",
        });
      }

      // Get business WA credentials
      const [biz] = await db
        .select({
          waPhoneId: businesses.waPhoneId,
          waAccessToken: businesses.waAccessToken,
        })
        .from(businesses)
        .where(eq(businesses.id, ctx.businessId));

      if (!biz?.waPhoneId || !biz?.waAccessToken) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "WhatsApp no configurado",
        });
      }

      // Send via WhatsApp
      await sendTextMessage(
        {
          phoneNumberId: biz.waPhoneId,
          accessToken: biz.waAccessToken,
        },
        customer.phone,
        input.content
      );

      // Save message record
      const msg = await saveMessage({
        conversationId: input.conversationId,
        businessId: ctx.businessId,
        direction: "outbound",
        messageType: "text",
        content: input.content,
        status: "sent",
      });

      // Update conversation lastMessageAt
      await db
        .update(conversations)
        .set({ lastMessageAt: new Date() })
        .where(eq(conversations.id, input.conversationId));

      return msg;
    }),

  returnToBot: businessProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const [conv] = await db
        .select({ id: conversations.id, status: conversations.status })
        .from(conversations)
        .where(
          and(
            eq(conversations.id, input.id),
            eq(conversations.businessId, ctx.businessId)
          )
        );

      if (!conv) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (conv.status !== "escalated") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Solo se puede devolver al bot conversaciones escaladas",
        });
      }

      const [updated] = await db
        .update(conversations)
        .set({ status: "active", escalatedReason: null })
        .where(eq(conversations.id, input.id))
        .returning();

      return updated;
    }),

  close: businessProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const [conv] = await db
        .select({ id: conversations.id, status: conversations.status })
        .from(conversations)
        .where(
          and(
            eq(conversations.id, input.id),
            eq(conversations.businessId, ctx.businessId)
          )
        );

      if (!conv) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (conv.status === "closed") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "La conversación ya está cerrada",
        });
      }

      const [updated] = await db
        .update(conversations)
        .set({ status: "closed" })
        .where(eq(conversations.id, input.id))
        .returning();

      return updated;
    }),
});

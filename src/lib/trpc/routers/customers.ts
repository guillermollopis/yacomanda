import { z } from "zod/v4";
import { eq, and, desc, or, ilike, count, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, businessProcedure } from "../init";
import { db } from "@/lib/db";
import { customers, orders, conversations } from "@/lib/db/schema";

export const customersRouter = createTRPCRouter({
  list: businessProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          limit: z.number().min(1).max(100).optional().default(20),
          offset: z.number().min(0).optional().default(0),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 20;
      const offset = input?.offset ?? 0;

      const conditions = [eq(customers.businessId, ctx.businessId)];
      if (input?.search) {
        const term = `%${input.search}%`;
        conditions.push(
          or(ilike(customers.name, term), ilike(customers.phone, term))!
        );
      }

      const [items, [total]] = await Promise.all([
        db
          .select({
            id: customers.id,
            name: customers.name,
            phone: customers.phone,
            totalOrders: customers.totalOrders,
            totalSpent: customers.totalSpent,
            lastOrderAt: customers.lastOrderAt,
            createdAt: customers.createdAt,
          })
          .from(customers)
          .where(and(...conditions))
          .orderBy(desc(customers.lastOrderAt))
          .limit(limit)
          .offset(offset),
        db
          .select({ count: count() })
          .from(customers)
          .where(and(...conditions)),
      ]);

      return { items, total: total?.count ?? 0 };
    }),

  get: businessProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [customer] = await db
        .select()
        .from(customers)
        .where(
          and(
            eq(customers.id, input.id),
            eq(customers.businessId, ctx.businessId)
          )
        );

      if (!customer) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [recentOrders, customerConversations] = await Promise.all([
        db
          .select({
            id: orders.id,
            orderNumber: orders.orderNumber,
            total: orders.total,
            status: orders.status,
            createdAt: orders.createdAt,
          })
          .from(orders)
          .where(eq(orders.customerId, input.id))
          .orderBy(desc(orders.createdAt))
          .limit(20),
        db
          .select({
            id: conversations.id,
            status: conversations.status,
            lastMessageAt: conversations.lastMessageAt,
            messageCount:
              sql<number>`(select count(*) from messages where conversation_id = ${conversations.id})::int`,
          })
          .from(conversations)
          .where(eq(conversations.customerId, input.id))
          .orderBy(desc(conversations.lastMessageAt))
          .limit(10),
      ]);

      return {
        ...customer,
        recentOrders,
        conversations: customerConversations,
      };
    }),

  exportAll: businessProcedure.query(async ({ ctx }) => {
    const allCustomers = await db
      .select({
        name: customers.name,
        phone: customers.phone,
        waProfileName: customers.waProfileName,
        notes: customers.notes,
        totalOrders: customers.totalOrders,
        totalSpent: customers.totalSpent,
        lastOrderAt: customers.lastOrderAt,
        createdAt: customers.createdAt,
      })
      .from(customers)
      .where(eq(customers.businessId, ctx.businessId))
      .orderBy(desc(customers.createdAt));

    return allCustomers;
  }),

  updateNotes: businessProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        notes: z.string().max(2000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [customer] = await db
        .select({ id: customers.id })
        .from(customers)
        .where(
          and(
            eq(customers.id, input.id),
            eq(customers.businessId, ctx.businessId)
          )
        );

      if (!customer) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [updated] = await db
        .update(customers)
        .set({ notes: input.notes, updatedAt: new Date() })
        .where(eq(customers.id, input.id))
        .returning();

      return updated;
    }),
});

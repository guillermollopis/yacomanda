import { z } from "zod/v4";
import { eq, and, desc, sql, count, notInArray, inArray, or, isNull, lt } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, businessProcedure } from "../init";
import { db } from "@/lib/db";
import { orders, customers, businesses } from "@/lib/db/schema";
import { sendStatusNotification } from "@/lib/whatsapp/message-sender";
import { saveMessage } from "@/lib/db/queries";

const ACTIVE_STATUSES = ["pending_confirmation", "pending", "confirmed", "paid", "preparing", "ready"];
const TERMINAL_STATUSES = ["completed", "cancelled"];
const PENDING_EXPIRY_MINUTES = 15;

const VALID_TRANSITIONS: Record<string, string[]> = {
  pending_confirmation: ["pending", "cancelled"],
  pending: ["confirmed", "cancelled"],
  confirmed: ["preparing", "cancelled"],
  paid: ["preparing", "cancelled"],
  preparing: ["ready", "cancelled"],
  ready: ["completed", "cancelled"],
};

export const ordersRouter = createTRPCRouter({
  list: businessProcedure
    .input(
      z
        .object({
          status: z.string().optional(),
          limit: z.number().min(1).max(100).optional().default(20),
          offset: z.number().min(0).optional().default(0),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 20;
      const offset = input?.offset ?? 0;

      // Auto-expire old pending_confirmation orders before listing
      const expiryThreshold = new Date(Date.now() - PENDING_EXPIRY_MINUTES * 60_000);
      await db.update(orders)
        .set({ status: "cancelled", updatedAt: new Date() })
        .where(
          and(
            eq(orders.businessId, ctx.businessId),
            eq(orders.status, "pending_confirmation"),
            lt(orders.createdAt, expiryThreshold)
          )
        );

      const conditions = [eq(orders.businessId, ctx.businessId)];
      const status = input?.status;

      if (status === "active") {
        conditions.push(inArray(orders.status, ACTIVE_STATUSES));
      } else if (status === "history") {
        conditions.push(inArray(orders.status, TERMINAL_STATUSES));
      } else if (status) {
        conditions.push(eq(orders.status, status));
      }

      const [items, [total]] = await Promise.all([
        db
          .select({
            id: orders.id,
            orderNumber: orders.orderNumber,
            items: orders.items,
            total: orders.total,
            status: orders.status,
            deliveryType: orders.deliveryType,
            createdAt: orders.createdAt,
            customerName: customers.name,
            customerPhone: customers.phone,
          })
          .from(orders)
          .leftJoin(customers, eq(orders.customerId, customers.id))
          .where(and(...conditions))
          .orderBy(desc(orders.createdAt))
          .limit(limit)
          .offset(offset),
        db
          .select({ count: count() })
          .from(orders)
          .where(and(...conditions)),
      ]);

      return { items, total: total?.count ?? 0 };
    }),

  get: businessProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [order] = await db
        .select({
          id: orders.id,
          orderNumber: orders.orderNumber,
          items: orders.items,
          subtotal: orders.subtotal,
          tax: orders.tax,
          total: orders.total,
          status: orders.status,
          paymentMethod: orders.paymentMethod,
          paymentUrl: orders.paymentUrl,
          paymentPaidAt: orders.paymentPaidAt,
          deliveryType: orders.deliveryType,
          deliveryTime: orders.deliveryTime,
          deliveryAddress: orders.deliveryAddress,
          notes: orders.notes,
          createdAt: orders.createdAt,
          updatedAt: orders.updatedAt,
          customerName: customers.name,
          customerPhone: customers.phone,
          customerId: orders.customerId,
        })
        .from(orders)
        .leftJoin(customers, eq(orders.customerId, customers.id))
        .where(
          and(eq(orders.id, input.id), eq(orders.businessId, ctx.businessId))
        );

      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pedido no encontrado",
        });
      }

      return order;
    }),

  updateStatus: businessProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        status: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [current] = await db
        .select({ status: orders.status })
        .from(orders)
        .where(
          and(eq(orders.id, input.id), eq(orders.businessId, ctx.businessId))
        );

      if (!current) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pedido no encontrado",
        });
      }

      const allowed = VALID_TRANSITIONS[current.status ?? "pending"];
      if (!allowed?.includes(input.status)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `No se puede cambiar de "${current.status}" a "${input.status}"`,
        });
      }

      const [updated] = await db
        .update(orders)
        .set({ status: input.status, updatedAt: new Date() })
        .where(
          and(eq(orders.id, input.id), eq(orders.businessId, ctx.businessId))
        )
        .returning();

      // Send WhatsApp notification to customer (fire-and-forget)
      const NOTIFY_STATUSES = ["confirmed", "preparing", "ready", "completed", "cancelled"];
      if (NOTIFY_STATUSES.includes(input.status) && updated.customerId) {
        (async () => {
          try {
            const [customer] = await db
              .select({ phone: customers.phone })
              .from(customers)
              .where(eq(customers.id, updated.customerId!));
            const [biz] = await db
              .select({
                name: businesses.name,
                waPhoneId: businesses.waPhoneId,
                waAccessToken: businesses.waAccessToken,
              })
              .from(businesses)
              .where(eq(businesses.id, ctx.businessId));

            if (customer?.phone && biz?.waPhoneId && biz?.waAccessToken) {
              await sendStatusNotification(
                { name: biz.name, waPhoneId: biz.waPhoneId, waAccessToken: biz.waAccessToken },
                customer.phone,
                updated.orderNumber,
                input.status
              );

              // Save notification as message if conversation exists
              if (updated.conversationId) {
                const STATUS_LABELS: Record<string, string> = {
                  confirmed: "confirmado",
                  preparing: "en preparación",
                  ready: "listo",
                  completed: "completado",
                  cancelled: "cancelado",
                };
                await saveMessage({
                  conversationId: updated.conversationId,
                  businessId: ctx.businessId,
                  direction: "outbound",
                  messageType: "text",
                  content: `Notificación: Pedido #${updated.orderNumber} ${STATUS_LABELS[input.status] ?? input.status}`,
                });
              }
            }
          } catch (err) {
            console.error("Failed to send status notification:", err);
          }
        })();
      }

      return updated;
    }),

  liveBoard: businessProcedure.query(async ({ ctx }) => {
    const terminalStatuses = ["completed", "cancelled"];
    const items = await db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        items: orders.items,
        total: orders.total,
        status: orders.status,
        deliveryType: orders.deliveryType,
        notes: orders.notes,
        createdAt: orders.createdAt,
        customerName: customers.name,
        customerPhone: customers.phone,
      })
      .from(orders)
      .leftJoin(customers, eq(orders.customerId, customers.id))
      .where(
        and(
          eq(orders.businessId, ctx.businessId),
          or(
            notInArray(orders.status, terminalStatuses),
            isNull(orders.status)
          )
        )
      )
      .orderBy(desc(orders.createdAt));

    return items;
  }),

  stats: businessProcedure.query(async ({ ctx }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [result] = await db
      .select({
        totalOrders: count(),
        revenue: sql<string>`coalesce(sum(${orders.total}::numeric), 0)`,
        avgTicket: sql<string>`coalesce(avg(${orders.total}::numeric), 0)`,
        pendingCount: sql<number>`count(*) filter (where ${orders.status} = 'pending')`,
      })
      .from(orders)
      .where(
        and(
          eq(orders.businessId, ctx.businessId),
          sql`${orders.createdAt} >= ${today}`
        )
      );

    return {
      totalOrders: result?.totalOrders ?? 0,
      revenue: result?.revenue ?? "0",
      avgTicket: result?.avgTicket ?? "0",
      pendingCount: result?.pendingCount ?? 0,
    };
  }),
});

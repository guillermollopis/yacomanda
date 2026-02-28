import { z } from "zod/v4";
import { eq, and, desc, sql, count } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, businessProcedure } from "../init";
import { db } from "@/lib/db";
import { orders, customers } from "@/lib/db/schema";

const VALID_TRANSITIONS: Record<string, string[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["preparing", "cancelled"],
  payment_sent: ["paid", "cancelled"],
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

      const conditions = [eq(orders.businessId, ctx.businessId)];
      if (input?.status) {
        conditions.push(eq(orders.status, input.status));
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

      return updated;
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

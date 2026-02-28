import { z } from "zod/v4";
import { eq, and, sql, desc, count } from "drizzle-orm";
import { createTRPCRouter, businessProcedure } from "../init";
import { db } from "@/lib/db";
import { orders, conversations, customers } from "@/lib/db/schema";

const dateRangeInput = z
  .object({
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
  })
  .optional();

function getDateRange(input?: { from?: Date; to?: Date }) {
  const to = input?.to ?? new Date();
  const from =
    input?.from ?? new Date(to.getTime() - 30 * 24 * 60 * 60 * 1000);
  return { from, to };
}

export const analyticsRouter = createTRPCRouter({
  todaySummary: businessProcedure.query(async ({ ctx }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const [
      [orderStats],
      [escalatedCount],
      recentOrders,
      [yesterdayStats],
    ] = await Promise.all([
      db
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
        ),
      db
        .select({ count: count() })
        .from(conversations)
        .where(
          and(
            eq(conversations.businessId, ctx.businessId),
            eq(conversations.status, "escalated")
          )
        ),
      db
        .select({
          id: orders.id,
          orderNumber: orders.orderNumber,
          total: orders.total,
          status: orders.status,
          createdAt: orders.createdAt,
        })
        .from(orders)
        .where(eq(orders.businessId, ctx.businessId))
        .orderBy(desc(orders.createdAt))
        .limit(10),
      db
        .select({
          totalOrders: count(),
          revenue: sql<string>`coalesce(sum(${orders.total}::numeric), 0)`,
        })
        .from(orders)
        .where(
          and(
            eq(orders.businessId, ctx.businessId),
            sql`${orders.createdAt} >= ${yesterday}`,
            sql`${orders.createdAt} < ${today}`
          )
        ),
    ]);

    return {
      totalOrders: orderStats?.totalOrders ?? 0,
      revenue: orderStats?.revenue ?? "0",
      avgTicket: orderStats?.avgTicket ?? "0",
      pendingCount: orderStats?.pendingCount ?? 0,
      escalatedConversations: escalatedCount?.count ?? 0,
      recentOrders,
      yesterdayOrders: yesterdayStats?.totalOrders ?? 0,
      yesterdayRevenue: yesterdayStats?.revenue ?? "0",
    };
  }),

  ordersByDay: businessProcedure
    .input(dateRangeInput)
    .query(async ({ ctx, input }) => {
      const { from, to } = getDateRange(input);

      const rows = await db
        .select({
          date: sql<string>`to_char(${orders.createdAt}::date, 'YYYY-MM-DD')`,
          count: count(),
        })
        .from(orders)
        .where(
          and(
            eq(orders.businessId, ctx.businessId),
            sql`${orders.createdAt} >= ${from}`,
            sql`${orders.createdAt} <= ${to}`
          )
        )
        .groupBy(sql`${orders.createdAt}::date`)
        .orderBy(sql`${orders.createdAt}::date`);

      return rows;
    }),

  revenueByDay: businessProcedure
    .input(dateRangeInput)
    .query(async ({ ctx, input }) => {
      const { from, to } = getDateRange(input);

      const rows = await db
        .select({
          date: sql<string>`to_char(${orders.createdAt}::date, 'YYYY-MM-DD')`,
          revenue: sql<string>`coalesce(sum(${orders.total}::numeric), 0)`,
        })
        .from(orders)
        .where(
          and(
            eq(orders.businessId, ctx.businessId),
            sql`${orders.createdAt} >= ${from}`,
            sql`${orders.createdAt} <= ${to}`
          )
        )
        .groupBy(sql`${orders.createdAt}::date`)
        .orderBy(sql`${orders.createdAt}::date`);

      return rows;
    }),

  topProducts: businessProcedure
    .input(dateRangeInput)
    .query(async ({ ctx, input }) => {
      const { from, to } = getDateRange(input);

      // items is a jsonb array of {name, quantity, price, ...}
      const rows = await db
        .select({
          name: sql<string>`item->>'name'`,
          totalQuantity: sql<number>`sum((item->>'quantity')::int)`,
          totalRevenue: sql<string>`sum(((item->>'quantity')::int * (item->>'price')::numeric))`,
        })
        .from(
          sql`${orders}, jsonb_array_elements(${orders.items}) as item`
        )
        .where(
          and(
            eq(orders.businessId, ctx.businessId),
            sql`${orders.createdAt} >= ${from}`,
            sql`${orders.createdAt} <= ${to}`
          )
        )
        .groupBy(sql`item->>'name'`)
        .orderBy(sql`sum((item->>'quantity')::int) desc`)
        .limit(10);

      return rows;
    }),

  peakHours: businessProcedure
    .input(dateRangeInput)
    .query(async ({ ctx, input }) => {
      const { from, to } = getDateRange(input);

      const rows = await db
        .select({
          hour: sql<number>`extract(hour from ${orders.createdAt})::int`,
          count: count(),
        })
        .from(orders)
        .where(
          and(
            eq(orders.businessId, ctx.businessId),
            sql`${orders.createdAt} >= ${from}`,
            sql`${orders.createdAt} <= ${to}`
          )
        )
        .groupBy(sql`extract(hour from ${orders.createdAt})`)
        .orderBy(sql`extract(hour from ${orders.createdAt})`);

      return rows;
    }),

  customerBreakdown: businessProcedure
    .input(dateRangeInput)
    .query(async ({ ctx, input }) => {
      const { from, to } = getDateRange(input);

      // A "new" customer placed their first order within the date range
      // A "recurring" customer placed an order but had previous orders before `from`
      const [newCustomers] = await db
        .select({ count: count() })
        .from(customers)
        .where(
          and(
            eq(customers.businessId, ctx.businessId),
            sql`${customers.createdAt} >= ${from}`,
            sql`${customers.createdAt} <= ${to}`,
            sql`${customers.totalOrders} > 0`
          )
        );

      const [totalActive] = await db
        .select({
          count:
            sql<number>`count(distinct ${orders.customerId})`,
        })
        .from(orders)
        .where(
          and(
            eq(orders.businessId, ctx.businessId),
            sql`${orders.createdAt} >= ${from}`,
            sql`${orders.createdAt} <= ${to}`
          )
        );

      const newCount = newCustomers?.count ?? 0;
      const totalCount = Number(totalActive?.count ?? 0);
      const recurringCount = Math.max(0, totalCount - newCount);

      return {
        new: newCount,
        recurring: recurringCount,
        total: totalCount,
      };
    }),
});

import { eq, isNull, or, and } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, adminProcedure } from "../init";
import { db } from "@/lib/db";
import { businesses, users } from "@/lib/db/schema";

const ADMIN_EMAILS = (process.env.ADMIN_EMAIL ?? "soporte@yacomanda.com")
  .split(",")
  .map((e) => e.trim().toLowerCase());

export const adminRouter = createTRPCRouter({
  /** Returns true if the current user is a platform admin. */
  isAdmin: protectedProcedure.query(async ({ ctx }) => {
    const dbUser = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.clerkUserId, ctx.userId))
      .then((rows) => rows[0]);

    return ADMIN_EMAILS.includes(dbUser?.email?.toLowerCase() ?? "");
  }),
  /**
   * List businesses that completed onboarding but still need manual setup
   * (WhatsApp and/or Stripe).
   */
  pendingSetup: adminProcedure.query(async () => {
    const rows = await db
      .select({
        id: businesses.id,
        name: businesses.name,
        phone: businesses.phone,
        city: businesses.city,
        type: businesses.type,
        waPhoneId: businesses.waPhoneId,
        stripeAccountId: businesses.stripeAccountId,
        onboardingCompleted: businesses.onboardingCompleted,
        createdAt: businesses.createdAt,
      })
      .from(businesses)
      .where(
        and(
          eq(businesses.onboardingCompleted, true),
          or(
            isNull(businesses.waPhoneId),
            isNull(businesses.stripeAccountId)
          )
        )
      )
      .orderBy(businesses.createdAt);

    // Get owners for each business
    const businessIds = rows.map((r) => r.id);
    const owners =
      businessIds.length > 0
        ? await db
            .select({
              businessId: users.businessId,
              name: users.name,
              email: users.email,
            })
            .from(users)
            .where(eq(users.role, "owner"))
        : [];

    const ownerMap = new Map(
      owners
        .filter((o) => o.businessId)
        .map((o) => [o.businessId!, { name: o.name, email: o.email }])
    );

    return rows.map((biz) => ({
      ...biz,
      needsWhatsApp: !biz.waPhoneId,
      needsStripe: !biz.stripeAccountId,
      owner: ownerMap.get(biz.id) ?? null,
    }));
  }),
});

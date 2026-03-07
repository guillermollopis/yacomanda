import { z } from "zod/v4";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  businessProcedure,
} from "../init";
import { db } from "@/lib/db";
import { businesses, users, catalogItems } from "@/lib/db/schema";
import { BUSINESS_TYPES, BOT_TONES } from "@/config/constants";
import { sendAdminNewBusinessEmail } from "@/lib/email/resend";

export const onboardingRouter = createTRPCRouter({
  /**
   * Get the current onboarding status for the logged-in user.
   * Works even if the user has no business yet.
   */
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    const dbUser = await db
      .select({
        id: users.id,
        businessId: users.businessId,
      })
      .from(users)
      .where(eq(users.clerkUserId, ctx.userId))
      .then((rows) => rows[0]);

    if (!dbUser?.businessId) {
      return { hasBusinessId: false, onboardingCompleted: false, business: null };
    }

    const [biz] = await db
      .select({
        id: businesses.id,
        name: businesses.name,
        type: businesses.type,
        city: businesses.city,
        phone: businesses.phone,
        waPhoneId: businesses.waPhoneId,
        botActive: businesses.botActive,
        botTone: businesses.botTone,
        welcomeMessage: businesses.welcomeMessage,
        stripeAccountId: businesses.stripeAccountId,
        onboardingCompleted: businesses.onboardingCompleted,
      })
      .from(businesses)
      .where(eq(businesses.id, dbUser.businessId));

    if (!biz) {
      return { hasBusinessId: false, onboardingCompleted: false, business: null };
    }

    // Count catalog items to know if step 3 is done
    const catalogCount = await db
      .select({ id: catalogItems.id })
      .from(catalogItems)
      .where(eq(catalogItems.businessId, biz.id))
      .limit(1);

    return {
      hasBusinessId: true,
      onboardingCompleted: biz.onboardingCompleted ?? false,
      business: {
        ...biz,
        hasCatalogItems: catalogCount.length > 0,
      },
    };
  }),

  /**
   * Step 1: Create business and link the current user as owner.
   */
  createBusiness: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(200),
        type: z.enum(BUSINESS_TYPES),
        city: z.string().min(1).max(100),
        phone: z.string().min(1).max(20),
        notificationPhone: z.string().max(20).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if user already has a business
      const dbUser = await db
        .select({ id: users.id, businessId: users.businessId })
        .from(users)
        .where(eq(users.clerkUserId, ctx.userId))
        .then((rows) => rows[0]);

      if (!dbUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Usuario no encontrado",
        });
      }

      if (dbUser.businessId) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Ya tienes un negocio",
        });
      }

      // Generate a slug from the name
      const slug =
        input.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") +
        "-" +
        Date.now().toString(36);

      const [biz] = await db
        .insert(businesses)
        .values({
          name: input.name,
          slug,
          type: input.type,
          city: input.city,
          phone: input.phone,
          notificationPhone: input.notificationPhone?.replace(/[\s\-()]/g, ""),
        })
        .returning();

      // Link user as owner
      await db
        .update(users)
        .set({ businessId: biz.id, role: "owner" })
        .where(eq(users.id, dbUser.id));

      return biz;
    }),

  /**
   * Step 3: Add a catalog item (simplified for onboarding).
   */
  addCatalogItem: businessProcedure
    .input(
      z.object({
        name: z.string().min(1).max(200),
        price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Precio inválido"),
        category: z.string().max(100).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [item] = await db
        .insert(catalogItems)
        .values({
          businessId: ctx.businessId,
          name: input.name,
          price: input.price,
          category: input.category,
        })
        .returning();

      return item;
    }),

  /**
   * Step 5: Update bot configuration.
   */
  updateBotConfig: businessProcedure
    .input(
      z.object({
        botTone: z.enum(BOT_TONES),
        welcomeMessage: z.string().max(500).optional(),
        minPreparationMinutes: z.number().min(0).max(240).optional(),
        kitchenSchedule: z.record(
          z.string(),
          z.object({ open: z.string(), close: z.string() })
        ).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [updated] = await db
        .update(businesses)
        .set({ ...input, updatedAt: new Date() })
        .where(eq(businesses.id, ctx.businessId))
        .returning();

      return updated;
    }),

  /**
   * Step 6: Mark onboarding as complete + activate bot.
   * Sends admin email notification.
   */
  complete: businessProcedure.mutation(async ({ ctx }) => {
    const [updated] = await db
      .update(businesses)
      .set({
        onboardingCompleted: true,
        botActive: true,
        updatedAt: new Date(),
      })
      .where(eq(businesses.id, ctx.businessId))
      .returning();

    // Get owner info for the notification email
    const [owner] = await db
      .select({ name: users.name, email: users.email })
      .from(users)
      .where(eq(users.id, ctx.dbUserId));

    // Send admin notification (fire-and-forget)
    sendAdminNewBusinessEmail({
      name: updated.name,
      phone: updated.phone,
      city: updated.city ?? "",
      type: updated.type,
      ownerName: owner?.name ?? "",
      ownerEmail: owner?.email ?? "",
      needsWhatsApp: !updated.waPhoneId,
      needsStripe: !updated.stripeAccountId,
    }).catch(() => {});

    return updated;
  }),
});

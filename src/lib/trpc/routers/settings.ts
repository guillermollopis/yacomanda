import { z } from "zod/v4";
import { eq, and, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, businessProcedure } from "../init";
import { db } from "@/lib/db";
import { businesses } from "@/lib/db/schema";
import {
  createConnectAccountLink,
  getConnectAccountStatus,
} from "@/lib/payments/connect";
import { createBillingPortalSession, createCheckoutSession } from "@/lib/payments/billing";
import { BOT_TONES, DELIVERY_TYPES } from "@/config/constants";
import {
  exchangeCodeForToken,
  exchangeForLongLivedToken,
  subscribeApp,
  registerPhoneNumber,
  getPhoneNumber,
  discoverWhatsAppAccount,
} from "@/lib/whatsapp/embedded-signup";

export const settingsRouter = createTRPCRouter({
  getBusinessHeader: businessProcedure.query(async ({ ctx }) => {
    const [biz] = await db
      .select({
        name: businesses.name,
        plan: businesses.plan,
        subscriptionStatus: businesses.subscriptionStatus,
      })
      .from(businesses)
      .where(eq(businesses.id, ctx.businessId));

    if (!biz) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return biz;
  }),

  getBusinessSettings: businessProcedure.query(async ({ ctx }) => {
    const [biz] = await db
      .select()
      .from(businesses)
      .where(eq(businesses.id, ctx.businessId));

    if (!biz) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return {
      name: biz.name,
      phone: biz.phone,
      email: biz.email,
      address: biz.address,
      city: biz.city,
      postalCode: biz.postalCode,
      timezone: biz.timezone,
      currency: biz.currency,
      locale: biz.locale,
      waPhoneId: biz.waPhoneId,
      botActive: biz.botActive,
      botTone: biz.botTone,
      welcomeMessage: biz.welcomeMessage,
      minPreparationMinutes: biz.minPreparationMinutes,
      deliveryEnabled: biz.deliveryEnabled,
      pickupEnabled: biz.pickupEnabled,
      kitchenSchedule: biz.kitchenSchedule,
      notificationPhone: biz.notificationPhone,
      bizumPhone: biz.bizumPhone,
    };
  }),

  updateBusinessSettings: businessProcedure
    .input(
      z.object({
        name: z.string().min(1).optional(),
        phone: z.string().min(1).optional(),
        email: z.string().email().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        postalCode: z.string().optional(),
        botActive: z.boolean().optional(),
        botTone: z.enum(BOT_TONES).optional(),
        welcomeMessage: z.string().max(500).optional(),
        minPreparationMinutes: z.number().min(0).max(240).optional(),
        deliveryEnabled: z.boolean().optional(),
        pickupEnabled: z.boolean().optional(),
        kitchenSchedule: z
          .record(
            z.string(),
            z.object({ open: z.string(), close: z.string() })
          )
          .optional(),
        notificationPhone: z.string().max(20).optional(),
        bizumPhone: z.string().max(20).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.role === "staff") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Solo admin u owner pueden cambiar ajustes",
        });
      }

      const [updated] = await db
        .update(businesses)
        .set({ ...input, updatedAt: new Date() })
        .where(eq(businesses.id, ctx.businessId))
        .returning();

      return updated;
    }),

  getPaymentStatus: businessProcedure.query(async ({ ctx }) => {
    const [biz] = await db
      .select({
        stripeAccountId: businesses.stripeAccountId,
      })
      .from(businesses)
      .where(eq(businesses.id, ctx.businessId));

    if (!biz?.stripeAccountId) {
      return { connected: false, chargesEnabled: false, payoutsEnabled: false, detailsSubmitted: false };
    }

    const status = await getConnectAccountStatus(biz.stripeAccountId);
    return { connected: true, ...status };
  }),

  createConnectLink: businessProcedure.mutation(async ({ ctx }) => {
    if (ctx.role === "staff") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Solo admin u owner pueden conectar Stripe",
      });
    }

    const [biz] = await db
      .select({ stripeAccountId: businesses.stripeAccountId })
      .from(businesses)
      .where(eq(businesses.id, ctx.businessId));

    const { accountId, url } = await createConnectAccountLink(
      ctx.businessId,
      biz?.stripeAccountId
    );

    // Save the account ID if it's new
    if (!biz?.stripeAccountId) {
      await db
        .update(businesses)
        .set({ stripeAccountId: accountId, updatedAt: new Date() })
        .where(eq(businesses.id, ctx.businessId));
    }

    return { url };
  }),

  getBillingStatus: businessProcedure.query(async ({ ctx }) => {
    const [biz] = await db
      .select({
        plan: businesses.plan,
        subscriptionStatus: businesses.subscriptionStatus,
        monthlyOrderCount: businesses.monthlyOrderCount,
        monthlyOrderLimit: businesses.monthlyOrderLimit,
        trialEndsAt: businesses.trialEndsAt,
        stripeCustomerId: businesses.stripeCustomerId,
      })
      .from(businesses)
      .where(eq(businesses.id, ctx.businessId));

    if (!biz) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return biz;
  }),

  createPortalLink: businessProcedure.mutation(async ({ ctx }) => {
    if (ctx.role === "staff") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Solo admin u owner pueden gestionar facturación",
      });
    }

    const [biz] = await db
      .select({ stripeCustomerId: businesses.stripeCustomerId })
      .from(businesses)
      .where(eq(businesses.id, ctx.businessId));

    if (!biz?.stripeCustomerId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No hay suscripción activa",
      });
    }

    const { url } = await createBillingPortalSession(biz.stripeCustomerId);
    return { url };
  }),

  createCheckoutLink: businessProcedure
    .input(z.object({ plan: z.enum(["esencial", "profesional", "negocio"]) }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.role === "staff") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Solo admin u owner pueden cambiar de plan",
        });
      }

      const [biz] = await db
        .select({ stripeCustomerId: businesses.stripeCustomerId })
        .from(businesses)
        .where(eq(businesses.id, ctx.businessId));

      const { url } = await createCheckoutSession(
        ctx.businessId,
        input.plan,
        biz?.stripeCustomerId
      );
      return { url };
    }),

  getWhatsAppStatus: businessProcedure.query(async ({ ctx }) => {
    const [biz] = await db
      .select({
        waPhoneId: businesses.waPhoneId,
        waBusinessId: businesses.waBusinessId,
        phone: businesses.phone,
      })
      .from(businesses)
      .where(eq(businesses.id, ctx.businessId));

    if (!biz) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return {
      connected: !!biz.waPhoneId,
      phoneNumber: biz.phone ?? undefined,
      waBusinessId: biz.waBusinessId ?? undefined,
    };
  }),

  connectWhatsApp: businessProcedure
    .input(
      z.object({
        code: z.string().min(1),
        redirectUri: z.string().optional(),
        wabaId: z.string().min(1).optional(),
        phoneNumberId: z.string().min(1).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.role === "staff") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Solo admin u owner pueden conectar WhatsApp",
        });
      }

      // 1. Exchange auth code for short-lived token
      const shortToken = await exchangeCodeForToken(
        input.code,
        input.redirectUri
      );

      // 2. Exchange for long-lived token (~60 days)
      const longToken = await exchangeForLongLivedToken(shortToken);

      // 3. Discover WABA and phone number if not provided
      let wabaId = input.wabaId;
      let phoneNumberId = input.phoneNumberId;
      let displayPhone: string | undefined;

      if (!wabaId || !phoneNumberId) {
        const discovered = await discoverWhatsAppAccount(longToken);
        wabaId = discovered.wabaId;
        phoneNumberId = discovered.phoneNumberId;
        displayPhone = discovered.displayPhoneNumber;
      }

      // 4. Subscribe WABA to our app's webhooks
      await subscribeApp(wabaId, longToken);

      // 5. Register phone number for messaging (skip if already registered via Embedded Signup)
      try {
        await registerPhoneNumber(phoneNumberId, longToken);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "";
        // PIN mismatch or already registered — safe to continue
        if (!msg.includes("133005") && !msg.includes("already registered")) {
          throw e;
        }
      }

      // 6. Get display phone number (if not from discovery)
      if (!displayPhone) {
        const phoneInfo = await getPhoneNumber(phoneNumberId, longToken);
        displayPhone = phoneInfo.displayPhoneNumber;
      }

      // 7. Clear this phone ID from any other business (prevent routing conflicts)
      await db
        .update(businesses)
        .set({ waPhoneId: null, waAccessToken: null, waBusinessId: null })
        .where(
          and(
            eq(businesses.waPhoneId, phoneNumberId),
            sql`${businesses.id} != ${ctx.businessId}`
          )
        );

      // 8. Update business record
      await db
        .update(businesses)
        .set({
          waPhoneId: phoneNumberId,
          waAccessToken: longToken,
          waBusinessId: wabaId,
          botActive: true,
          updatedAt: new Date(),
        })
        .where(eq(businesses.id, ctx.businessId));

      return {
        success: true,
        phoneNumber: displayPhone,
      };
    }),
});

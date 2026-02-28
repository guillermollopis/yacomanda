import { z } from "zod/v4";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, businessProcedure } from "../init";
import { db } from "@/lib/db";
import { businesses } from "@/lib/db/schema";
import {
  createConnectAccountLink,
  getConnectAccountStatus,
} from "@/lib/payments/connect";
import { createBillingPortalSession } from "@/lib/payments/billing";
import { BOT_TONES, DELIVERY_TYPES } from "@/config/constants";

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
});

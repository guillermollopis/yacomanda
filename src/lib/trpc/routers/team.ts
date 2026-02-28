import { z } from "zod/v4";
import { eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, businessProcedure } from "../init";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { USER_ROLES } from "@/config/constants";

export const teamRouter = createTRPCRouter({
  list: businessProcedure.query(async ({ ctx }) => {
    const members = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.businessId, ctx.businessId));

    return members;
  }),

  updateRole: businessProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        role: z.enum(USER_ROLES),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.role !== "owner") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Solo el owner puede cambiar roles",
        });
      }

      // Cannot change own role
      if (input.userId === ctx.dbUserId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No puedes cambiar tu propio rol",
        });
      }

      const [member] = await db
        .select({ id: users.id })
        .from(users)
        .where(
          and(
            eq(users.id, input.userId),
            eq(users.businessId, ctx.businessId)
          )
        );

      if (!member) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [updated] = await db
        .update(users)
        .set({ role: input.role })
        .where(eq(users.id, input.userId))
        .returning();

      return updated;
    }),

  remove: businessProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.role !== "owner") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Solo el owner puede eliminar miembros",
        });
      }

      // Cannot remove self
      if (input.userId === ctx.dbUserId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No puedes eliminarte a ti mismo",
        });
      }

      const [member] = await db
        .select({ id: users.id, role: users.role })
        .from(users)
        .where(
          and(
            eq(users.id, input.userId),
            eq(users.businessId, ctx.businessId)
          )
        );

      if (!member) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (member.role === "owner") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No se puede eliminar al owner",
        });
      }

      await db.delete(users).where(eq(users.id, input.userId));

      return { success: true };
    }),

  invite: businessProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1),
        role: z.enum(USER_ROLES),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.role === "staff") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Solo admin u owner pueden invitar miembros",
        });
      }

      // Check if email already exists in this business
      const existing = await db
        .select({ id: users.id })
        .from(users)
        .where(
          and(
            eq(users.businessId, ctx.businessId),
            eq(users.email, input.email)
          )
        );

      if (existing.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Ya existe un miembro con este email",
        });
      }

      // Create a placeholder user — when they sign up via Clerk,
      // the Clerk webhook will link them by email
      const [member] = await db
        .insert(users)
        .values({
          businessId: ctx.businessId,
          clerkUserId: `pending_${Date.now()}`,
          email: input.email,
          name: input.name,
          role: input.role,
        })
        .returning();

      return member;
    }),
});

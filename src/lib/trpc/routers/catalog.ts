import { z } from "zod/v4";
import { eq, and, asc, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, businessProcedure } from "../init";
import { db } from "@/lib/db";
import { catalogItems } from "@/lib/db/schema";
import { ALLERGENS } from "@/config/constants";
import { extractMenuFromImage } from "@/lib/ai/menu-extractor";

const catalogItemInput = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Precio inválido"),
  category: z.string().max(100).optional(),
  variants: z
    .array(
      z.object({
        name: z.string(),
        price: z.string().regex(/^\d+(\.\d{1,2})?$/),
      })
    )
    .optional()
    .default([]),
  allergens: z
    .array(z.enum(ALLERGENS))
    .optional()
    .default([]),
  imageUrl: z.string().url().optional(),
});

export const catalogRouter = createTRPCRouter({
  list: businessProcedure
    .input(
      z
        .object({
          category: z.string().optional(),
          availableOnly: z.boolean().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const conditions = [eq(catalogItems.businessId, ctx.businessId)];

      if (input?.category) {
        conditions.push(eq(catalogItems.category, input.category));
      }
      if (input?.availableOnly) {
        conditions.push(eq(catalogItems.available, true));
      }

      return db
        .select()
        .from(catalogItems)
        .where(and(...conditions))
        .orderBy(asc(catalogItems.category), asc(catalogItems.sortOrder));
    }),

  create: businessProcedure
    .input(catalogItemInput)
    .mutation(async ({ ctx, input }) => {
      const [maxOrder] = await db
        .select({ max: sql<number>`coalesce(max(${catalogItems.sortOrder}), 0)` })
        .from(catalogItems)
        .where(eq(catalogItems.businessId, ctx.businessId));

      const [item] = await db
        .insert(catalogItems)
        .values({
          businessId: ctx.businessId,
          name: input.name,
          description: input.description,
          price: input.price,
          category: input.category,
          variants: input.variants,
          allergens: input.allergens,
          imageUrl: input.imageUrl,
          sortOrder: (maxOrder?.max ?? 0) + 1,
        })
        .returning();

      return item;
    }),

  update: businessProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: catalogItemInput.partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [item] = await db
        .update(catalogItems)
        .set({
          ...input.data,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(catalogItems.id, input.id),
            eq(catalogItems.businessId, ctx.businessId)
          )
        )
        .returning();

      if (!item) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Item no encontrado" });
      }

      return item;
    }),

  delete: businessProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const [item] = await db
        .delete(catalogItems)
        .where(
          and(
            eq(catalogItems.id, input.id),
            eq(catalogItems.businessId, ctx.businessId)
          )
        )
        .returning();

      if (!item) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Item no encontrado" });
      }

      return { success: true };
    }),

  importFromImage: businessProcedure
    .input(
      z.object({
        image: z.string().min(1), // base64
        mimeType: z.string().default("image/jpeg"),
      })
    )
    .mutation(async ({ input }) => {
      const items = await extractMenuFromImage(input.image, input.mimeType);
      if (items.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "No se pudieron extraer productos de la imagen. Asegúrate de que sea una foto clara de tu carta.",
        });
      }
      return { items };
    }),

  toggleAvailable: businessProcedure
    .input(z.object({ id: z.string().uuid(), available: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const [item] = await db
        .update(catalogItems)
        .set({ available: input.available, updatedAt: new Date() })
        .where(
          and(
            eq(catalogItems.id, input.id),
            eq(catalogItems.businessId, ctx.businessId)
          )
        )
        .returning();

      if (!item) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Item no encontrado" });
      }

      return item;
    }),
});

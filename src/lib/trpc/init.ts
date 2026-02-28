import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "@clerk/nextjs/server";
import superjson from "superjson";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function createTRPCContext() {
  const { userId } = await auth();
  return { userId };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, userId: ctx.userId } });
});

const ADMIN_EMAILS = (process.env.ADMIN_EMAIL ?? "soporte@yacomanda.com")
  .split(",")
  .map((e) => e.trim().toLowerCase());

export const adminProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const dbUser = await db
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(eq(users.clerkUserId, ctx.userId))
      .then((rows) => rows[0]);

    if (!dbUser || !ADMIN_EMAILS.includes(dbUser.email.toLowerCase())) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Admin access required",
      });
    }

    return next({
      ctx: { ...ctx, dbUserId: dbUser.id },
    });
  }
);

export const businessProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const dbUser = await db
      .select({
        id: users.id,
        businessId: users.businessId,
        role: users.role,
      })
      .from(users)
      .where(eq(users.clerkUserId, ctx.userId))
      .then((rows) => rows[0]);

    if (!dbUser?.businessId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "No business associated with this user",
      });
    }

    return next({
      ctx: {
        ...ctx,
        dbUserId: dbUser.id,
        businessId: dbUser.businessId,
        role: dbUser.role ?? "staff",
      },
    });
  }
);

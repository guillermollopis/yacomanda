import { createTRPCRouter, publicProcedure, protectedProcedure } from "./init";

export const appRouter = createTRPCRouter({
  healthCheck: publicProcedure.query(() => {
    return { status: "ok" };
  }),

  // Placeholder routers — will be expanded in later blocks
  me: protectedProcedure.query(({ ctx }) => {
    return { userId: ctx.userId };
  }),
});

export type AppRouter = typeof appRouter;

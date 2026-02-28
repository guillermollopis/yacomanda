import { createTRPCRouter, publicProcedure, protectedProcedure } from "./init";
import { catalogRouter } from "./routers/catalog";
import { ordersRouter } from "./routers/orders";
import { analyticsRouter } from "./routers/analytics";
import { settingsRouter } from "./routers/settings";
import { customersRouter } from "./routers/customers";
import { conversationsRouter } from "./routers/conversations";
import { teamRouter } from "./routers/team";
import { onboardingRouter } from "./routers/onboarding";
import { adminRouter } from "./routers/admin";

export const appRouter = createTRPCRouter({
  healthCheck: publicProcedure.query(() => {
    return { status: "ok" };
  }),

  me: protectedProcedure.query(({ ctx }) => {
    return { userId: ctx.userId };
  }),

  catalog: catalogRouter,
  orders: ordersRouter,
  analytics: analyticsRouter,
  settings: settingsRouter,
  customers: customersRouter,
  conversations: conversationsRouter,
  team: teamRouter,
  onboarding: onboardingRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;

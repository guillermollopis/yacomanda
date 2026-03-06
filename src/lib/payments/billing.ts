import { getStripe } from "./stripe";
import { APP_URL } from "@/config/constants";

export async function createBillingPortalSession(stripeCustomerId: string) {
  const stripe = getStripe();

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${APP_URL}/billing`,
  });

  return { url: session.url };
}

const PLAN_PRICES: Record<string, string | undefined> = {
  esencial: process.env.STRIPE_PRICE_ESENCIAL,
  profesional: process.env.STRIPE_PRICE_PROFESIONAL,
  negocio: process.env.STRIPE_PRICE_NEGOCIO,
};

export async function createCheckoutSession(
  businessId: string,
  plan: string,
  stripeCustomerId?: string | null
) {
  const stripe = getStripe();
  const priceId = PLAN_PRICES[plan];
  if (!priceId) throw new Error(`No price configured for plan: ${plan}`);

  const params: Record<string, unknown> = {
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${APP_URL}/billing?upgraded=1`,
    cancel_url: `${APP_URL}/billing`,
    metadata: { businessId, plan },
    subscription_data: { metadata: { businessId, plan } },
  };

  if (stripeCustomerId) {
    params.customer = stripeCustomerId;
  }

  const session = await stripe.checkout.sessions.create(
    params as Parameters<typeof stripe.checkout.sessions.create>[0]
  );

  return { url: session.url! };
}

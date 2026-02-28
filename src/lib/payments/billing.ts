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

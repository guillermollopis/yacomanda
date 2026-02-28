import { getStripe } from "./stripe";
import { APP_URL } from "@/config/constants";

export async function createConnectAccountLink(
  businessId: string,
  stripeAccountId?: string | null
) {
  const stripe = getStripe();

  let accountId = stripeAccountId;

  if (!accountId) {
    const account = await stripe.accounts.create({
      type: "standard",
      metadata: { businessId },
    });
    accountId = account.id;
  }

  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${APP_URL}/settings/payments?refresh=true`,
    return_url: `${APP_URL}/settings/payments?success=true`,
    type: "account_onboarding",
  });

  return { accountId, url: accountLink.url };
}

export async function getConnectAccountStatus(stripeAccountId: string) {
  const stripe = getStripe();
  const account = await stripe.accounts.retrieve(stripeAccountId);

  return {
    chargesEnabled: account.charges_enabled,
    payoutsEnabled: account.payouts_enabled,
    detailsSubmitted: account.details_submitted,
  };
}

export async function createPaymentLink({
  stripeAccountId,
  amount,
  currency,
  orderNumber,
  orderId,
}: {
  stripeAccountId: string;
  amount: number;
  currency: string;
  orderNumber: number;
  orderId: string;
}) {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create(
    {
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: { name: `Pedido #${orderNumber}` },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { orderId },
      success_url: `${APP_URL}/orders/${orderId}?paid=true`,
      cancel_url: `${APP_URL}/orders/${orderId}?cancelled=true`,
    },
    { stripeAccount: stripeAccountId }
  );

  return { url: session.url, sessionId: session.id };
}

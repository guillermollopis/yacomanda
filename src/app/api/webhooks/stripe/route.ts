import { NextResponse } from "next/server";
import { getStripe } from "@/lib/payments/stripe";
import { getServerEnv } from "@/config/env";
import { db } from "@/lib/db";
import { orders, businesses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const stripe = getStripe();
  const env = getServerEnv();

  const connectAccountId = req.headers.get("Stripe-Account");
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const secret = connectAccountId
      ? env.STRIPE_CONNECT_WEBHOOK_SECRET
      : env.STRIPE_WEBHOOK_SECRET;

    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (connectAccountId) {
      await handleConnectEvent(event);
    } else {
      await handleBillingEvent(event);
    }
  } catch (err) {
    console.error("Stripe webhook handler error:", err);
  }

  return NextResponse.json({ received: true });
}

async function handleConnectEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (orderId) {
        await db
          .update(orders)
          .set({
            status: "paid",
            paymentPaidAt: new Date(),
            paymentId: session.payment_intent as string,
            updatedAt: new Date(),
          })
          .where(eq(orders.id, orderId));
      }
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (orderId) {
        await db
          .update(orders)
          .set({ paymentUrl: null, updatedAt: new Date() })
          .where(eq(orders.id, orderId));
      }
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      const paymentIntent = charge.payment_intent as string;
      if (paymentIntent) {
        await db
          .update(orders)
          .set({ status: "cancelled", updatedAt: new Date() })
          .where(eq(orders.paymentId, paymentIntent));
      }
      break;
    }
  }
}

function extractCustomerId(
  customer: string | { id: string } | null | undefined
): string | null {
  if (!customer) return null;
  if (typeof customer === "string") return customer;
  return customer.id;
}

async function handleBillingEvent(event: Stripe.Event) {
  switch (event.type) {
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = extractCustomerId(invoice.customer);
      const subscriptionId =
        invoice.parent?.subscription_details?.subscription ?? null;
      if (customerId) {
        await db
          .update(businesses)
          .set({
            subscriptionStatus: "active",
            stripeSubscriptionId:
              typeof subscriptionId === "string" ? subscriptionId : null,
            updatedAt: new Date(),
          })
          .where(eq(businesses.stripeCustomerId, customerId));
      }
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = extractCustomerId(invoice.customer);
      if (customerId) {
        await db
          .update(businesses)
          .set({ subscriptionStatus: "past_due", updatedAt: new Date() })
          .where(eq(businesses.stripeCustomerId, customerId));
      }
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = extractCustomerId(subscription.customer);
      if (customerId) {
        await db
          .update(businesses)
          .set({
            subscriptionStatus: "cancelled",
            stripeSubscriptionId: null,
            updatedAt: new Date(),
          })
          .where(eq(businesses.stripeCustomerId, customerId));
      }
      break;
    }
  }
}

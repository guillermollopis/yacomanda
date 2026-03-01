import { sendTextMessage, sendInteractiveMessage } from "./client";
import type { WaApiOptions } from "./client";

interface BusinessContext {
  name: string;
  waPhoneId: string;
  waAccessToken: string;
}

function toOpts(biz: BusinessContext): WaApiOptions {
  return { phoneNumberId: biz.waPhoneId, accessToken: biz.waAccessToken };
}

export async function sendWelcome(
  business: BusinessContext,
  to: string,
  customMessage?: string
) {
  const text =
    customMessage ??
    `¡Hola! Bienvenido a ${business.name}. ¿En qué podemos ayudarte?`;
  return sendTextMessage(toOpts(business), to, text);
}

export async function sendOrderConfirmation(
  business: BusinessContext,
  to: string,
  order: {
    orderNumber: number;
    items: Array<{ name: string; quantity: number; price: string }>;
    total: string;
  }
) {
  const lines = order.items
    .map((i) => `• ${i.quantity}x ${i.name} — ${i.price}€`)
    .join("\n");
  const text = [
    `✅ *Pedido #${order.orderNumber} confirmado*`,
    "",
    lines,
    "",
    `*Total: ${order.total}€*`,
    "",
    "Te avisaremos cuando esté listo. ¡Gracias!",
  ].join("\n");
  return sendTextMessage(toOpts(business), to, text);
}

export async function sendEscalationNotice(
  business: BusinessContext,
  to: string
) {
  const text = `Un miembro del equipo de ${business.name} te atenderá personalmente en breve. ¡Gracias por tu paciencia!`;
  return sendTextMessage(toOpts(business), to, text);
}

export async function sendOrderSummaryWithButtons(
  business: BusinessContext,
  to: string,
  orderId: string,
  summaryText: string
) {
  return sendInteractiveMessage(toOpts(business), to, {
    type: "button",
    body: { text: summaryText },
    action: {
      buttons: [
        {
          type: "reply",
          reply: { id: `confirm_order:${orderId}`, title: "Confirmar" },
        },
        {
          type: "reply",
          reply: { id: `cancel_order:${orderId}`, title: "Cancelar" },
        },
      ],
    },
  });
}

const STATUS_MESSAGES: Record<string, (orderNumber: number, businessName: string) => string> = {
  confirmed: (n, biz) =>
    `✅ *Pedido #${n} confirmado*\n\n${biz} ha confirmado tu pedido. Te avisaremos cuando esté listo.`,
  preparing: (n) =>
    `👨‍🍳 *Pedido #${n} en preparación*\n\nTu pedido se está preparando ahora mismo.`,
  ready: (n) =>
    `🔔 *Pedido #${n} listo*\n\n¡Tu pedido está listo para recoger!`,
  completed: (n) =>
    `✅ *Pedido #${n} completado*\n\n¡Gracias por tu pedido! Esperamos verte pronto.`,
  cancelled: (n) =>
    `❌ *Pedido #${n} cancelado*\n\nTu pedido ha sido cancelado. Si tienes dudas, escríbenos.`,
};

export async function sendStatusNotification(
  business: BusinessContext,
  to: string,
  orderNumber: number,
  status: string
) {
  const builder = STATUS_MESSAGES[status];
  if (!builder) return null;
  const text = builder(orderNumber, business.name);
  return sendTextMessage(toOpts(business), to, text);
}

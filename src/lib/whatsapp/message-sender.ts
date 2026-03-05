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

// --- Owner notification functions ---

interface OrderForOwnerNotification {
  id: string;
  orderNumber: number;
  items: Array<{ name: string; quantity: number; unitPrice: string; lineTotal: string }>;
  total: string;
  deliveryType: string | null;
}

export async function sendOwnerNewOrderNotification(
  business: BusinessContext,
  to: string,
  order: OrderForOwnerNotification
) {
  const lines = order.items
    .map((i) => `${i.quantity}x ${i.name} — ${i.lineTotal}€`)
    .join("\n");
  const delivery = order.deliveryType === "delivery" ? "Envío a domicilio" : "Recogida";

  const body = [
    `🔔 *Nuevo pedido #${order.orderNumber}*`,
    "",
    lines,
    "",
    `*Total: ${order.total}€*`,
    `📦 ${delivery}`,
  ].join("\n");

  return sendInteractiveMessage(toOpts(business), to, {
    type: "button",
    body: { text: body },
    action: {
      buttons: [
        {
          type: "reply",
          reply: { id: `owner_accept:${order.id}`, title: "✅ Aceptar" },
        },
        {
          type: "reply",
          reply: { id: `owner_reject:${order.id}`, title: "❌ Rechazar" },
        },
      ],
    },
  });
}

const OWNER_ADVANCE_CONFIG: Record<string, { buttonId: string; buttonTitle: string; bodyText: string }> = {
  confirmed: {
    buttonId: "owner_preparing",
    buttonTitle: "👨‍🍳 Preparando",
    bodyText: "aceptado. ¿Está en preparación?",
  },
  preparing: {
    buttonId: "owner_ready",
    buttonTitle: "✅ Listo",
    bodyText: "en preparación. ¿Está listo?",
  },
};

export async function sendOwnerAdvanceButton(
  business: BusinessContext,
  to: string,
  orderId: string,
  orderNumber: number,
  currentStatus: string
) {
  const config = OWNER_ADVANCE_CONFIG[currentStatus];
  if (!config) return null;

  return sendInteractiveMessage(toOpts(business), to, {
    type: "button",
    body: { text: `Pedido #${orderNumber} ${config.bodyText}` },
    action: {
      buttons: [
        {
          type: "reply",
          reply: { id: `${config.buttonId}:${orderId}`, title: config.buttonTitle },
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

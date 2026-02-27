import { sendTextMessage } from "./client";
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

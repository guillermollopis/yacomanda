import {
  findBusinessByWaPhoneId,
  findOrCreateCustomer,
  findOrCreateConversation,
  saveMessage,
  getConversationHistory,
  getCatalogItems,
  updateMessageStatus,
  getNextOrderNumber,
  createOrder,
  updateOrderStatusById,
  incrementCustomerStats,
  incrementBusinessOrderCount,
  getCustomerLastOrder,
  getOrderWithCustomerPhone,
} from "@/lib/db/queries";
import { sendTextMessage, markAsRead, downloadMedia } from "./client";
import {
  sendOrderSummaryWithButtons,
  sendEscalationNotice,
  sendOrderConfirmation,
  sendStatusNotification,
  sendOwnerNewOrderNotification,
  sendOwnerAdvanceButton,
} from "./message-sender";
import { buildSystemPrompt } from "@/lib/ai/prompt-builder";
import { parseOrder } from "@/lib/ai/order-parser";
import type { ParsedAiResponse } from "@/lib/ai/order-parser";
import { transcribeAudio } from "@/lib/ai/whisper";
import { uploadMedia } from "@/lib/storage/r2";
import {
  matchAndPriceItems,
  calculateOrderTotals,
  buildOrderSummaryText,
} from "./order-builder";
import { isBusinessOpen } from "./schedule-checker";
import { createPaymentLink } from "@/lib/payments/connect";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { ParsedMessage, ParsedStatus } from "./webhook-handler";
import type { WaApiOptions } from "./client";

// --- Phone normalization ---

/**
 * Normalize phone to digits-only for comparison.
 * WhatsApp `from` field is always digits with country code (e.g. "34612345678").
 * User input may be "+34 612 345 678", "612345678", "34612345678", etc.
 */
function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-+()]/g, "");
}

/**
 * Compare two phone numbers, handling the case where one might be missing
 * the country code. Returns true if they match.
 */
function phonesMatch(phone1: string, phone2: string): boolean {
  const a = normalizePhone(phone1);
  const b = normalizePhone(phone2);
  if (a === b) return true;
  // One might have country code, the other might not
  // e.g. "34612345678" vs "612345678"
  if (a.endsWith(b) || b.endsWith(a)) {
    // Only match if the shorter one is at least 9 digits (a real phone number)
    const shorter = a.length < b.length ? a : b;
    return shorter.length >= 9;
  }
  return false;
}

// --- Owner button reply handler ---

// Expected current status for each owner action
const OWNER_ACTION_EXPECTED_STATUS: Record<string, string[]> = {
  owner_accept: ["pending"],
  owner_reject: ["pending", "confirmed", "preparing"],
  owner_preparing: ["confirmed"],
  owner_ready: ["preparing"],
};

async function handleOwnerButtonReply(
  msg: ParsedMessage,
  business: { id: string; name: string; waPhoneId: string; waAccessToken: string; notificationPhone: string | null }
) {
  const buttonId = msg.buttonReplyId!;
  const [action, orderId] = buttonId.split(":");
  if (!orderId) return;

  const bizCtx = { name: business.name, waPhoneId: business.waPhoneId, waAccessToken: business.waAccessToken };
  const waOpts: WaApiOptions = { phoneNumberId: business.waPhoneId, accessToken: business.waAccessToken };
  const ownerPhone = msg.from;

  const order = await getOrderWithCustomerPhone(orderId);
  if (!order) {
    sendTextMessage(waOpts, ownerPhone, "Este pedido ya no existe.").catch(() => {});
    return;
  }

  // Guard: check the order is in the expected status for this action
  const expectedStatuses = OWNER_ACTION_EXPECTED_STATUS[action];
  if (expectedStatuses && !expectedStatuses.includes(order.status ?? "")) {
    sendTextMessage(
      waOpts,
      ownerPhone,
      `Pedido #${order.orderNumber} ya fue actualizado (estado actual: ${order.status}). No se necesita acción.`
    ).catch(() => {});
    return;
  }

  if (action === "owner_accept") {
    const updated = await updateOrderStatusById(orderId, "confirmed");
    if (!updated) return;
    sendStatusNotification(bizCtx, order.customerPhone, order.orderNumber, "confirmed").catch((err) =>
      console.error("Failed to notify customer:", err)
    );
    sendOwnerAdvanceButton(bizCtx, ownerPhone, orderId, order.orderNumber, "confirmed").catch((err) =>
      console.error("Failed to send owner advance button:", err)
    );
  } else if (action === "owner_reject") {
    const updated = await updateOrderStatusById(orderId, "cancelled");
    if (!updated) return;
    sendStatusNotification(bizCtx, order.customerPhone, order.orderNumber, "cancelled").catch((err) =>
      console.error("Failed to notify customer:", err)
    );
  } else if (action === "owner_preparing") {
    const updated = await updateOrderStatusById(orderId, "preparing");
    if (!updated) return;
    sendStatusNotification(bizCtx, order.customerPhone, order.orderNumber, "preparing").catch((err) =>
      console.error("Failed to notify customer:", err)
    );
    sendOwnerAdvanceButton(bizCtx, ownerPhone, orderId, order.orderNumber, "preparing").catch((err) =>
      console.error("Failed to send owner advance button:", err)
    );
  } else if (action === "owner_ready") {
    const updated = await updateOrderStatusById(orderId, "ready");
    if (!updated) return;
    sendStatusNotification(bizCtx, order.customerPhone, order.orderNumber, "ready").catch((err) =>
      console.error("Failed to notify customer:", err)
    );
  }
}

// --- Button reply handler ---

async function handleButtonReply(
  msg: ParsedMessage,
  business: { id: string; waPhoneId: string; waAccessToken: string; name: string; notificationPhone: string | null; stripeAccountId: string | null; currency: string | null; bizumPhone: string | null },
  customer: { id: string },
  conversation: { id: string },
  waOpts: WaApiOptions
) {
  const buttonId = msg.buttonReplyId!;
  const [action, orderId] = buttonId.split(":");
  if (!orderId) return;

  if (action === "confirm_order") {
    // Guard: only confirm if still pending_confirmation
    const existing = await db.select({ status: orders.status }).from(orders).where(eq(orders.id, orderId)).limit(1);
    if (existing[0]?.status !== "pending_confirmation") return;

    const updated = await updateOrderStatusById(orderId, "pending");
    if (!updated) return;

    // Increment customer + business stats
    await Promise.all([
      incrementCustomerStats(customer.id, updated.total),
      incrementBusinessOrderCount(business.id),
    ]);

    // Send confirmation to customer
    const items = (updated.items as Array<{ name: string; quantity: number; unitPrice: string; lineTotal: string }>) ?? [];
    const bizCtx = { name: business.name, waPhoneId: business.waPhoneId, waAccessToken: business.waAccessToken };
    await sendOrderConfirmation(
      bizCtx,
      msg.from,
      {
        orderNumber: updated.orderNumber,
        items: items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: i.unitPrice,
        })),
        total: updated.total,
      }
    );

    // Send payment options
    const hasBizum = !!business.bizumPhone;
    const hasStripe = !!business.stripeAccountId;
    const totalAmount = parseFloat(updated.total ?? "0");

    if ((hasBizum || hasStripe) && totalAmount > 0) {
      const payLines: string[] = [];
      payLines.push(`*Pago del pedido #${updated.orderNumber} (${updated.total}\u20ac):*`);

      // Bizum first (zero fees)
      if (hasBizum) {
        payLines.push(`\n*Bizum* (sin comisiones): envía ${updated.total}€ al ${business.bizumPhone}\nUna vez enviado, manda aquí el comprobante o captura de pantalla.`);
      }

      // Stripe card payment (optional)
      if (hasStripe) {
        try {
          const { url } = await createPaymentLink({
            stripeAccountId: business.stripeAccountId!,
            amount: totalAmount,
            currency: business.currency ?? "eur",
            orderNumber: updated.orderNumber,
            orderId,
          });

          if (url) {
            await db
              .update(orders)
              .set({ paymentUrl: url })
              .where(eq(orders.id, orderId));

            payLines.push(`\n*Tarjeta*: ${url}`);
          }
        } catch (err) {
          console.error("Failed to create payment link:", err);
        }
      }

      // Cash option
      payLines.push(`\n*Efectivo*: paga al recoger tu pedido`);

      const payText = payLines.join("\n");
      await sendTextMessage(waOpts, msg.from, payText);

      await saveMessage({
        conversationId: conversation.id,
        businessId: business.id,
        direction: "outbound",
        messageType: "text",
        content: payText,
      });
    }

    // Notify owner via WhatsApp (fire-and-forget)
    if (business.notificationPhone) {
      sendOwnerNewOrderNotification(bizCtx, business.notificationPhone, {
        id: orderId,
        orderNumber: updated.orderNumber,
        items: items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          lineTotal: i.lineTotal ?? (parseFloat(i.unitPrice) * i.quantity).toFixed(2),
        })),
        total: updated.total,
        deliveryType: updated.deliveryType,
      }).catch((err) => console.error("Failed to notify owner:", err));
    }

  } else if (action === "cancel_order") {
    // Guard: only cancel if still pending_confirmation
    const existingForCancel = await db.select({ status: orders.status }).from(orders).where(eq(orders.id, orderId)).limit(1);
    if (existingForCancel[0]?.status !== "pending_confirmation") return;

    await updateOrderStatusById(orderId, "cancelled");

    const text = "Pedido cancelado. Si necesitas algo más, ¡dinos!";
    await sendTextMessage(waOpts, msg.from, text);

    await saveMessage({
      conversationId: conversation.id,
      businessId: business.id,
      direction: "outbound",
      messageType: "text",
      content: text,
    });
  }
}

// --- Order intent handler ---

async function handleOrderIntent(
  aiResult: ParsedAiResponse,
  business: {
    id: string;
    name: string;
    waPhoneId: string;
    waAccessToken: string;
    monthlyOrderCount: number | null;
    monthlyOrderLimit: number | null;
    deliveryEnabled: boolean | null;
  },
  customer: { id: string },
  conversation: { id: string },
  phone: string,
  waOpts: WaApiOptions,
  deliveryType?: string,
  deliveryAddress?: string
) {
  if (!aiResult.items || aiResult.items.length === 0) {
    // AI said "order" but extracted no items — send AI message as-is
    await sendTextMessage(waOpts, phone, aiResult.message);
    return aiResult.message;
  }

  // Match items to catalog
  const catalog = await getCatalogItems(business.id);
  const { matched, unmatched } = matchAndPriceItems(aiResult.items, catalog);

  if (unmatched.length > 0) {
    const text = `No he encontrado estos productos en el menú: ${unmatched.join(", ")}. ¿Podrías corregir el nombre o elegir otra cosa?`;
    await sendTextMessage(waOpts, phone, text);
    return text;
  }

  if (matched.length === 0) {
    const text = "No he podido identificar ningún producto. ¿Podrías repetir tu pedido?";
    await sendTextMessage(waOpts, phone, text);
    return text;
  }

  // Check monthly order limit
  const currentCount = business.monthlyOrderCount ?? 0;
  const limit = business.monthlyOrderLimit ?? Infinity;
  if (currentCount >= limit) {
    const text = "Lo sentimos, este negocio ha alcanzado su límite de pedidos mensuales. Por favor, contacta directamente con el establecimiento.";
    await sendTextMessage(waOpts, phone, text);
    return text;
  }

  // Handle delivery — if delivery requested but no address, ask for it
  const resolvedDeliveryType = deliveryType ?? "pickup";
  if (resolvedDeliveryType === "delivery" && business.deliveryEnabled && !deliveryAddress) {
    const text = "Para envío a domicilio, necesito tu dirección de entrega. ¿Cuál es?";
    await sendTextMessage(waOpts, phone, text);
    return text;
  }

  // Create order
  const totals = calculateOrderTotals(matched);
  const orderNumber = await getNextOrderNumber(business.id);
  const order = await createOrder({
    businessId: business.id,
    customerId: customer.id,
    orderNumber,
    items: matched,
    subtotal: totals.subtotal,
    tax: totals.tax,
    total: totals.total,
    status: "pending_confirmation",
    deliveryType: resolvedDeliveryType,
    deliveryAddress: deliveryAddress ?? undefined,
    conversationId: conversation.id,
  });

  // Send interactive summary with buttons
  const summaryText = buildOrderSummaryText(matched, totals);
  await sendOrderSummaryWithButtons(
    { name: business.name, waPhoneId: business.waPhoneId, waAccessToken: business.waAccessToken },
    phone,
    order.id,
    summaryText
  );

  // Save outbound message
  await saveMessage({
    conversationId: conversation.id,
    businessId: business.id,
    direction: "outbound",
    messageType: "interactive",
    content: summaryText,
  });

  return summaryText;
}

// --- Escalation handler ---

async function handleEscalation(
  business: { id: string; name: string; waPhoneId: string; waAccessToken: string },
  customer: { id: string },
  conversation: { id: string; status: string | null },
  phone: string,
  waOpts: WaApiOptions
) {
  // Update conversation to escalated (only if not already)
  if (conversation.status !== "escalated") {
    const { db } = await import("@/lib/db");
    const { conversations } = await import("@/lib/db/schema");
    const { eq } = await import("drizzle-orm");
    await db
      .update(conversations)
      .set({ status: "escalated", escalatedReason: "customer_request" })
      .where(eq(conversations.id, conversation.id));
  }

  await sendEscalationNotice(
    { name: business.name, waPhoneId: business.waPhoneId, waAccessToken: business.waAccessToken },
    phone
  );

  await saveMessage({
    conversationId: conversation.id,
    businessId: business.id,
    direction: "outbound",
    messageType: "text",
    content: `Un miembro del equipo de ${business.name} te atenderá personalmente en breve. ¡Gracias por tu paciencia!`,
  });
}

// --- Main inbound message processor ---

export async function processInboundMessage(msg: ParsedMessage) {
  // 1. Find business by phone number ID
  const business = await findBusinessByWaPhoneId(msg.phoneNumberId);
  if (!business) {
    console.error(`No business found for phone ID: ${msg.phoneNumberId}`);
    return;
  }

  const accessToken = business.waAccessToken;
  if (!accessToken || !business.waPhoneId) {
    console.error(`Business ${business.id} missing WhatsApp credentials`);
    return;
  }

  // Narrowed business with guaranteed non-null WA credentials
  const biz = {
    ...business,
    waPhoneId: business.waPhoneId,
    waAccessToken: accessToken,
  };

  const waOpts: WaApiOptions = {
    phoneNumberId: biz.waPhoneId,
    accessToken,
  };

  // 2. Check if sender is the owner (notification phone)
  if (business.notificationPhone) {
    if (phonesMatch(msg.from, business.notificationPhone)) {
      // Owner message — handle button replies, ignore everything else
      if (msg.buttonReplyId) {
        markAsRead(waOpts, msg.messageId).catch((err) =>
          console.error("Failed to mark owner message as read:", err)
        );
        await handleOwnerButtonReply(msg, biz);
      }
      return;
    }
  }

  // 3. Find or create customer
  const customer = await findOrCreateCustomer(
    business.id,
    msg.from,
    msg.profileName
  );

  // 4. Find or create conversation
  const conversation = await findOrCreateConversation(
    business.id,
    customer.id
  );

  // 5. Handle button replies (before anything else)
  if (msg.buttonReplyId) {
    // Save inbound button reply
    await saveMessage({
      conversationId: conversation.id,
      businessId: business.id,
      direction: "inbound",
      waMessageId: msg.messageId,
      messageType: "interactive",
      content: msg.buttonReplyTitle ?? msg.buttonReplyId,
    });

    markAsRead(waOpts, msg.messageId).catch((err) =>
      console.error("Failed to mark as read:", err)
    );

    await handleButtonReply(msg, biz, customer, conversation, waOpts);
    return;
  }

  // 5. Determine content + handle media
  let content = msg.text ?? msg.caption;
  let mediaUrl: string | undefined;
  let mediaMimeType: string | undefined;

  if (msg.mediaId) {
    try {
      const { buffer, mimeType } = await downloadMedia(
        msg.mediaId,
        accessToken
      );
      mediaMimeType = mimeType;
      const key = await uploadMedia(
        business.id,
        msg.messageId,
        buffer,
        mimeType
      );
      mediaUrl = key;

      if (msg.type === "audio") {
        const transcription = await transcribeAudio(buffer, mimeType);
        if (transcription) {
          content = transcription;
        } else {
          content = content ?? "[Mensaje de audio — transcripción no disponible]";
        }
      }
    } catch (err) {
      console.error("Failed to process media:", err);
    }
  }

  // 6. Save inbound message
  await saveMessage({
    conversationId: conversation.id,
    businessId: business.id,
    direction: "inbound",
    waMessageId: msg.messageId,
    messageType: msg.type,
    content,
    mediaUrl,
    mediaMimeType,
  });

  // 7. Mark as read (fire-and-forget)
  markAsRead(waOpts, msg.messageId).catch((err) =>
    console.error("Failed to mark as read:", err)
  );

  // 8. Check if bot is active
  if (!business.botActive) return;

  // 9. Check if conversation is escalated — message is already saved, just don't auto-reply
  if (conversation.status === "escalated") {
    // Message was already saved in step 6 — staff will see it in the conversations inbox
    return;
  }

  // 10. Check business hours (pass info to AI instead of blocking)
  // null = never configured = 24/7, {} = all days closed, {monday: ...} = has schedule
  let closedInfo: { nextOpenTime?: string; allClosed?: boolean } | undefined;
  if (business.kitchenSchedule !== null && business.kitchenSchedule !== undefined) {
    const schedule = business.kitchenSchedule as Record<string, { open: string; close: string }>;
    if (Object.keys(schedule).length === 0) {
      // All days explicitly closed — restaurant is fully closed
      closedInfo = { allClosed: true };
    } else {
      const { open, nextOpenTime } = isBusinessOpen(
        schedule,
        business.timezone ?? "Europe/Madrid"
      );
      if (!open) {
        closedInfo = { nextOpenTime };
      }
    }
  }

  // 11. Generate AI response
  const hasAiKey = !!(
    process.env.GROQ_API_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    process.env.OPENAI_API_KEY
  );

  let responseText: string;
  let aiParsed: unknown = undefined;
  let aiConfidence: string | undefined;

  if (hasAiKey && content) {
    // Full AI flow — fetch 11 to drop the just-saved inbound message (last in chronological order)
    const rawHistory = await getConversationHistory(conversation.id, 11);
    // Remove the current message (already saved) to avoid duplicating it as userMessage
    const history = rawHistory.length > 0 && rawHistory[rawHistory.length - 1].waMessageId === msg.messageId
      ? rawHistory.slice(0, -1)
      : rawHistory.slice(0, 10);
    const catalog = await getCatalogItems(biz.id);

    // Fetch last order for repeat ordering
    const lastOrder = await getCustomerLastOrder(customer.id);
    const systemPrompt = buildSystemPrompt(biz, catalog, lastOrder ?? undefined, closedInfo);

    const result = await parseOrder(systemPrompt, content, history);
    aiParsed = result;
    aiConfidence = result.confidence?.toString();

    // Handle different AI response types
    if (result.type === "order" && !closedInfo?.allClosed) {
      const deliveryType = result.deliveryType;
      const deliveryAddr = result.deliveryAddress;
      responseText = await handleOrderIntent(
        result,
        biz,
        customer,
        conversation,
        msg.from,
        waOpts,
        deliveryType,
        deliveryAddr
      ) ?? result.message;
      // Don't save again — handleOrderIntent already saved outbound
      return;
    } else if (result.type === "escalate") {
      await handleEscalation(biz, customer, conversation, msg.from, waOpts);
      return;
    } else {
      responseText = result.message;
    }
  } else {
    // No AI key — send acknowledgment
    responseText =
      business.welcomeMessage ??
      `¡Hola! Hemos recibido tu mensaje. Un miembro de nuestro equipo de ${business.name} te atenderá pronto.`;
  }

  // 12. Send response via WhatsApp
  let outboundWaId: string | undefined;
  try {
    const sendResult = (await sendTextMessage(
      waOpts,
      msg.from,
      responseText
    )) as { messages?: Array<{ id: string }> } | undefined;
    outboundWaId = sendResult?.messages?.[0]?.id;
  } catch (err) {
    console.error("Failed to send WhatsApp response:", err);
  }

  // 13. Save outbound message
  await saveMessage({
    conversationId: conversation.id,
    businessId: business.id,
    direction: "outbound",
    waMessageId: outboundWaId,
    messageType: "text",
    content: responseText,
    aiParsed,
    aiConfidence,
    status: outboundWaId ? "sent" : "failed",
  });
}

export async function processStatusUpdate(status: ParsedStatus) {
  try {
    await updateMessageStatus(status.messageId, status.status);
  } catch (err) {
    console.error(`Failed to update status for ${status.messageId}:`, err);
  }
}

import {
  findBusinessByWaPhoneId,
  findOrCreateCustomer,
  findOrCreateConversation,
  saveMessage,
  getConversationHistory,
  getCatalogItems,
  updateMessageStatus,
} from "@/lib/db/queries";
import { sendTextMessage, markAsRead, downloadMedia } from "./client";
import { buildSystemPrompt } from "@/lib/ai/prompt-builder";
import { parseOrder } from "@/lib/ai/order-parser";
import { transcribeAudio } from "@/lib/ai/whisper";
import { uploadMedia } from "@/lib/storage/r2";
import type { ParsedMessage, ParsedStatus } from "./webhook-handler";
import type { WaApiOptions } from "./client";

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

  const waOpts: WaApiOptions = {
    phoneNumberId: business.waPhoneId,
    accessToken,
  };

  // 2. Find or create customer
  const customer = await findOrCreateCustomer(
    business.id,
    msg.from,
    msg.profileName
  );

  // 3. Find or create conversation
  const conversation = await findOrCreateConversation(
    business.id,
    customer.id
  );

  // 4. Determine content + handle media
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

      // 5. Handle audio transcription
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

  // 9. Check if conversation is escalated
  if (conversation.status === "escalated") return;

  // 10. Generate response
  const hasAiKey = !!(
    process.env.GROQ_API_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    process.env.OPENAI_API_KEY
  );

  let responseText: string;
  let aiParsed: unknown = undefined;
  let aiConfidence: string | undefined;

  if (hasAiKey && content) {
    // Full AI flow
    const history = await getConversationHistory(conversation.id, 10);
    const catalog = await getCatalogItems(business.id);
    const systemPrompt = buildSystemPrompt(business, catalog);

    const result = await parseOrder(systemPrompt, content, history);
    responseText = result.message;
    aiParsed = result;
    aiConfidence = result.confidence?.toString();
  } else {
    // No AI key — send acknowledgment
    responseText =
      business.welcomeMessage ??
      `¡Hola! Hemos recibido tu mensaje. Un miembro de nuestro equipo de ${business.name} te atenderá pronto.`;
  }

  // 11. Send response via WhatsApp
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

  // 12. Save outbound message
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

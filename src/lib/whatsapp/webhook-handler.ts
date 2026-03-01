import crypto from "crypto";
import { z } from "zod/v4";
import { isDuplicate } from "@/lib/redis";

// --- Zod schemas for WhatsApp webhook payload ---

const waTextSchema = z.object({
  body: z.string(),
});

const waMediaInfoSchema = z.object({
  id: z.string(),
  mime_type: z.string(),
  sha256: z.string().optional(),
  caption: z.string().optional(),
});

const waButtonReplySchema = z.object({
  id: z.string(),
  title: z.string(),
});

const waInteractiveSchema = z.object({
  type: z.string(),
  button_reply: waButtonReplySchema.optional(),
});

const waMessageSchema = z.object({
  from: z.string(),
  id: z.string(),
  timestamp: z.string(),
  type: z.string(),
  text: waTextSchema.optional(),
  image: waMediaInfoSchema.optional(),
  audio: waMediaInfoSchema.optional(),
  video: waMediaInfoSchema.optional(),
  document: waMediaInfoSchema.optional(),
  interactive: waInteractiveSchema.optional(),
});

const waContactSchema = z.object({
  profile: z.object({ name: z.string().optional().default("") }),
  wa_id: z.string(),
});

const waStatusSchema = z.object({
  id: z.string(),
  status: z.enum(["sent", "delivered", "read", "failed"]),
  timestamp: z.string(),
  recipient_id: z.string(),
});

const waMetadataSchema = z.object({
  display_phone_number: z.string(),
  phone_number_id: z.string(),
});

const waValueSchema = z.object({
  messaging_product: z.literal("whatsapp"),
  metadata: waMetadataSchema,
  contacts: z.array(waContactSchema).optional(),
  messages: z.array(waMessageSchema).optional(),
  statuses: z.array(waStatusSchema).optional(),
});

const waChangeSchema = z.object({
  field: z.string(),
  value: waValueSchema,
});

const waEntrySchema = z.object({
  id: z.string(),
  changes: z.array(waChangeSchema),
});

const waWebhookPayloadSchema = z.object({
  object: z.literal("whatsapp_business_account"),
  entry: z.array(waEntrySchema),
});

// --- Exported types ---

export interface ParsedMessage {
  phoneNumberId: string;
  from: string;
  profileName?: string;
  messageId: string;
  timestamp: string;
  type: string;
  text?: string;
  mediaId?: string;
  mediaMimeType?: string;
  caption?: string;
  buttonReplyId?: string;
  buttonReplyTitle?: string;
}

export interface ParsedStatus {
  messageId: string;
  status: string;
  timestamp: string;
  recipientId: string;
}

export interface ParsedWebhookPayload {
  messages: ParsedMessage[];
  statuses: ParsedStatus[];
}

// --- Signature verification ---

export function verifyWebhookSignature(
  rawBody: string,
  signature: string | null,
  appSecret: string
): boolean {
  if (!signature) return false;
  const expected = `sha256=${crypto
    .createHmac("sha256", appSecret)
    .update(rawBody)
    .digest("hex")}`;
  if (expected.length !== signature.length) return false;
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature)
  );
}

// --- Deduplication ---

export async function isMessageDuplicate(
  waMessageId: string
): Promise<boolean> {
  return isDuplicate(`wa_dedup:${waMessageId}`, 86400); // 24 hours — WhatsApp retries up to 23h
}

// --- Payload parsing ---

export function parseWebhookPayload(
  rawBody: string
): ParsedWebhookPayload | null {
  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    console.error("Invalid JSON in webhook body");
    return null;
  }

  const parsed = waWebhookPayloadSchema.safeParse(body);
  if (!parsed.success) {
    console.error("Invalid webhook payload:", parsed.error.message);
    return null;
  }

  const result: ParsedWebhookPayload = { messages: [], statuses: [] };

  for (const entry of parsed.data.entry) {
    for (const change of entry.changes) {
      if (change.field !== "messages") continue;

      const { metadata, contacts, messages, statuses } = change.value;

      // Parse messages
      if (messages) {
        const contactMap = new Map(
          (contacts ?? []).map((c) => [c.wa_id, c.profile.name])
        );

        for (const msg of messages) {
          const mediaInfo =
            msg.image ?? msg.audio ?? msg.video ?? msg.document;

          result.messages.push({
            phoneNumberId: metadata.phone_number_id,
            from: msg.from,
            profileName: contactMap.get(msg.from),
            messageId: msg.id,
            timestamp: msg.timestamp,
            type: msg.type,
            text: msg.text?.body ?? msg.interactive?.button_reply?.title,
            mediaId: mediaInfo?.id,
            mediaMimeType: mediaInfo?.mime_type,
            caption: mediaInfo?.caption,
            buttonReplyId: msg.interactive?.button_reply?.id,
            buttonReplyTitle: msg.interactive?.button_reply?.title,
          });
        }
      }

      // Parse statuses
      if (statuses) {
        for (const status of statuses) {
          result.statuses.push({
            messageId: status.id,
            status: status.status,
            timestamp: status.timestamp,
            recipientId: status.recipient_id,
          });
        }
      }
    }
  }

  return result;
}

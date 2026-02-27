import { createWaRateLimiter } from "@/lib/redis";
import type { Ratelimit } from "@upstash/ratelimit";

const WA_API_BASE = "https://graph.facebook.com/v21.0";
const MAX_RETRIES = 3;

export interface WaApiOptions {
  phoneNumberId: string;
  accessToken: string;
}

// --- Rate limiter (lazy) ---

let _rateLimiter: Ratelimit | null = null;
function getRateLimiter() {
  if (!_rateLimiter) _rateLimiter = createWaRateLimiter();
  return _rateLimiter;
}

async function checkRateLimit(phoneNumberId: string) {
  const { success } = await getRateLimiter().limit(phoneNumberId);
  if (!success) throw new Error("WhatsApp API rate limit exceeded");
}

// --- Core fetch with retry ---

async function waFetch(
  path: string,
  opts: WaApiOptions,
  body?: unknown
): Promise<unknown> {
  const url = `${WA_API_BASE}/${opts.phoneNumberId}${path}`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const fetchInit: RequestInit = {
      method: body ? "POST" : "GET",
      headers: {
        Authorization: `Bearer ${opts.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    if (body) fetchInit.body = JSON.stringify(body);

    const res = await fetch(url, fetchInit);

    if (res.ok) return res.json();

    if ((res.status === 429 || res.status >= 500) && attempt < MAX_RETRIES) {
      const delay = Math.pow(2, attempt) * 500;
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }

    const errorBody = await res.text();
    throw new Error(`WhatsApp API error ${res.status}: ${errorBody}`);
  }

  // Unreachable — loop always returns or throws
  throw new Error("waFetch: unexpected end of retry loop");
}

// --- Send messages ---

export async function sendTextMessage(
  opts: WaApiOptions,
  to: string,
  text: string
) {
  await checkRateLimit(opts.phoneNumberId);
  return waFetch("/messages", opts, {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: text },
  });
}

export async function sendTemplateMessage(
  opts: WaApiOptions,
  to: string,
  templateName: string,
  languageCode: string,
  components?: unknown[]
) {
  await checkRateLimit(opts.phoneNumberId);
  return waFetch("/messages", opts, {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: templateName,
      language: { code: languageCode },
      ...(components && { components }),
    },
  });
}

export async function sendInteractiveMessage(
  opts: WaApiOptions,
  to: string,
  interactive: unknown
) {
  await checkRateLimit(opts.phoneNumberId);
  return waFetch("/messages", opts, {
    messaging_product: "whatsapp",
    to,
    type: "interactive",
    interactive,
  });
}

export async function sendMediaMessage(
  opts: WaApiOptions,
  to: string,
  mediaType: "image" | "audio" | "video" | "document",
  media: { link?: string; id?: string; caption?: string; filename?: string }
) {
  await checkRateLimit(opts.phoneNumberId);
  return waFetch("/messages", opts, {
    messaging_product: "whatsapp",
    to,
    type: mediaType,
    [mediaType]: media,
  });
}

// --- Utilities ---

export async function markAsRead(opts: WaApiOptions, messageId: string) {
  return waFetch("/messages", opts, {
    messaging_product: "whatsapp",
    status: "read",
    message_id: messageId,
  });
}

export async function downloadMedia(
  mediaId: string,
  accessToken: string
): Promise<{ buffer: Buffer; mimeType: string }> {
  // Step 1: get media URL from WhatsApp
  const metaRes = await fetch(`${WA_API_BASE}/${mediaId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!metaRes.ok) {
    throw new Error(`Failed to get media metadata: ${metaRes.status}`);
  }
  const meta = (await metaRes.json()) as { url: string; mime_type: string };

  // Step 2: download the binary
  const mediaRes = await fetch(meta.url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!mediaRes.ok) {
    throw new Error(`Failed to download media: ${mediaRes.status}`);
  }

  const arrayBuffer = await mediaRes.arrayBuffer();
  return {
    buffer: Buffer.from(arrayBuffer),
    mimeType: meta.mime_type,
  };
}

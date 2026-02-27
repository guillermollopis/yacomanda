import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import {
  verifyWebhookSignature,
  parseWebhookPayload,
  isMessageDuplicate,
} from "@/lib/whatsapp/webhook-handler";
import {
  processInboundMessage,
  processStatusUpdate,
} from "@/lib/whatsapp/message-processor";

// WhatsApp webhook verification (GET)
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// WhatsApp incoming messages (POST)
export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  // Verify signature
  const signature = req.headers.get("x-hub-signature-256");
  const appSecret = process.env.WHATSAPP_APP_SECRET;

  if (
    !appSecret ||
    !verifyWebhookSignature(rawBody, signature, appSecret)
  ) {
    console.error("Invalid webhook signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // Parse payload
  const payload = parseWebhookPayload(rawBody);
  if (!payload) {
    return NextResponse.json({ status: "ok" });
  }

  // Process in background after returning 200
  after(async () => {
    for (const msg of payload.messages) {
      try {
        if (await isMessageDuplicate(msg.messageId)) {
          console.log(`Skipping duplicate message: ${msg.messageId}`);
          continue;
        }
        await processInboundMessage(msg);
      } catch (err) {
        console.error(`Error processing message ${msg.messageId}:`, err);
      }
    }

    for (const status of payload.statuses) {
      try {
        await processStatusUpdate(status);
      } catch (err) {
        console.error(`Error processing status ${status.messageId}:`, err);
      }
    }
  });

  return NextResponse.json({ status: "ok" });
}

import { NextRequest, NextResponse } from "next/server";

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
export async function POST(req: Request) {
  // TODO: Implement in Block 2
  const body = await req.json();
  console.log("WhatsApp webhook received:", JSON.stringify(body).slice(0, 200));
  return NextResponse.json({ status: "ok" });
}

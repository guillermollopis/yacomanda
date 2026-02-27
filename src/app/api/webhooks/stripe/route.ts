import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // TODO: Implement in Block 3
  const body = await req.text();
  console.log("Stripe webhook received:", body.slice(0, 200));
  return NextResponse.json({ received: true });
}

import { NextResponse } from "next/server";
import { z } from "zod/v4";

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  message: z.string().min(10).max(2000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    // Store in DB as audit log, or send notification
    // For now, log and return success — in production, integrate with
    // Resend/SendGrid/internal Slack webhook
    console.log("[CONTACT FORM]", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message.slice(0, 100),
      timestamp: new Date().toISOString(),
    });

    // If CONTACT_WEBHOOK_URL is set, forward to Slack/Discord/etc.
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `*Nuevo contacto de yacomanda.com*\n*Nombre:* ${data.name}\n*Email:* ${data.email}\n*Teléfono:* ${data.phone || "—"}\n*Mensaje:* ${data.message}`,
        }),
      }).catch((err) => console.error("Failed to send webhook:", err));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: err.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

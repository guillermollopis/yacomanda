import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  message: z.string().min(10).max(2000),
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "soporte@yacomanda.com";
const FROM_EMAIL =
  process.env.FROM_EMAIL ?? "YaComanda <onboarding@yacomanda.com>";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    // Send email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: data.email,
        subject: `Contacto web: ${data.name}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;">
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Nombre:</td><td>${data.name}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${data.email}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Teléfono:</td><td>${data.phone || "—"}</td></tr>
          </table>
          <h3>Mensaje:</h3>
          <p style="white-space:pre-wrap;">${data.message}</p>
          <p style="margin-top:16px;color:#666;font-size:12px;">Enviado desde el formulario de contacto de yacomanda.com</p>
        `,
      });
    } else {
      console.warn("[contact] RESEND_API_KEY not set, email not sent");
    }

    // Also forward to Slack/Discord webhook if configured
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

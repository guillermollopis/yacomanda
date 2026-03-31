import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const templateEnum = z.enum(["cold_intro", "kit_digital", "follow_up", "pilot_invite", "latam_intro", "latam_follow_up"]);

const outreachSchema = z.object({
  to: z.string().email(),
  restaurantName: z.string().min(1).max(300),
  template: templateEnum,
  secret: z.string().min(1),
});

// ---------------------------------------------------------------------------
// In-memory rate limiter (20 emails / hour)
// ---------------------------------------------------------------------------

const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

let sendTimestamps: number[] = [];

function canSend(): boolean {
  const now = Date.now();
  sendTimestamps = sendTimestamps.filter((ts) => now - ts < RATE_WINDOW_MS);
  return sendTimestamps.length < RATE_LIMIT;
}

function recordSend() {
  sendTimestamps.push(Date.now());
}

// ---------------------------------------------------------------------------
// Resend client
// ---------------------------------------------------------------------------

const FROM_EMAIL =
  process.env.FROM_EMAIL ?? "Guillem de YaComanda <guillem@fairlytics.dev>";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// ---------------------------------------------------------------------------
// Email templates
// ---------------------------------------------------------------------------

function wrapHtml(body: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;font-size:15px;">
${body}
<p style="margin-top:32px;color:#999;font-size:12px;">Si no quieres recibir mas emails, responde con BAJA y te eliminaremos de inmediato.</p>
</body>
</html>`;
}

function buildEmail(
  template: z.infer<typeof templateEnum>,
  restaurantName: string
): { subject: string; html: string } {
  switch (template) {
    case "cold_intro":
      return {
        subject: `${restaurantName} — pedidos por WhatsApp sin comisiones`,
        html: wrapHtml(`
<p>Hola,</p>
<p>Soy Guillem, fundador de <a href="https://yacomanda.com?ref=outreach" style="color:#16a34a;text-decoration:none;font-weight:600;">YaComanda</a>.</p>
<p>Se que muchos restaurantes como ${restaurantName} ya reciben pedidos por WhatsApp, pero gestionarlos a mano entre servicio y servicio es un caos.</p>
<p><strong>YaComanda es un bot de IA que recibe pedidos por WhatsApp automaticamente:</strong> entiende lo que pide el cliente, confirma con un resumen, cobra y manda el pedido directo a cocina.</p>
<p>Lo importante:</p>
<ul style="padding-left:20px;">
  <li><strong>Sin comisiones</strong> por pedido (vs el 30% de Glovo/JustEat)</li>
  <li>Desde <strong>29€/mes</strong></li>
  <li><strong>30 dias gratis</strong> para probarlo</li>
  <li>Se configura en <strong>15 minutos</strong></li>
</ul>
<p>¿Te gustaria probarlo? Puedes registrarte gratis en <a href="https://yacomanda.com?ref=outreach" style="color:#16a34a;">yacomanda.com</a> o responder a este email y te ayudo personalmente.</p>
<p>Un saludo,<br>Guillem<br><a href="https://yacomanda.com" style="color:#16a34a;text-decoration:none;">yacomanda.com</a></p>
        `),
      };

    case "kit_digital":
      return {
        subject: `${restaurantName} — YaComanda GRATIS con Kit Digital`,
        html: wrapHtml(`
<p>Hola,</p>
<p>Soy Guillem, de <a href="https://yacomanda.com?ref=kit-digital" style="color:#16a34a;text-decoration:none;font-weight:600;">YaComanda</a>.</p>
<p>El programa <strong>Kit Digital</strong> del gobierno cubre hasta el 100% del coste de herramientas digitales para pymes. <strong>YaComanda esta incluido.</strong></p>
<p>Esto significa que ${restaurantName} puede tener <strong>gratis durante 12 meses</strong>:</p>
<ul style="padding-left:20px;">
  <li>Bot de IA en WhatsApp que recibe y confirma pedidos</li>
  <li>Panel de gestion de pedidos y clientes</li>
  <li>Pantalla de cocina en tiempo real</li>
  <li>Cobros integrados</li>
  <li>Analiticas de ventas</li>
</ul>
<p><strong>Nosotros nos encargamos de todo el papeleo de la solicitud.</strong> Tu solo tienes que firmar.</p>
<p>¿Quieres que te ayudemos con la solicitud? Solo tienes que responder a este email.</p>
<p>Mas info: <a href="https://yacomanda.com/kit-digital?ref=outreach" style="color:#16a34a;">yacomanda.com/kit-digital</a></p>
<p>Un saludo,<br>Guillem<br><a href="https://yacomanda.com" style="color:#16a34a;text-decoration:none;">yacomanda.com</a></p>
        `),
      };

    case "follow_up":
      return {
        subject: `Re: ${restaurantName} — pedidos por WhatsApp`,
        html: wrapHtml(`
<p>Hola,</p>
<p>Te escribi hace unos dias sobre YaComanda, el bot de WhatsApp que recibe pedidos automaticamente para restaurantes como ${restaurantName}. Sin comisiones, desde 29€/mes.</p>
<p>Queria comentarte que ademas con el <strong>Kit Digital del gobierno puede salirte gratis</strong> durante 12 meses, y nosotros nos encargamos del papeleo.</p>
<p>Si te interesa, responde y te lo explico en 5 minutos. Sin compromiso.</p>
<p>Un saludo,<br>Guillem</p>
        `),
      };

    case "pilot_invite":
      return {
        subject: `${restaurantName} — probaria gratis un bot de pedidos por WhatsApp?`,
        html: `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;line-height:1.7;max-width:600px;margin:0 auto;padding:20px;font-size:15px;">
<p>Hola,</p>
<p>Soy Guillem. Estoy buscando 5 restaurantes para probar gratis durante 3 meses un bot de WhatsApp que recibe pedidos automaticamente. He pensado en ${restaurantName}.</p>
<p>La idea es sencilla: tus clientes te escriben por WhatsApp, una IA entiende el pedido, lo confirma y te lo manda a cocina. Sin comisiones, sin apps, sin intermediarios.</p>
<p>Busco restaurantes reales para probarlo antes del lanzamiento. A cambio de tu feedback, te lo configuro yo mismo y es completamente gratis durante 3 meses. Sin compromiso — si no te convence, lo dejamos y ya.</p>
<p>¿Te interesa? Solo responde a este email o entra en <a href="https://yacomanda.com/piloto?ref=email" style="color:#16a34a;">yacomanda.com/piloto</a></p>
<p>Guillem<br><span style="color:#666;font-size:13px;">Fundador de YaComanda · +34 636 873 210</span></p>
<p style="margin-top:32px;color:#999;font-size:12px;">Si no quieres recibir mas emails, responde con BAJA y te eliminaremos de inmediato.</p>
</body>
</html>`,
      };

    case "latam_intro":
      return {
        subject: `${restaurantName}: ¿cuanto pierdes en comisiones de Rappi o PedidosYa?`,
        html: `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;line-height:1.7;max-width:600px;margin:0 auto;padding:20px;font-size:15px;">
<p>Hola,</p>
<p>Un dato rapido: si ${restaurantName} recibe 20 pedidos al dia por Rappi o PedidosYa, estas pagando entre <strong>$300,000 y $600,000 COP al mes solo en comisiones</strong> (o el equivalente en tu moneda).</p>
<p>Esos clientes ya te conocen. Ya saben tu nombre. ¿Por que pagar el 30% para que te hagan un pedido?</p>
<p>Hay una alternativa: <strong>que te escriban directo por WhatsApp.</strong></p>
<p>Me llamo Guillem. Cree <a href="https://yacomanda.com?ref=latam" style="color:#16a34a;font-weight:600;">YaComanda</a>, un bot de IA que recibe pedidos por WhatsApp automaticamente. Funciona asi:</p>
<ol style="padding-left:20px;">
  <li>Tu cliente te escribe por WhatsApp como siempre</li>
  <li>La IA entiende el pedido (texto, audio, fotos de la carta)</li>
  <li>Confirma, cobra y manda el pedido a tu cocina</li>
</ol>
<p><strong>Sin comisiones. Sin apps. Sin intermediarios.</strong> Desde $29 USD/mes, con 30 dias gratis para probarlo.</p>
<p>¿Quieres ver como funciona con tu carta? Solo responde a este email con el nombre de tu restaurante y te monto una demo personalizada gratis.</p>
<p>Guillem<br><span style="color:#666;font-size:13px;">Fundador de YaComanda · <a href="https://yacomanda.com" style="color:#16a34a;text-decoration:none;">yacomanda.com</a></span></p>
<p style="margin-top:32px;color:#999;font-size:12px;">Si no quieres recibir mas emails, responde con BAJA y te eliminaremos de inmediato.</p>
</body>
</html>`,
      };

    case "latam_follow_up":
      return {
        subject: `Re: ${restaurantName} — una pregunta rapida`,
        html: wrapHtml(`
<p>Hola,</p>
<p>Te escribi hace unos dias sobre YaComanda — el bot que recibe pedidos por WhatsApp para restaurantes como ${restaurantName}.</p>
<p>Solo una pregunta: <strong>¿tus clientes te escriben por WhatsApp para hacer pedidos?</strong></p>
<p>Si la respuesta es si, puedo mostrarte en 5 minutos como automatizar eso completamente. Gratis durante 30 dias, sin tarjeta.</p>
<p>Si no, perdona la molestia y no te vuelvo a escribir.</p>
<p>Guillem</p>
        `),
      };
  }
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = outreachSchema.parse(body);

    // Auth check
    const secret = process.env.OUTREACH_SECRET;
    if (!secret || data.secret !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limit check
    if (!canSend()) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Max 20 emails per hour." },
        { status: 429 }
      );
    }

    // Resend client
    const resend = getResend();
    if (!resend) {
      return NextResponse.json(
        { error: "RESEND_API_KEY not configured" },
        { status: 500 }
      );
    }

    const { subject, html } = buildEmail(data.template, data.restaurantName);

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      replyTo: process.env.REPLY_TO_EMAIL ?? "guillermollopis@protforge.com",
      subject,
      html,
    });

    if (result.error) {
      console.error("[outreach] Resend error:", result.error);
      return NextResponse.json(
        { error: "Failed to send email", details: result.error.message },
        { status: 500 }
      );
    }

    recordSend();

    console.log(
      `[outreach] Sent "${data.template}" to ${data.to} (${data.restaurantName}) — id: ${result.data?.id}`
    );

    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: err.issues },
        { status: 400 }
      );
    }
    console.error("[outreach] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

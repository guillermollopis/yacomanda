import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const leadSchema = z.object({
  email: z.string().email(),
  restaurantName: z.string().min(1).max(300),
  platform: z.string().min(1),
  monthlyOrders: z.number().int().min(1),
  avgTicket: z.number().min(1),
  currency: z.enum(["EUR", "USD"]),
  monthlyCommission: z.number().min(0),
  yearlySavings: z.number(),
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ?? "guillermollopis@protforge.com";
const FROM_EMAIL =
  process.env.FROM_EMAIL ?? "Guillem de YaComanda <guillem@fairlytics.dev>";

function fmt(n: number, currency: string): string {
  if (currency === "EUR")
    return `${n.toLocaleString("es-ES", { maximumFractionDigits: 0 })} \u20ac`;
  return `$${n.toLocaleString("es-ES", { maximumFractionDigits: 0 })}`;
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = leadSchema.parse(body);

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.warn("[leads] RESEND_API_KEY not set");
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(resendKey);

    const monthlyCommission = fmt(data.monthlyCommission, data.currency);
    const yearlyCommission = fmt(data.monthlyCommission * 12, data.currency);
    const yearlySavings = fmt(data.yearlySavings, data.currency);
    const monthlySavings = fmt(
      data.monthlyCommission - 29,
      data.currency
    );
    const avgTicketFmt = fmt(data.avgTicket, data.currency);

    // 1. Send personalized report to the lead
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      replyTo: "hola@yacomanda.com",
      subject: `${data.restaurantName}: tu informe de ahorro en comisiones`,
      html: `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;line-height:1.7;max-width:600px;margin:0 auto;padding:20px;font-size:15px;">

<div style="text-align:center;margin-bottom:24px;">
  <div style="display:inline-block;background:#16a34a;color:white;font-weight:900;padding:6px 12px;border-radius:8px;font-size:14px;">Ya</div>
  <span style="font-weight:700;font-size:18px;margin-left:6px;">Comanda</span>
</div>

<h1 style="font-size:22px;margin:0;">Informe de ahorro: ${data.restaurantName}</h1>

<p>Hola,</p>
<p>Aqui tienes el desglose de lo que ${data.restaurantName} esta pagando en comisiones a <strong>${data.platform}</strong> y cuanto podrias ahorrar.</p>

<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:16px;margin:16px 0;">
  <h3 style="color:#dc2626;margin:0 0 8px;">Lo que pierdes con ${data.platform}</h3>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <tr><td style="padding:4px 0;">Pedidos/mes</td><td style="text-align:right;font-weight:600;">${data.monthlyOrders}</td></tr>
    <tr><td style="padding:4px 0;">Ticket medio</td><td style="text-align:right;font-weight:600;">${avgTicketFmt}</td></tr>
    <tr><td style="padding:4px 0;">Comision mensual</td><td style="text-align:right;font-weight:700;color:#dc2626;">${monthlyCommission}</td></tr>
    <tr><td style="padding:4px 0;">Comision anual</td><td style="text-align:right;font-weight:700;color:#dc2626;">${yearlyCommission}</td></tr>
  </table>
</div>

<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;margin:16px 0;">
  <h3 style="color:#16a34a;margin:0 0 8px;">Con YaComanda</h3>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <tr><td style="padding:4px 0;">Coste mensual</td><td style="text-align:right;font-weight:600;">29 ${data.currency === "EUR" ? "\u20ac" : "USD"}/mes</td></tr>
    <tr><td style="padding:4px 0;">Comisiones</td><td style="text-align:right;font-weight:700;color:#16a34a;">0%</td></tr>
    <tr><td style="padding:4px 0;">Ahorro mensual</td><td style="text-align:right;font-weight:700;color:#16a34a;">${monthlySavings}</td></tr>
    <tr><td style="padding:4px 0;font-size:16px;"><strong>Ahorro anual</strong></td><td style="text-align:right;font-weight:900;color:#16a34a;font-size:18px;">${yearlySavings}</td></tr>
  </table>
</div>

<h3>¿Como funciona YaComanda?</h3>
<ol style="padding-left:20px;">
  <li>Tu cliente te escribe por WhatsApp (como ya hace)</li>
  <li>Nuestra IA entiende el pedido: texto, audio, incluso fotos de la carta</li>
  <li>Confirma el pedido, cobra y lo envia directo a cocina</li>
</ol>

<p><strong>Sin comisiones. Sin apps. Sin intermediarios.</strong></p>

<div style="text-align:center;margin:24px 0;">
  <a href="https://yacomanda.com/sign-up?ref=calculator" style="display:inline-block;background:#16a34a;color:white;font-weight:700;padding:12px 32px;border-radius:8px;text-decoration:none;font-size:16px;">Empezar 30 dias gratis</a>
</div>

<p>¿Prefieres que te lo configure yo? Solo responde a este email con tu carta (PDF, foto o link) y en 24h tienes tu demo lista.</p>

<p>Un saludo,<br>Guillem<br><span style="color:#666;font-size:13px;">Fundador de YaComanda &middot; <a href="https://yacomanda.com" style="color:#16a34a;text-decoration:none;">yacomanda.com</a></span></p>

<p style="margin-top:32px;color:#999;font-size:12px;">Has recibido este email porque usaste nuestra calculadora de comisiones. Si no quieres recibir mas emails, responde con BAJA.</p>
</body>
</html>`,
    });

    // 2. Notify admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `LEAD calculadora: ${data.restaurantName} (${data.email})`,
      html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;padding:20px;font-size:14px;">
<h2 style="color:#16a34a;">Nuevo lead desde la calculadora</h2>
<table style="border-collapse:collapse;">
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Restaurante:</td><td>${data.restaurantName}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${data.email}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Plataforma:</td><td>${data.platform}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Pedidos/mes:</td><td>${data.monthlyOrders}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Ticket medio:</td><td>${avgTicketFmt}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Comision mensual:</td><td style="color:#dc2626;font-weight:bold;">${monthlyCommission}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Ahorro anual:</td><td style="color:#16a34a;font-weight:bold;">${yearlySavings}</td></tr>
</table>
<p style="margin-top:16px;"><strong>Accion:</strong> Responder al lead con demo personalizada.</p>
</body></html>`,
    });

    console.log(
      `[leads] New lead: ${data.restaurantName} (${data.email}) — platform: ${data.platform}, savings: ${yearlySavings}/yr`
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos invalidos", details: err.issues },
        { status: 400 }
      );
    }
    console.error("[leads] Error:", err);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}

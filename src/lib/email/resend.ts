import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;

let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (!resendKey) return null;
  if (!_resend) _resend = new Resend(resendKey);
  return _resend;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "soporte@yacomanda.com";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "YaComanda <onboarding@yacomanda.com>";

export async function sendAdminNewBusinessEmail(business: {
  name: string;
  phone: string;
  city: string;
  type: string;
  ownerName: string;
  ownerEmail: string;
  needsWhatsApp: boolean;
  needsStripe: boolean;
}) {
  const resend = getResend();
  if (!resend) {
    console.warn("[email] Resend not configured, skipping admin notification");
    return;
  }

  const pendingTasks: string[] = [];
  if (business.needsWhatsApp) pendingTasks.push("Configurar WhatsApp Business API");
  if (business.needsStripe) pendingTasks.push("Ayudar con Stripe Connect");

  const html = `
    <h2>Nuevo restaurante registrado</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;">
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Negocio:</td><td>${business.name}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Tipo:</td><td>${business.type}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Ciudad:</td><td>${business.city}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Teléfono:</td><td>${business.phone}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Propietario:</td><td>${business.ownerName} (${business.ownerEmail})</td></tr>
    </table>
    ${
      pendingTasks.length > 0
        ? `<h3 style="color:#dc2626;">Tareas pendientes:</h3><ul>${pendingTasks.map((t) => `<li>${t}</li>`).join("")}</ul>`
        : '<p style="color:#16a34a;">No hay tareas pendientes.</p>'
    }
    <p style="margin-top:16px;color:#666;font-size:12px;">Este email se envió automáticamente al completar el onboarding.</p>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Nuevo negocio: ${business.name} (${business.city})`,
      html,
    });
    console.log(`[email] Admin notified about new business: ${business.name}`);
  } catch (err) {
    console.error("[email] Failed to send admin notification:", err);
  }
}

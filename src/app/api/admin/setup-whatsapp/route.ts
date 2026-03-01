import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { businesses } from "@/lib/db/schema";

const schema = z.object({
  adminSecret: z.string(),
  businessId: z.string().uuid(),
  waPhoneId: z.string().min(1),
  waAccessToken: z.string().min(1),
  waBusinessId: z.string().optional(),
  waWebhookVerifyToken: z.string().optional(),
});

/**
 * POST /api/admin/setup-whatsapp
 *
 * Admin endpoint to link WhatsApp credentials to a business.
 * Protected by ADMIN_SECRET env var — not exposed to regular users.
 *
 * Usage:
 *   curl -X POST https://yacomanda.vercel.app/api/admin/setup-whatsapp \
 *     -H "Content-Type: application/json" \
 *     -d '{"adminSecret":"your-secret","businessId":"uuid","waPhoneId":"123","waAccessToken":"EAA..."}'
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Verify admin secret
    const adminSecret = process.env.ADMIN_SECRET;
    if (!adminSecret || data.adminSecret !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify business exists
    const [biz] = await db
      .select({ id: businesses.id, name: businesses.name })
      .from(businesses)
      .where(eq(businesses.id, data.businessId));

    if (!biz) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Update WhatsApp credentials
    const [updated] = await db
      .update(businesses)
      .set({
        waPhoneId: data.waPhoneId,
        waAccessToken: data.waAccessToken,
        waBusinessId: data.waBusinessId ?? null,
        waWebhookVerifyToken: data.waWebhookVerifyToken ?? null,
        botActive: true,
        updatedAt: new Date(),
      })
      .where(eq(businesses.id, data.businessId))
      .returning({
        id: businesses.id,
        name: businesses.name,
        waPhoneId: businesses.waPhoneId,
        botActive: businesses.botActive,
      });

    return NextResponse.json({
      ok: true,
      business: updated,
      message: `WhatsApp linked to ${updated.name}. Bot is now active.`,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: err.issues }, { status: 400 });
    }
    console.error("Admin setup-whatsapp error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

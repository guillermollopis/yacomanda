import { NextResponse } from "next/server";
import { z } from "zod/v4";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const batchSchema = z.object({
  restaurants: z
    .array(
      z.object({
        email: z.string().email(),
        name: z.string().min(1).max(300),
      })
    )
    .min(1)
    .max(200),
  template: z.enum(["cold_intro", "kit_digital", "follow_up", "pilot_invite", "latam_intro", "latam_follow_up"]),
  secret: z.string().min(1),
  delayMs: z.number().int().min(1000).max(60000).default(5000),
});

// ---------------------------------------------------------------------------
// Helper — calls the single outreach endpoint internally
// ---------------------------------------------------------------------------

async function sendOne(
  baseUrl: string,
  to: string,
  restaurantName: string,
  template: string,
  secret: string
): Promise<{ email: string; name: string; ok: boolean; id?: string; error?: string }> {
  try {
    const res = await fetch(`${baseUrl}/api/outreach`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, restaurantName, template, secret }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { email: to, name: restaurantName, ok: false, error: data.error ?? `HTTP ${res.status}` };
    }

    return { email: to, name: restaurantName, ok: true, id: data.id };
  } catch (err) {
    return {
      email: to,
      name: restaurantName,
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = batchSchema.parse(body);

    // Auth check
    const secret = process.env.OUTREACH_SECRET;
    if (!secret || data.secret !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Determine base URL from request
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    const results: Awaited<ReturnType<typeof sendOne>>[] = [];

    for (let i = 0; i < data.restaurants.length; i++) {
      const restaurant = data.restaurants[i];

      const result = await sendOne(
        baseUrl,
        restaurant.email,
        restaurant.name,
        data.template,
        data.secret
      );

      results.push(result);

      // Don't delay after the last one
      if (i < data.restaurants.length - 1) {
        await delay(data.delayMs);
      }
    }

    const sent = results.filter((r) => r.ok).length;
    const failed = results.filter((r) => !r.ok).length;

    console.log(
      `[outreach/batch] Completed: ${sent} sent, ${failed} failed out of ${data.restaurants.length}`
    );

    return NextResponse.json({
      ok: true,
      total: data.restaurants.length,
      sent,
      failed,
      results,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: err.issues },
        { status: 400 }
      );
    }
    console.error("[outreach/batch] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

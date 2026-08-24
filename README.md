# YaComanda — WhatsApp orders, straight to the kitchen

A SaaS platform for Spanish restaurants that turns free-form WhatsApp messages into confirmed, paid
orders without anyone typing them out. Customers write, photograph or record a voice note the way they
always have; the system understands it, checks it against the live menu, takes payment via Bizum or
Redsys, and drops a structured order into the kitchen dashboard.

The point was the 30% commission that delivery marketplaces charge. Restaurants already receive orders
on WhatsApp — they just process them by hand.

> **Status:** archived. A solo SaaS attempt I stopped working on, published as a portfolio piece rather
> than a maintained product.ok

---

## The interesting part (for engineers)

**Multimodal input, one structured output.** Orders arrive as text, as photographs of a handwritten
list, or as voice notes — Spanish, unpunctuated, regional, frequently ambiguous. `lib/ai/whisper.ts`
transcribes audio, `lib/ai/menu-extractor.ts` reads menus out of uploaded images and documents, and
`lib/ai/order-parser.ts` collapses all of it into one Zod-validated shape.

**Every model response is schema-validated.** The parser returns a typed object or it fails loudly:

```ts
const parsedResponseSchema = z.object({
  type: z.enum(["order", "question", "greeting", "chitchat", "escalate"]),
  message: z.string(),
  items: z.array(parsedItemSchema).optional(),
  confidence: z.number().min(0).max(1).optional(),
  deliveryType: z.enum(["pickup", "delivery"]).optional(),
});
```

**Intent classification with a designed escape hatch.** Not every message is an order. The model has to
decide between an order, a question, a greeting, small talk, and `escalate` — the explicit
"hand this to a human" path. A system that takes money on a customer's behalf needs a way to say *I am
not confident enough*, and confidence is returned alongside the classification so the threshold lives
in application code rather than in the prompt.

**Grounding against the real catalogue.** Parsed items are verified against the restaurant's actual
menu before anything is confirmed. The model proposes; the database decides. This is what stops a
confidently hallucinated dish from reaching the kitchen.

**Provider-agnostic.** OpenAI and Anthropic sit behind a single provider interface, so the model can be
swapped per task or failed over without touching call sites.

**Type-safe end to end.** tRPC between client and server, Drizzle against Postgres, Zod at the model
boundary — one type definition from database row to React component.

---

## Stack

| Layer | Choice |
|---|---|
| App | Next.js (App Router), React, TypeScript, Tailwind, Radix |
| API | tRPC, TanStack Query |
| Data | PostgreSQL (Neon serverless), Drizzle ORM |
| AI | OpenAI + Anthropic SDKs, Whisper, Zod-validated outputs |
| Auth | Clerk |
| Payments | Stripe, plus Bizum/Redsys for the Spanish market |
| Infra | Upstash Redis (rate limiting), AWS S3, Resend |

```
src/
├── app/            # (auth) (dashboard) (marketing) (onboarding) + api routes
├── lib/
│   ├── ai/         # order-parser · menu-extractor · whisper · prompt-builder
│   ├── whatsapp/   # inbound webhooks, outbound messaging
│   ├── payments/   # Bizum · Redsys · Stripe
│   ├── db/         # Drizzle schema + queries
│   └── storage/
└── components/
```

---

## Running it

```bash
npm install
cp .env.example .env.local     # database, Clerk, model providers, WhatsApp, payments
npm run dev
```

---

## What I'd do differently

Order parsing runs as a single model call per message with the conversation history replayed each time.
For a two-line order that is fine; for a long back-and-forth with corrections ("actually make that
three, no onions") it gets expensive and the failure modes are hard to reason about. I would restructure
it as an explicit state machine over the order, with the model handling only the transitions — and I
would build the evaluation harness first, because "did it parse this order correctly" is exactly the
kind of question that needs a regression suite rather than spot checks.

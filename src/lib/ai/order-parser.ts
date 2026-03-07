import { z } from "zod/v4";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

// --- Response schema ---

const parsedItemSchema = z.object({
  name: z.string(),
  quantity: z.number().int().positive(),
  variants: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

const parsedResponseSchema = z.object({
  type: z.enum(["order", "question", "greeting", "chitchat", "escalate"]),
  message: z.string(),
  items: z.array(parsedItemSchema).optional(),
  confidence: z.number().min(0).max(1).optional(),
  deliveryType: z.enum(["pickup", "delivery"]).optional(),
  deliveryAddress: z.string().optional(),
});

export type ParsedAiResponse = z.infer<typeof parsedResponseSchema>;
export type ParsedItem = z.infer<typeof parsedItemSchema>;

// --- Message history type ---

interface HistoryMessage {
  direction: string;
  content: string | null;
  messageType?: string;
}

// --- Provider interface ---

type LLMProvider = (
  systemPrompt: string,
  messages: Array<{ role: "user" | "assistant"; content: string }>
) => Promise<string>;

// --- Provider implementations (lazy singletons) ---

let _groqProvider: LLMProvider | null | undefined;
let _anthropicProvider: LLMProvider | null | undefined;
let _openaiProvider: LLMProvider | null | undefined;

function getGroqProvider(): LLMProvider | null {
  if (_groqProvider !== undefined) return _groqProvider;
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) { _groqProvider = null; return null; }

  const client = new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });
  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

  _groqProvider = async (systemPrompt, messages) => {
    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      temperature: 0.3,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    });
    return completion.choices[0]?.message?.content ?? "";
  };
  return _groqProvider;
}

function getAnthropicProvider(): LLMProvider | null {
  if (_anthropicProvider !== undefined) return _anthropicProvider;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) { _anthropicProvider = null; return null; }

  const client = new Anthropic({ apiKey });

  _anthropicProvider = async (systemPrompt, messages) => {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt + "\n\nIMPORTANT: Respond ONLY with valid JSON. No markdown, no code fences, no extra text.",
      messages,
    });
    const block = response.content[0];
    return block.type === "text" ? block.text : "";
  };
  return _anthropicProvider;
}

function getOpenAIProvider(): LLMProvider | null {
  if (_openaiProvider !== undefined) return _openaiProvider;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) { _openaiProvider = null; return null; }

  const client = new OpenAI({ apiKey });

  _openaiProvider = async (systemPrompt, messages) => {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      temperature: 0.3,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    });
    return completion.choices[0]?.message?.content ?? "";
  };
  return _openaiProvider;
}

function getProvider(): LLMProvider | null {
  return getGroqProvider() ?? getAnthropicProvider() ?? getOpenAIProvider();
}

// --- JSON extraction ---

function extractJson(raw: string): string {
  const trimmed = raw.trim();
  // If already starts with {, return as-is
  if (trimmed.startsWith("{")) return trimmed;
  // Try to extract JSON from markdown code blocks
  const match = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match) return match[1].trim();
  // Try to find first { ... } block
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start !== -1 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

// --- Main export ---

export async function parseOrder(
  systemPrompt: string,
  userMessage: string,
  history: HistoryMessage[]
): Promise<ParsedAiResponse> {
  const provider = getProvider();
  if (!provider) {
    return {
      type: "chitchat",
      message:
        "Hemos recibido tu mensaje. Un miembro de nuestro equipo te atenderá pronto.",
      confidence: 1,
    };
  }

  // Build conversation messages from history + current
  // Skip non-conversational outbound messages (order summaries, payment links, status notifications)
  const llmMessages: Array<{ role: "user" | "assistant"; content: string }> =
    [];
  for (const msg of history) {
    if (!msg.content) continue;
    // Skip system-generated outbound messages that aren't AI conversation
    if (msg.direction === "outbound" && msg.messageType === "interactive") continue;
    if (msg.direction === "outbound" && msg.content.startsWith("*Pago del pedido")) continue;
    llmMessages.push({
      role: msg.direction === "inbound" ? "user" : "assistant",
      content: msg.content,
    });
  }
  llmMessages.push({ role: "user", content: userMessage });

  // Call LLM with retry on malformed JSON
  for (let attempt = 0; attempt < 2; attempt++) {
    const raw = await provider(systemPrompt, llmMessages);
    const json = extractJson(raw);

    try {
      const data = JSON.parse(json);
      const result = parsedResponseSchema.parse(data);
      return result;
    } catch (err) {
      if (attempt === 0) {
        console.warn("Malformed AI response, retrying:", json.slice(0, 200));
        continue;
      }
      console.error("Failed to parse AI response after retry:", err);
    }
  }

  // Fallback if all attempts fail
  return {
    type: "chitchat",
    message:
      "Disculpa, no he podido procesar tu mensaje. ¿Podrías repetirlo?",
    confidence: 0,
  };
}

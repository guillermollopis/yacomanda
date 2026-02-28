import { z } from "zod/v4";
import OpenAI from "openai";

const menuItemSchema = z.object({
  name: z.string(),
  price: z.string(),
  category: z.string().optional(),
  description: z.string().optional(),
});

const extractionResultSchema = z.object({
  items: z.array(menuItemSchema),
});

export type ExtractedMenuItem = z.infer<typeof menuItemSchema>;

const SYSTEM_PROMPT = `Eres un experto en extraer datos de cartas de restaurante.

El usuario te enviará una foto de una carta/menú de restaurante. Extrae TODOS los productos que puedas identificar.

Responde SOLO con un JSON válido con esta estructura:
{
  "items": [
    {
      "name": "Nombre del plato",
      "price": "12.50",
      "category": "Entrantes",
      "description": "Descripción breve si la hay"
    }
  ]
}

Reglas:
- El precio SIEMPRE en formato decimal con punto: "8.50", "12.00", "3.50"
- Si no puedes leer el precio, pon "0.00"
- Agrupa por categorías si las ves en la carta (Entrantes, Principales, Postres, Bebidas, etc.)
- Si no hay categoría visible, usa "General"
- Omite descripciones si no aparecen en la carta
- Si la imagen no es una carta o no se puede leer, devuelve {"items": []}
- Incluye TODOS los items visibles, no solo algunos`;

let _groqVisionClient: OpenAI | null | undefined;

function getGroqVisionClient(): OpenAI | null {
  if (_groqVisionClient !== undefined) return _groqVisionClient;
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    _groqVisionClient = null;
    return null;
  }
  _groqVisionClient = new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });
  return _groqVisionClient;
}

function extractJson(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith("{")) return trimmed;
  const match = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match) return match[1].trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start !== -1 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

export async function extractMenuFromImage(
  base64Image: string,
  mimeType: string = "image/jpeg"
): Promise<ExtractedMenuItem[]> {
  const client = getGroqVisionClient();
  if (!client) {
    throw new Error("No hay ningún proveedor de IA configurado para procesar imágenes");
  }

  const dataUrl = `data:${mimeType};base64,${base64Image}`;

  const completion = await client.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: SYSTEM_PROMPT },
          { type: "image_url", image_url: { url: dataUrl } },
        ],
      },
    ],
    temperature: 0.1,
    max_tokens: 4096,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0]?.message?.content ?? "";
  const json = extractJson(raw);

  try {
    const data = JSON.parse(json);
    const result = extractionResultSchema.parse(data);
    return result.items;
  } catch {
    console.error("[menu-extractor] Failed to parse response:", json.slice(0, 300));
    return [];
  }
}

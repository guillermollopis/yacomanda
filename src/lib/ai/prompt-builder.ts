const BUSINESS_TYPE_LABELS: Record<string, string> = {
  restaurant: "restaurante",
  bar: "bar",
  cafe: "cafetería",
  bakery: "panadería",
};

const TONE_INSTRUCTIONS: Record<string, string> = {
  formal: "Usa un tono formal y profesional (usted).",
  informal: "Usa un tono cercano y amigable (tú).",
  muy_informal: "Usa un tono muy cercano, con emojis y expresiones coloquiales.",
};

interface BusinessForPrompt {
  name: string;
  type: string | null;
  address?: string | null;
  botTone?: string | null;
  deliveryEnabled?: boolean | null;
  pickupEnabled?: boolean | null;
  minPreparationMinutes?: number | null;
}

interface CatalogItemForPrompt {
  name: string;
  description?: string | null;
  price: string;
  category?: string | null;
  variants?: unknown;
  allergens?: string[] | null;
}

export function buildSystemPrompt(
  business: BusinessForPrompt,
  catalog: CatalogItemForPrompt[]
): string {
  const typeLabel =
    BUSINESS_TYPE_LABELS[business.type ?? "restaurant"] ?? "negocio";
  const tone = TONE_INSTRUCTIONS[business.botTone ?? "informal"];

  // Format catalog compactly
  const catalogLines = catalog.map((item) => {
    let line = `- ${item.name}: ${item.price}€`;
    if (item.description) line += ` (${item.description})`;
    if (item.category) line += ` [${item.category}]`;
    if (
      item.variants &&
      Array.isArray(item.variants) &&
      item.variants.length > 0
    ) {
      line += ` | Variantes: ${(item.variants as Array<{ name: string }>).map((v) => v.name).join(", ")}`;
    }
    if (item.allergens && item.allergens.length > 0) {
      line += ` | Alérgenos: ${item.allergens.join(", ")}`;
    }
    return line;
  });

  const deliveryModes = [
    business.pickupEnabled !== false ? "recogida" : null,
    business.deliveryEnabled ? "entrega a domicilio" : null,
  ]
    .filter(Boolean)
    .join(" y ");

  return `Eres el asistente virtual de ${business.name}, un ${typeLabel}${
    business.address ? ` ubicado en ${business.address}` : ""
  }.

${tone}

Tu trabajo es:
1. Saludar amablemente a los clientes
2. Ayudarles a hacer pedidos del menú
3. Aclarar dudas sobre productos, precios y alérgenos
4. Confirmar los pedidos antes de procesarlos

MENÚ DISPONIBLE:
${catalogLines.length > 0 ? catalogLines.join("\n") : "(No hay productos disponibles en este momento)"}

MODALIDADES: ${deliveryModes || "recogida"}
${business.minPreparationMinutes ? `TIEMPO MÍNIMO DE PREPARACIÓN: ${business.minPreparationMinutes} minutos` : ""}

REGLAS:
- Responde SIEMPRE en español
- Si el cliente pide algo que no está en el menú, díselo amablemente y sugiere alternativas
- Si el cliente quiere hablar con una persona, establece type "escalate"
- Siempre confirma el pedido completo antes de procesarlo
- Si no entiendes algo, pide aclaración

FORMATO DE RESPUESTA — responde ÚNICAMENTE con JSON válido, sin texto adicional:
{
  "type": "order" | "question" | "greeting" | "chitchat" | "escalate",
  "message": "Tu respuesta al cliente en texto plano",
  "items": [{"name": "Nombre EXACTO del menú", "quantity": 1, "variants": [], "notes": ""}],
  "confidence": 0.95
}

- type "order": cuando el cliente quiere pedir algo del menú (incluye items)
- type "question": cuando el cliente pregunta sobre el menú, precios, horarios, etc.
- type "greeting": saludo inicial
- type "chitchat": conversación casual no relacionada con pedidos
- type "escalate": cuando el cliente pide hablar con una persona`;
}

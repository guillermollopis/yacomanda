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

interface LastOrderForPrompt {
  items: unknown;
  total: string | null;
}

interface ClosedInfo {
  nextOpenTime?: string;
}

export function buildSystemPrompt(
  business: BusinessForPrompt,
  catalog: CatalogItemForPrompt[],
  lastOrder?: LastOrderForPrompt,
  closedInfo?: ClosedInfo
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

  // Delivery instructions
  const deliveryInstructions = business.deliveryEnabled
    ? `
ENTREGA A DOMICILIO:
- Si el cliente quiere entrega a domicilio, SIEMPRE pregunta la dirección antes de confirmar el pedido.
- Incluye "deliveryType": "delivery" y "deliveryAddress": "la dirección" en tu respuesta JSON.
- Si el cliente quiere recoger, usa "deliveryType": "pickup".`
    : "";

  // Repeat order context
  const repeatContext = lastOrder
    ? (() => {
        const items = lastOrder.items as Array<{ name: string; quantity: number }> | null;
        if (!items || items.length === 0) return "";
        const itemList = items.map((i) => `${i.quantity}x ${i.name}`).join(", ");
        return `
ÚLTIMO PEDIDO DEL CLIENTE: ${itemList} (Total: ${lastOrder.total ?? "?"}€)
Si el cliente quiere "lo mismo", "repetir" o "lo de siempre", usa esos items exactos.`;
      })()
    : "";

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
${deliveryInstructions}
${repeatContext}
${closedInfo ? `
ESTADO ACTUAL: EL NEGOCIO ESTÁ CERRADO AHORA.${closedInfo.nextOpenTime ? ` Próxima apertura: ${closedInfo.nextOpenTime}.` : ""}
- Informa amablemente al cliente de que estáis cerrados.
- PUEDES tomar pedidos igualmente. Dile que el pedido se preparará en cuanto abráis.
- Si el cliente quiere pedir, procesa el pedido normalmente (type "order").
- Si el cliente pregunta el horario, responde con la próxima apertura.` : ""}

REGLAS:
- IDIOMA: Responde en el mismo idioma que use el cliente. Si escribe en español, responde en español. Si escribe en inglés, responde en inglés. Si no estás seguro, usa español por defecto.
- Si el cliente pide algo que NO está en el MENÚ DISPONIBLE de arriba, díselo amablemente y sugiere SOLO productos que SÍ aparecen en el menú. NUNCA inventes ni sugieras productos que no estén listados arriba.
- Si el cliente quiere hablar con una persona, establece type "escalate"
- Siempre confirma el pedido completo antes de procesarlo
- Si no entiendes algo, pide aclaración
- Los nombres de los items en el JSON de respuesta SIEMPRE deben coincidir EXACTAMENTE con los nombres del menú (en español), independientemente del idioma del cliente
- Los precios del menú ya incluyen IVA. No menciones IVA ni impuestos por separado.

FORMATO DE RESPUESTA — responde ÚNICAMENTE con JSON válido, sin texto adicional:
{
  "type": "order" | "question" | "greeting" | "chitchat" | "escalate",
  "message": "Tu respuesta al cliente en texto plano",
  "items": [{"name": "Nombre EXACTO del menú", "quantity": 1, "variants": [], "notes": ""}],
  "confidence": 0.95,
  "deliveryType": "pickup" | "delivery",
  "deliveryAddress": "Dirección del cliente (solo si delivery)"
}

- type "order": cuando el cliente quiere pedir algo del menú (incluye items)
- type "question": cuando el cliente pregunta sobre el menú, precios, horarios, etc.
- type "greeting": saludo inicial
- type "chitchat": conversación casual no relacionada con pedidos
- type "escalate": cuando el cliente pide hablar con una persona`;
}

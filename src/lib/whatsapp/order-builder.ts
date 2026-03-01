/**
 * Catalog matching + order pricing for WhatsApp orders.
 */

interface AiItem {
  name: string;
  quantity: number;
  variants?: string[];
  notes?: string;
}

interface CatalogItem {
  id: string;
  name: string;
  price: string;
  category?: string | null;
}

export interface MatchedItem {
  catalogItemId: string;
  name: string;
  quantity: number;
  unitPrice: string;
  lineTotal: string;
  variants?: string[];
  notes?: string;
}

interface MatchResult {
  matched: MatchedItem[];
  unmatched: string[];
}

/** Remove diacritics and lowercase */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/** Word-overlap score: how many words from `a` appear in `b` */
function wordOverlap(a: string, b: string): number {
  const wordsA = normalize(a).split(/\s+/);
  const wordsB = new Set(normalize(b).split(/\s+/));
  return wordsA.filter((w) => w.length > 2 && wordsB.has(w)).length;
}

export function matchAndPriceItems(
  aiItems: AiItem[],
  catalog: CatalogItem[]
): MatchResult {
  const matched: MatchedItem[] = [];
  const unmatched: string[] = [];

  for (const aiItem of aiItems) {
    const normAi = normalize(aiItem.name);

    // 1. Exact normalized match
    let catalogMatch = catalog.find((c) => normalize(c.name) === normAi);

    // 2. Includes match (one contains the other)
    if (!catalogMatch) {
      catalogMatch = catalog.find((c) => {
        const normCat = normalize(c.name);
        return normCat.includes(normAi) || normAi.includes(normCat);
      });
    }

    // 3. Word-overlap fallback (>= 2 shared words)
    if (!catalogMatch) {
      let bestScore = 0;
      let bestMatch: CatalogItem | undefined;
      for (const c of catalog) {
        const score = wordOverlap(aiItem.name, c.name);
        if (score > bestScore && score >= 2) {
          bestScore = score;
          bestMatch = c;
        }
      }
      catalogMatch = bestMatch;
    }

    if (catalogMatch) {
      const unitPrice = parseFloat(catalogMatch.price);
      const lineTotal = (unitPrice * aiItem.quantity).toFixed(2);
      matched.push({
        catalogItemId: catalogMatch.id,
        name: catalogMatch.name,
        quantity: aiItem.quantity,
        unitPrice: catalogMatch.price,
        lineTotal,
        variants: aiItem.variants,
        notes: aiItem.notes,
      });
    } else {
      unmatched.push(aiItem.name);
    }
  }

  return { matched, unmatched };
}

const IVA_RATE = 10; // percent

export function calculateOrderTotals(items: MatchedItem[]) {
  // Use integer cents to avoid floating-point rounding errors
  const subtotalCents = items.reduce(
    (sum, i) => sum + Math.round(parseFloat(i.lineTotal) * 100),
    0
  );
  const taxCents = Math.round(subtotalCents * IVA_RATE / 100);
  const totalCents = subtotalCents + taxCents;
  return {
    subtotal: (subtotalCents / 100).toFixed(2),
    tax: (taxCents / 100).toFixed(2),
    total: (totalCents / 100).toFixed(2),
  };
}

export function buildOrderSummaryText(
  items: MatchedItem[],
  totals: { subtotal: string; tax: string; total: string }
): string {
  const lines = items.map(
    (i) => `- ${i.quantity}x ${i.name} — ${i.lineTotal}€`
  );
  return [
    "*Tu pedido:*",
    "",
    ...lines,
    "",
    `Subtotal: ${totals.subtotal}€`,
    `IVA (10%): ${totals.tax}€`,
    `*Total: ${totals.total}€*`,
  ].join("\n");
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://yacomanda.com";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "YaComanda",
        legalName: "PROTFORGE SL",
        url: BASE_URL,
        logo: `${BASE_URL}/pwa-icon-512`,
        description:
          "Automatiza los pedidos de tu restaurante por WhatsApp con inteligencia artificial. Sin comisiones.",
        email: "hola@yacomanda.com",
        telephone: "+34636873210",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Valencia",
          addressCountry: "ES",
        },
        sameAs: [
          `https://wa.me/34636873210`,
        ],
      }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "YaComanda",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Bot de WhatsApp con IA para restaurantes. Recibe pedidos, cobra automáticamente y gestiona tu negocio desde un panel.",
        url: BASE_URL,
        offers: [
          {
            "@type": "Offer",
            name: "Esencial",
            price: "29",
            priceCurrency: "EUR",
            priceValidUntil: "2026-12-31",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "Profesional",
            price: "79",
            priceCurrency: "EUR",
            priceValidUntil: "2026-12-31",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "Negocio",
            price: "199",
            priceCurrency: "EUR",
            priceValidUntil: "2026-12-31",
            availability: "https://schema.org/InStock",
          },
        ],
        aggregateRating: undefined,
      }}
    />
  );
}

export function FaqPageJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

export function BlogPostingJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        url: `${BASE_URL}/blog/${slug}`,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
          "@type": "Organization",
          name: "YaComanda",
          url: BASE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "YaComanda",
          logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/pwa-icon-512`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE_URL}/blog/${slug}`,
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

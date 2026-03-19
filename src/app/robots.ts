import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://yacomanda.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/sign-in/", "/sign-up/", "/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/dashboard/", "/sign-in/", "/sign-up/", "/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/dashboard/", "/sign-in/", "/sign-up/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/dashboard/", "/sign-in/", "/sign-up/", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/dashboard/", "/sign-in/", "/sign-up/", "/api/"],
      },
      {
        userAgent: "Claude-Web",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/dashboard/", "/sign-in/", "/sign-up/", "/api/"],
      },
      {
        userAgent: "Amazonbot",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/dashboard/", "/sign-in/", "/sign-up/", "/api/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/dashboard/", "/sign-in/", "/sign-up/", "/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/dashboard/", "/sign-in/", "/sign-up/", "/api/"],
      },
      {
        userAgent: "Bytespider",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/dashboard/", "/sign-in/", "/sign-up/", "/api/"],
      },
      {
        userAgent: "cohere-ai",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/dashboard/", "/sign-in/", "/sign-up/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

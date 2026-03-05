import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YaComanda — Pedidos por WhatsApp con IA",
    short_name: "YaComanda",
    description:
      "Gestiona los pedidos de tu restaurante por WhatsApp. Panel de control, cocina en tiempo real y analíticas.",
    start_url: "/dashboard",
    display: "standalone",
    orientation: "any",
    background_color: "#ffffff",
    theme_color: "#16a34a",
    categories: ["business", "food", "productivity"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/pwa-icon-192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Pedidos",
        short_name: "Pedidos",
        url: "/orders",
      },
      {
        name: "Cocina",
        short_name: "Cocina",
        url: "/orders/cocina",
      },
      {
        name: "Conversaciones",
        short_name: "Chat",
        url: "/conversations",
      },
    ],
  };
}

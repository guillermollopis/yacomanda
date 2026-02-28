import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://yacomanda.com"
  ),
  title: {
    default: "YaComanda — Pedidos por WhatsApp con IA",
    template: "%s | YaComanda",
  },
  description:
    "Automatiza los pedidos de tu restaurante por WhatsApp con inteligencia artificial. Un producto de PROTFORGE SL.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "YaComanda",
    title: "YaComanda — Pedidos por WhatsApp con IA",
    description:
      "Automatiza los pedidos de tu restaurante por WhatsApp con inteligencia artificial. Un producto de PROTFORGE SL.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = clerkKey && !clerkKey.includes("REPLACE_ME");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const body = (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );

  if (isClerkConfigured) {
    return (
      <ClerkProvider localization={esES}>{body}</ClerkProvider>
    );
  }

  return body;
}

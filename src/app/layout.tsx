import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { Toaster } from "@/components/ui/sonner";
import { CookieConsent } from "@/components/cookie-consent";
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
    "Automatiza los pedidos de tu restaurante por WhatsApp con inteligencia artificial. Sin comisiones. Sin Glovo. Cobra con Bizum. Listo en 15 minutos.",
  keywords: [
    "pedidos whatsapp",
    "restaurante",
    "automatizar pedidos",
    "bizum",
    "bot whatsapp",
    "ia restaurante",
    "yacomanda",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "YaComanda",
    title: "YaComanda — Pedidos por WhatsApp con IA",
    description:
      "Automatiza los pedidos de tu restaurante por WhatsApp con IA. Sin comisiones. Cobra con Bizum y tarjeta.",
  },
  twitter: {
    card: "summary_large_image",
    title: "YaComanda — Pedidos por WhatsApp con IA",
    description:
      "Automatiza los pedidos de tu restaurante por WhatsApp con IA. Sin comisiones. Cobra con Bizum y tarjeta.",
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "YaComanda",
  },
  other: {
    "mobile-web-app-capable": "yes",
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
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
        <CookieConsent />
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
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

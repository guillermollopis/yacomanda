import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommissionCalculator } from "@/components/marketing/commission-calculator";

export const metadata: Metadata = {
  title:
    "Calculadora de comisiones para restaurantes — Glovo, Rappi, Uber Eats | YaComanda",
  description:
    "Calcula cuanto pierdes en comisiones con Glovo, Rappi, Uber Eats, Just Eat o PedidosYa. Descubre cuanto ahorras con un sistema de pedidos por WhatsApp sin comisiones.",
  keywords: [
    "calculadora comisiones glovo",
    "cuanto cobra glovo a restaurantes",
    "comisiones uber eats restaurante",
    "comisiones rappi restaurante",
    "comisiones pedidosya",
    "ahorrar comisiones delivery",
    "alternativa glovo sin comisiones",
    "pedidos whatsapp restaurante",
  ],
  openGraph: {
    title: "Calculadora de comisiones — cuanto pierdes con Glovo, Rappi o Uber Eats",
    description:
      "Calcula en 10 segundos cuanto dinero pierdes al ano en comisiones de plataformas de delivery y cuanto ahorrarias con YaComanda.",
  },
};

export default function CalculadoraComisionesPage() {
  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Calculadora de comisiones para restaurantes — YaComanda",
            description:
              "Herramienta gratuita para calcular cuanto pierdes en comisiones con Glovo, Rappi, Uber Eats, Just Eat o PedidosYa.",
            url: "https://yacomanda.com/calculadora-comisiones",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
            },
            creator: {
              "@type": "Organization",
              name: "YaComanda",
              url: "https://yacomanda.com",
            },
          }),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 px-4 pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="pointer-events-none absolute -left-32 top-20 size-[400px] rounded-full bg-red-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 size-[400px] rounded-full bg-green-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-semibold text-red-400">
            <Calculator className="size-4" />
            Herramienta gratuita
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            ¿Cuanto pierdes en{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              comisiones de delivery
            </span>
            ?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Calcula en 10 segundos cuanto dinero regalas al ano a Glovo, Rappi,
            Uber Eats o PedidosYa. Y descubre cuanto ahorrarias con un canal
            propio por WhatsApp.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="bg-slate-50 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <CommissionCalculator />
        </div>
      </section>

      {/* WHY SWITCH SECTION */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-extrabold text-slate-900 md:text-4xl">
            ¿Por que restaurantes estan dejando las plataformas?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-500">
            Las comisiones del 25-30% se comen tu margen. Pero tus clientes ya
            te conocen — no necesitas pagar a un intermediario para que te hagan
            un pedido.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex size-12 items-center justify-center rounded-xl bg-green-100">
                <TrendingUp className="size-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Sin comisiones
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Tarifa plana de 29€/mes. Da igual si recibes 10 o 1.000 pedidos.
                Todo el margen es tuyo.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex size-12 items-center justify-center rounded-xl bg-blue-100">
                <Zap className="size-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                IA que entiende pedidos
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Tu cliente escribe por WhatsApp como siempre. La IA entiende el
                pedido, confirma, cobra y lo manda a cocina.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex size-12 items-center justify-center rounded-xl bg-amber-100">
                <Shield className="size-6 text-amber-600" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Tus clientes, tus datos
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Con las plataformas, el cliente es suyo. Con YaComanda, tienes
                el historial, el contacto y la relacion directa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold text-slate-900">
            Comparativa rapida
          </h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-500" />
                  <th className="px-4 py-3 text-center font-semibold text-red-600">
                    Plataformas
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-green-600">
                    YaComanda
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Comision por pedido", "25-30%", "0%"],
                  ["Coste mensual", "Variable (sin limite)", "29€ tarifa plana"],
                  ["Datos de clientes", "Los tiene la plataforma", "Son tuyos"],
                  ["Canal", "App de terceros", "WhatsApp (ya lo usan)"],
                  ["Marca", "Tu logo entre 1.000", "Tu WhatsApp, tu marca"],
                  ["Configuracion", "Dias", "15 minutos"],
                ].map(([label, platform, yc]) => (
                  <tr key={label}>
                    <td className="px-4 py-3 font-medium text-slate-700">
                      {label}
                    </td>
                    <td className="px-4 py-3 text-center text-red-600">
                      {platform}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-green-600">
                      {yc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-green-600 to-emerald-700 p-8 text-center text-white shadow-2xl shadow-green-600/20 md:p-12">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Deja de regalar tu margen
          </h2>
          <p className="mt-4 text-lg text-green-100">
            Empieza a recibir pedidos por WhatsApp sin comisiones. 30 dias
            gratis, sin tarjeta.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-white font-bold text-green-700 shadow-lg hover:bg-green-50"
              >
                Empezar gratis
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/piloto">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 font-semibold text-white hover:bg-white/10"
              >
                Solicitar demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

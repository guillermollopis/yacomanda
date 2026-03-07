import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Check, Minus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PricingFaq } from "@/components/marketing/pricing-faq";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Planes y precios de YaComanda. Tarifa plana sin comisiones. Empieza gratis y paga solo cuando crezcas.",
};

const plans = [
  {
    name: "Esencial",
    price: "29",
    description: "Para restaurantes que empiezan con pedidos online",
    highlight: false,
    features: [
      "500 pedidos/mes",
      "Bot IA en WhatsApp",
      "Panel de gestion",
      "Cobro con tarjeta y efectivo",
      "Gestion de carta",
      "Historial de pedidos",
    ],
  },
  {
    name: "Profesional",
    price: "79",
    description: "Para restaurantes con volumen de pedidos creciente",
    highlight: true,
    features: [
      "Hasta 2.000 pedidos/mes",
      "Todo lo de Esencial",
      "Analiticas avanzadas",
      "Soporte prioritario",
      "Gestion de equipo",
      "Exportacion de datos",
    ],
  },
  {
    name: "Negocio",
    price: "199",
    description: "Para cadenas y restaurantes con alto volumen",
    highlight: false,
    features: [
      "Pedidos ilimitados",
      "Todo lo de Profesional",
      "Multi-local",
      "Account manager dedicado",
      "API personalizada",
      "Integraciones a medida",
    ],
  },
];

const comparisonFeatures = [
  { name: "Pedidos/mes", esencial: "500", profesional: "2.000", negocio: "Ilimitados" },
  { name: "Bot IA WhatsApp", esencial: true, profesional: true, negocio: true },
  { name: "Panel de gestion", esencial: true, profesional: true, negocio: true },
  { name: "Cobro tarjeta + efectivo", esencial: true, profesional: true, negocio: true },
  { name: "Gestion de carta", esencial: true, profesional: true, negocio: true },
  { name: "Historial de pedidos", esencial: true, profesional: true, negocio: true },
  { name: "Analiticas avanzadas", esencial: false, profesional: true, negocio: true },
  { name: "Soporte prioritario", esencial: false, profesional: true, negocio: true },
  { name: "Gestion de equipo", esencial: false, profesional: true, negocio: true },
  { name: "Exportacion de datos", esencial: false, profesional: true, negocio: true },
  { name: "Multi-local", esencial: false, profesional: false, negocio: true },
  { name: "Account manager", esencial: false, profesional: false, negocio: true },
  { name: "API personalizada", esencial: false, profesional: false, negocio: true },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm font-semibold text-slate-900">{value}</span>;
  }
  return value ? (
    <div className="mx-auto flex size-6 items-center justify-center rounded-full bg-green-100">
      <Check className="size-3.5 text-green-600" />
    </div>
  ) : (
    <Minus className="mx-auto size-4 text-slate-300" />
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl flex-1 px-4 pb-20 pt-32">
      <div className="text-center">
        <span className="mb-3 inline-block rounded-full bg-green-50 px-4 py-1 text-sm font-semibold text-green-600">
          Precios transparentes
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Precios
        </h1>
        <p className="mt-4 text-lg text-slate-500">
          Tarifa plana, sin comisiones por pedido. Sin permanencia.
        </p>
      </div>

      {/* Plan cards */}
      <div className="mt-14 grid items-start gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={
              plan.highlight
                ? "relative rounded-2xl bg-gradient-to-b from-green-500 to-green-600 p-[2px] shadow-xl shadow-green-500/20 md:scale-105"
                : "card-hover"
            }
          >
            <div
              className={`rounded-2xl ${plan.highlight ? "bg-white" : "border border-slate-200 bg-white"} p-8`}
            >
              {plan.highlight && (
                <div className="mb-4 inline-block rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
                  Mas popular
                </div>
              )}
              <h2 className="text-lg font-bold text-slate-900">{plan.name}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {plan.description}
              </p>
              <p className="mt-4">
                <span className="text-4xl font-extrabold text-slate-900">{plan.price}&euro;</span>
                <span className="text-base text-slate-500">/mes</span>
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                    <span className="text-slate-600">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="mt-8 block">
                <Button
                  className={`w-full rounded-xl ${
                    plan.highlight
                      ? "bg-green-500 text-white shadow-md shadow-green-500/20 hover:bg-green-400"
                      : ""
                  }`}
                  variant={plan.highlight ? "default" : "outline"}
                >
                  Empezar gratis
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Kit Digital badge */}
      <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 text-center">
        <p className="text-lg font-bold text-slate-900">🏛️ Kit Digital</p>
        <p className="mt-2 text-sm text-slate-600">
          YaComanda es elegible como solucion de comercio electronico dentro del
          programa Kit Digital del Gobierno de Espana. Puedes financiar hasta el
          100% del coste si eres pyme o autonomo.{" "}
          <Link
            href="/contacto"
            className="font-semibold text-green-600 hover:text-green-500"
          >
            Contactanos para mas informacion
          </Link>
          .
        </p>
      </div>

      {/* Comparison table */}
      <div className="mt-20">
        <h2 className="text-center text-2xl font-extrabold text-slate-900">
          Comparativa de planes
        </h2>
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-[200px] font-semibold text-slate-900">Funcionalidad</TableHead>
                <TableHead className="text-center font-semibold text-slate-900">Esencial</TableHead>
                <TableHead className="text-center font-bold text-green-600">Profesional</TableHead>
                <TableHead className="text-center font-semibold text-slate-900">Negocio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonFeatures.map((feature, i) => (
                <TableRow key={feature.name} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <TableCell className="font-medium text-slate-700">{feature.name}</TableCell>
                  <TableCell className="text-center">
                    <FeatureCell value={feature.esencial} />
                  </TableCell>
                  <TableCell className="text-center">
                    <FeatureCell value={feature.profesional} />
                  </TableCell>
                  <TableCell className="text-center">
                    <FeatureCell value={feature.negocio} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pricing FAQ */}
      <div className="mt-20">
        <h2 className="text-center text-2xl font-extrabold text-slate-900">
          Preguntas frecuentes sobre precios
        </h2>
        <div className="mx-auto mt-8 max-w-2xl">
          <PricingFaq />
        </div>
      </div>
    </div>
  );
}

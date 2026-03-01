import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      "Hasta 500 pedidos/mes",
      "Bot IA en WhatsApp",
      "Panel de gestion",
      "Cobro con Bizum y tarjeta",
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
  { name: "Cobro Bizum + tarjeta", esencial: true, profesional: true, negocio: true },
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
    return <span className="text-sm font-medium">{value}</span>;
  }
  return value ? (
    <Check className="mx-auto size-4 text-primary" />
  ) : (
    <Minus className="mx-auto size-4 text-muted-foreground/40" />
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl flex-1 px-4 py-16">
      <h1 className="text-center text-4xl font-bold">Precios</h1>
      <p className="mt-4 text-center text-muted-foreground">
        Tarifa plana, sin comisiones por pedido. Sin permanencia.
      </p>

      {/* Plan cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={
              plan.highlight
                ? "relative scale-105 border-2 border-primary shadow-xl shadow-primary/10"
                : "card-hover"
            }
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-emerald-400 px-4 py-0.5 text-xs font-medium text-white shadow-md">
                Mas popular
              </div>
            )}
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <p className="mt-4 text-4xl font-bold">
                {plan.price}&euro;
                <span className="text-base font-normal text-muted-foreground">
                  /mes
                </span>
              </p>
              <ul className="mt-6 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="mt-6 block">
                <Button
                  className={`w-full ${plan.highlight ? "bg-gradient-to-r from-primary to-primary/80 shadow-md shadow-primary/20" : ""}`}
                  variant={plan.highlight ? "default" : "outline"}
                >
                  Empezar gratis
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kit Digital badge */}
      <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
        <p className="text-lg font-semibold">Kit Digital</p>
        <p className="mt-2 text-sm text-muted-foreground">
          YaComanda es elegible como solucion de comercio electronico dentro del
          programa Kit Digital del Gobierno de Espana. Puedes financiar hasta el
          100% del coste si eres pyme o autonomo.{" "}
          <Link
            href="/contacto"
            className="font-medium text-primary hover:underline"
          >
            Contactanos para mas informacion
          </Link>
          .
        </p>
      </div>

      {/* Comparison table */}
      <div className="mt-16">
        <h2 className="text-center text-2xl font-bold">
          Comparativa de planes
        </h2>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Funcionalidad</TableHead>
                <TableHead className="text-center">Esencial</TableHead>
                <TableHead className="text-center font-bold text-primary">Profesional</TableHead>
                <TableHead className="text-center">Negocio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonFeatures.map((feature) => (
                <TableRow key={feature.name}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  <TableCell className="text-center">
                    <FeatureCell value={feature.esencial} />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
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
      <div className="mt-16">
        <h2 className="text-center text-2xl font-bold">
          Preguntas frecuentes sobre precios
        </h2>
        <div className="mx-auto mt-8 max-w-2xl">
          <PricingFaq />
        </div>
      </div>
    </div>
  );
}

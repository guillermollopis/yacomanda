import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Planes y precios de YaComanda. Empieza gratis y paga solo cuando crezcas.",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl flex-1 px-4 py-16">
      <h1 className="text-center text-4xl font-bold">Precios</h1>
      <p className="mt-4 text-center text-muted-foreground">
        Empieza gratis. Paga solo cuando crezcas.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Esencial</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">29&euro;/mes</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Hasta 500 pedidos/mes
            </p>
            <Link href="/sign-up" className="mt-6 block">
              <Button className="w-full">Empezar</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Profesional</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">79&euro;/mes</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Hasta 2.000 pedidos/mes
            </p>
            <Link href="/sign-up" className="mt-6 block">
              <Button className="w-full">Empezar</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Negocio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">199&euro;/mes</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Pedidos ilimitados
            </p>
            <Link href="/sign-up" className="mt-6 block">
              <Button className="w-full">Empezar</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

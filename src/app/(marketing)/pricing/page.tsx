import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">YaComanda</Link>
          <Link href="/sign-up">
            <Button size="sm">Empezar gratis</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl flex-1 px-4 py-16">
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
              <p className="mt-2 text-sm text-muted-foreground">Hasta 500 pedidos/mes</p>
            </CardContent>
          </Card>

          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Profesional</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">79&euro;/mes</p>
              <p className="mt-2 text-sm text-muted-foreground">Hasta 2.000 pedidos/mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Negocio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">199&euro;/mes</p>
              <p className="mt-2 text-sm text-muted-foreground">Pedidos ilimitados</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

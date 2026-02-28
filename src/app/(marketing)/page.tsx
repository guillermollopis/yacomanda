import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight">
          Automatiza los pedidos de tu restaurante por WhatsApp
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          YaComanda usa inteligencia artificial para recibir pedidos, gestionar
          tu carta y cobrar a tus clientes — todo desde WhatsApp.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/sign-up">
            <Button size="lg">Empezar gratis</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg">
              Ver precios
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">
            Todo lo que necesitas para gestionar pedidos
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos por WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tus clientes hacen pedidos directamente desde WhatsApp, el
                  canal que ya usan a diario. Sin apps ni descargas.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>IA que entiende pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nuestra inteligencia artificial interpreta mensajes en lenguaje
                  natural y los convierte en pedidos estructurados al instante.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Panel de gestion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Gestiona tu carta, revisa pedidos, controla pagos y analiza tu
                  negocio desde un panel web intuitivo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold">Como funciona</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mt-4 font-semibold">Configura tu carta</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sube tu menu al panel con precios, variantes y alergenos. Listo
                en minutos.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mt-4 font-semibold">Conecta WhatsApp</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Vincula tu numero de WhatsApp Business y activa el bot
                automatico.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mt-4 font-semibold">Recibe pedidos</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Los clientes escriben por WhatsApp y la IA convierte sus
                mensajes en pedidos listos para preparar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre nosotros */}
      <section className="border-t bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">Sobre nosotros</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            YaComanda es un producto de{" "}
            <strong className="text-foreground">PROTFORGE SL</strong>, una
            empresa de tecnologia con sede en Valencia, Espana. Nuestra mision
            es ayudar a los negocios de hosteleria a modernizar sus operaciones
            con herramientas sencillas y asequibles.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">
            Empieza a recibir pedidos hoy mismo
          </h2>
          <p className="mt-4 text-muted-foreground">
            Configura tu restaurante en minutos. Sin compromiso, sin tarjeta de
            credito.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg">Empezar gratis</Button>
            </Link>
            <Link href="/contacto">
              <Button variant="outline" size="lg">
                Contactanos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import {
  MessageSquare,
  CreditCard,
  LayoutDashboard,
  Clock,
  X,
  Check,
  Bot,
  ChefHat,
  Smartphone,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { FaqSection } from "@/components/marketing/faq-section";

export default function LandingPage() {
  return (
    <>
      {/* Hero — Dark gradient with grid pattern */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] px-4 py-24 md:py-32">
        {/* Grid pattern overlay */}
        <div className="bg-grid-pattern pointer-events-none absolute inset-0" />
        {/* Glow orbs */}
        <div className="pointer-events-none absolute left-1/4 top-1/4 size-96 rounded-full bg-primary/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 size-64 rounded-full bg-amber-500/10 blur-[80px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            {/* Eyebrow badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary">
              <Sparkles className="size-3.5" />
              <span>Potenciado por IA</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Tus pedidos de WhatsApp,{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                directo a cocina
              </span>
            </h1>
            <p className="mt-6 text-lg text-[oklch(0.75_0.01_260)]">
              Automatiza pedidos y cobra con Bizum. Sin comisiones. Sin Glovo.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="animate-pulse-glow bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25"
                >
                  Empieza gratis
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="#como-funciona">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  Ver como funciona
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual mockup — floating */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm animate-float">
              {/* WhatsApp bubble */}
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/20">
                    <MessageSquare className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Cliente</p>
                    <p className="text-xs text-white/50">WhatsApp</p>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="w-fit rounded-xl rounded-tl-sm bg-white/10 px-3 py-2 text-sm text-white/90">
                    Hola, quiero 2 pizzas margarita y una coca cola
                  </div>
                  <div className="ml-auto w-fit rounded-xl rounded-tr-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
                    <Sparkles className="mb-1 inline size-3" /> Pedido #47
                    confirmado! Total: 23,50€. Listo en 25 min.
                  </div>
                </div>
              </div>
              {/* Dashboard card overlay */}
              <div className="-mt-4 ml-8 rounded-xl border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-md bg-primary/20">
                    <ChefHat className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      Pedido #47
                    </p>
                    <p className="text-xs text-white/60">
                      2x Pizza Margarita, 1x Coca Cola
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar — Stats-based */}
      <section className="border-b bg-muted/30 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "500+", label: "Restaurantes" },
              { value: "50K+", label: "Pedidos procesados" },
              { value: "0%", label: "Comisiones" },
              { value: "<15min", label: "Configuracion" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-primary md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Comparison */}
      <section className="px-4 py-20">
        <AnimateOnScroll className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Deja de pagar comisiones del 30%
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Problem */}
            <Card className="border-l-4 border-l-destructive card-hover">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-destructive">
                  Plataformas de delivery
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "Comisiones del 25-35% por pedido",
                    "Sin acceso a los datos de tus clientes",
                    "Dependencia total de la plataforma",
                    "Tu marca se diluye entre la competencia",
                    "Pagos retenidos durante semanas",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card className="border-l-4 border-l-primary card-hover">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-primary">
                  YaComanda
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "Tarifa plana, sin comisiones por pedido",
                    "Tus clientes, tus datos, tu relacion",
                    "Canal propio: WhatsApp de tu negocio",
                    "Tu marca siempre en primer plano",
                    "Cobro directo a tu cuenta al instante",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Callout */}
          <div className="mt-8 rounded-xl border bg-muted/50 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              200 pedidos/mes &times; 20&euro; de media ={" "}
              <strong className="text-destructive">
                1.200&euro; en comisiones
              </strong>
              . Con YaComanda:{" "}
              <strong className="text-primary">29&euro;/mes</strong>.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* How It Works — Timeline style */}
      <section
        id="como-funciona"
        className="scroll-mt-20 border-t bg-muted/30 px-4 py-20"
      >
        <AnimateOnScroll className="mx-auto max-w-5xl" delay={100}>
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Como funciona
          </h2>
          <p className="mt-4 text-center text-muted-foreground">
            En 3 pasos y sin complicaciones
          </p>
          <div className="relative mt-12 grid gap-10 md:grid-cols-3">
            {/* Connector line (desktop only) */}
            <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 md:block" />
            {[
              {
                step: 1,
                icon: Smartphone,
                title: "Tu cliente escribe por WhatsApp",
                desc: "Como siempre. Sin apps, sin descargas, sin QRs. Escribe un mensaje con lo que quiere y listo.",
              },
              {
                step: 2,
                icon: Bot,
                title: "La IA entiende y cobra",
                desc: "Nuestro bot interpreta el pedido, confirma los detalles y envia el enlace de pago automaticamente.",
              },
              {
                step: 3,
                icon: ChefHat,
                title: "Tu solo preparas",
                desc: "El pedido llega a tu panel listo para cocina. Sin tocar el movil, sin errores, sin esperas.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="relative z-10 mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/20">
                  {item.step}
                </div>
                <div className="mx-auto mt-4 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="size-5 text-primary" />
                </div>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* Features Grid — with icon hover effects */}
      <section id="funcionalidades" className="scroll-mt-20 px-4 py-20">
        <AnimateOnScroll className="mx-auto max-w-5xl" delay={100}>
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Todo lo que necesitas
          </h2>
          <p className="mt-4 text-center text-muted-foreground">
            Sin complicaciones, sin integraciones eternas
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: Bot,
                title: "IA en espanol",
                desc: "Entiende texto, audio y fotos. Tu bot habla como tu quieras: formal, informal o personalizado.",
                color: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
              },
              {
                icon: CreditCard,
                title: "Cobro automatico",
                desc: "Bizum y tarjeta integrados. Tu cliente paga sin salir de WhatsApp. Tu cobras al instante.",
                color: "bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white",
              },
              {
                icon: LayoutDashboard,
                title: "Panel en tiempo real",
                desc: "Pedidos, carta, clientes, analiticas y equipo. Todo desde un panel web accesible desde cualquier dispositivo.",
                color: "bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white",
              },
              {
                icon: Clock,
                title: "Listo en 15 minutos",
                desc: "Sube tu carta, conecta WhatsApp, activa el bot. Configuracion guiada paso a paso.",
                color: "bg-pink-100 text-pink-600 group-hover:bg-pink-500 group-hover:text-white",
              },
            ].map((feature) => (
              <Card key={feature.title} className="group card-hover">
                <CardContent className="flex gap-4 pt-6">
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-lg transition-colors ${feature.color}`}
                  >
                    <feature.icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* Pricing Preview — with gradient-border featured plan */}
      <section className="border-t bg-muted/30 px-4 py-20">
        <AnimateOnScroll className="mx-auto max-w-5xl" delay={100}>
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Planes simples, sin sorpresas
          </h2>
          <p className="mt-4 text-center text-muted-foreground">
            Sin comisiones por pedido. Sin permanencia.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Esencial",
                price: "29",
                highlight: false,
                features: [
                  "Hasta 500 pedidos/mes",
                  "Bot IA en WhatsApp",
                  "Panel de gestion",
                  "Cobro con Bizum y tarjeta",
                ],
              },
              {
                name: "Profesional",
                price: "79",
                highlight: true,
                features: [
                  "Hasta 2.000 pedidos/mes",
                  "Todo lo de Esencial",
                  "Analiticas avanzadas",
                  "Soporte prioritario",
                ],
              },
              {
                name: "Negocio",
                price: "199",
                highlight: false,
                features: [
                  "Pedidos ilimitados",
                  "Todo lo de Profesional",
                  "Multi-local",
                  "Account manager dedicado",
                ],
              },
            ].map((plan) => (
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
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-2 text-3xl font-bold">
                    {plan.price}&euro;
                    <span className="text-base font-normal text-muted-foreground">
                      /mes
                    </span>
                  </p>
                  <ul className="mt-4 space-y-2">
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
                      Empezar
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Kit Digital callout */}
          <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
            <p className="text-sm font-medium">
              Financiable con{" "}
              <strong>Kit Digital</strong> — Subvencion de hasta el 100% para
              pymes y autonomos
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/pricing"
              className="text-sm font-medium text-primary hover:underline"
            >
              Ver comparativa completa de planes →
            </Link>
          </div>
        </AnimateOnScroll>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Preguntas frecuentes
          </h2>
          <div className="mt-10">
            <FaqSection />
          </div>
        </div>
      </section>

      {/* Final CTA — Dark gradient */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-cta)] px-4 py-20">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Empieza a recibir pedidos hoy mismo
          </h2>
          <p className="mt-4 text-[oklch(0.75_0.01_260)]">
            Configura tu restaurante en minutos. Sin compromiso, sin tarjeta de
            credito.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25"
              >
                Empieza gratis
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/contacto">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                Contactanos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

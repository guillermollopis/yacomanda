import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  Users,
} from "lucide-react";
import { FaqSection } from "@/components/marketing/faq-section";
import { faqs } from "@/components/marketing/faq-data";
import {
  OrganizationJsonLd,
  SoftwareApplicationJsonLd,
  FaqPageJsonLd,
} from "@/components/marketing/json-ld";

export default function LandingPage() {
  return (
    <>
      <OrganizationJsonLd />
      <SoftwareApplicationJsonLd />
      <FaqPageJsonLd items={faqs} />

      {/* ============================================
          HERO — Animated mesh gradient + noise
          ============================================ */}
      <section className="noise-overlay relative overflow-hidden mesh-gradient px-4 pb-24 pt-32 md:pb-32 md:pt-40">
        {/* Grid overlay */}
        <div className="bg-grid-pattern pointer-events-none absolute inset-0" />

        {/* Floating orbs */}
        <div className="pointer-events-none absolute -left-32 top-20 size-[500px] rounded-full bg-green-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-20 size-[400px] rounded-full bg-amber-500/15 blur-[100px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-400">
                <Sparkles className="size-4" />
                <span>Potenciado por IA</span>
                <span className="inline-block size-1.5 animate-pulse rounded-full bg-green-400" />
              </div>

              <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
                Tus pedidos por WhatsApp,{" "}
                <span className="text-gradient-green">directo a cocina</span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-slate-400 md:text-xl">
                Tu restaurante recibe pedidos por WhatsApp, la IA los entiende,
                cobra automaticamente y tu solo preparas. Sin comisiones. Sin Glovo.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="animate-pulse-glow h-12 rounded-xl bg-green-500 px-8 text-base font-semibold text-white hover:bg-green-400"
                  >
                    Empieza gratis
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
                <Link href="#como-funciona">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-xl border-white/15 bg-white/5 px-8 text-base text-white hover:bg-white/10 hover:text-white"
                  >
                    Ver como funciona
                  </Button>
                </Link>
              </div>

              {/* Mini trust */}
              <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
                <span>Prueba gratuita &middot; Sin tarjeta &middot; 5 min setup</span>
              </div>
            </div>

            {/* Floating mockup */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Glow behind card */}
                <div className="absolute inset-0 rounded-3xl bg-green-500/20 blur-[60px]" />

                {/* WhatsApp chat card */}
                <div className="glass-dark relative animate-float rounded-2xl p-5">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <div className="flex size-11 items-center justify-center rounded-full bg-green-500/20">
                      <MessageSquare className="size-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Maria Garcia</p>
                      <p className="text-xs text-slate-500">WhatsApp &middot; en linea</p>
                    </div>
                    <div className="ml-auto size-2 animate-pulse rounded-full bg-green-400" />
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="w-fit rounded-2xl rounded-tl-md bg-white/10 px-4 py-2.5 text-sm text-slate-300">
                      Hola! Quiero 2 pizzas margarita y una coca cola 🍕
                    </div>
                    <div className="ml-auto w-fit rounded-2xl rounded-br-md bg-green-500 px-4 py-2.5 text-sm text-white">
                      <Sparkles className="mb-0.5 inline size-3.5" /> Pedido #47
                      confirmado! Total: 23,50€ 🎉
                      <br />
                      <span className="text-green-100">Listo en 25 min.</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard overlay */}
                <div className="glass-dark relative -mt-3 ml-10 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/20">
                      <ChefHat className="size-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        Pedido #47 — Preparando
                      </p>
                      <p className="text-xs text-slate-500">
                        2x Pizza Margarita, 1x Coca Cola
                      </p>
                    </div>
                    <div className="ml-auto rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                      25 min
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          STATS BAR — Bold numbers
          ============================================ */}
      <section className="relative border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: "0%", label: "Comisiones por pedido", icon: Shield },
            { value: "24/7", label: "Bot activo sin descanso", icon: Users },
            { value: "~30%", label: "Ahorro vs plataformas", icon: TrendingUp },
            { value: "100%", label: "Subvencionable con Kit Digital", icon: Zap },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-xl bg-green-50">
                <stat.icon className="size-5 text-green-600" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900 md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          PROBLEM / SOLUTION — Split with color drama
          ============================================ */}
      <section className="px-4 py-24">
        <AnimateOnScroll className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="mb-3 inline-block rounded-full bg-red-50 px-4 py-1 text-sm font-semibold text-red-600">
              El problema
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Deja de pagar comisiones del{" "}
              <span className="text-gradient-warm">30%</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {/* Problem */}
            <div className="relative overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-8">
              <div className="absolute -right-6 -top-6 size-24 rounded-full bg-red-100" />
              <h3 className="relative text-lg font-bold text-red-600">
                Plataformas de delivery
              </h3>
              <ul className="relative mt-5 space-y-4">
                {[
                  "Comisiones del 25-35% por pedido",
                  "Sin acceso a los datos de tus clientes",
                  "Dependencia total de la plataforma",
                  "Tu marca se diluye entre la competencia",
                  "Pagos retenidos durante semanas",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <X className="size-3 text-red-600" />
                    </div>
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div className="relative overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-8">
              <div className="absolute -right-6 -top-6 size-24 rounded-full bg-green-100" />
              <h3 className="relative text-lg font-bold text-green-600">
                YaComanda
              </h3>
              <ul className="relative mt-5 space-y-4">
                {[
                  "Tarifa plana, sin comisiones por pedido",
                  "Tus clientes, tus datos, tu relacion",
                  "Canal propio: WhatsApp de tu negocio",
                  "Tu marca siempre en primer plano",
                  "Cobro directo a tu cuenta al instante",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Check className="size-3 text-green-600" />
                    </div>
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Savings callout */}
          <div className="mt-8 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 text-center">
            <p className="text-base text-slate-700">
              200 pedidos/mes &times; 20&euro; de media ={" "}
              <strong className="text-red-600">
                1.200&euro;/mes en comisiones
              </strong>
              . Con YaComanda:{" "}
              <strong className="text-green-600 text-xl">29&euro;/mes</strong>.
              <br />
              <span className="font-bold text-gradient-warm">Ahorras 1.171€ cada mes.</span>
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ============================================
          HOW IT WORKS — Timeline with connector
          ============================================ */}
      <section
        id="como-funciona"
        className="scroll-mt-20 bg-slate-50 px-4 py-24"
      >
        <AnimateOnScroll className="mx-auto max-w-5xl" delay={100}>
          <div className="text-center">
            <span className="mb-3 inline-block rounded-full bg-green-50 px-4 py-1 text-sm font-semibold text-green-600">
              Simple
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Tres pasos y{" "}
              <span className="text-gradient-green">listo</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Sin complicaciones, sin integraciones eternas
            </p>
          </div>

          <div className="relative mt-16 grid gap-8 md:grid-cols-3 md:gap-0">
            {/* Connector line */}
            <div className="pointer-events-none absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-green-500/0 via-green-500/40 to-green-500/0 md:block" />

            {[
              {
                step: 1,
                icon: Smartphone,
                color: "bg-green-500",
                title: "Tu cliente escribe por WhatsApp",
                desc: "Como siempre. Sin apps, sin descargas, sin QRs. Escribe un mensaje con lo que quiere y listo.",
                emoji: "💬",
              },
              {
                step: 2,
                icon: Bot,
                color: "bg-blue-500",
                title: "La IA entiende y cobra",
                desc: "Nuestro bot interpreta el pedido, confirma los detalles y envia el enlace de pago automaticamente.",
                emoji: "🤖",
              },
              {
                step: 3,
                icon: ChefHat,
                color: "bg-amber-500",
                title: "Tu solo preparas",
                desc: "El pedido llega a tu panel listo para cocina. Sin tocar el movil, sin errores, sin esperas.",
                emoji: "👨‍🍳",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center md:px-6">
                <div className={`relative z-10 mx-auto flex size-16 items-center justify-center rounded-2xl ${item.color} text-2xl font-extrabold text-white shadow-lg`}>
                  {item.step}
                </div>
                <div className="mt-5 text-3xl">{item.emoji}</div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* ============================================
          FEATURES — Bento grid on dark background
          ============================================ */}
      <section id="funcionalidades" className="noise-overlay relative scroll-mt-20 overflow-hidden bg-slate-950 px-4 py-24">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute left-1/3 top-0 size-[500px] rounded-full bg-green-500/10 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 size-[400px] rounded-full bg-amber-500/10 blur-[120px]" />

        <AnimateOnScroll className="relative mx-auto max-w-6xl" delay={100}>
          <div className="text-center">
            <span className="mb-3 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1 text-sm font-semibold text-green-400">
              Funcionalidades
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Todo lo que necesitas para{" "}
              <span className="text-gradient-green">vender mas</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Cada herramienta disenada para restaurantes como el tuyo
            </p>
          </div>

          {/* Bento Grid */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Bot,
                title: "IA en espanol",
                desc: "Entiende texto, audio y fotos. Tu bot habla como tu quieras.",
                color: "text-green-400",
                bg: "bg-green-500/10",
                span: "lg:col-span-2",
              },
              {
                icon: CreditCard,
                title: "Cobro automatico",
                desc: "Pago con tarjeta online o en local. Confirmación automática sin capturas.",
                color: "text-amber-400",
                bg: "bg-amber-500/10",
                span: "",
              },
              {
                icon: LayoutDashboard,
                title: "Panel en tiempo real",
                desc: "Pedidos, carta, clientes, analiticas y equipo. Desde cualquier dispositivo.",
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                span: "",
              },
              {
                icon: Clock,
                title: "Listo en 15 minutos",
                desc: "Sube tu carta con foto, conecta WhatsApp, activa el bot.",
                color: "text-rose-400",
                bg: "bg-rose-500/10",
                span: "",
              },
              {
                icon: BarChart3,
                title: "Analiticas avanzadas",
                desc: "Productos top, horas punta, clientes recurrentes. Datos para crecer.",
                color: "text-violet-400",
                bg: "bg-violet-500/10",
                span: "",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className={`bento-card p-8 ${feature.span}`}
              >
                <div className={`mb-4 flex size-12 items-center justify-center rounded-xl ${feature.bg}`}>
                  <feature.icon className={`size-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* ============================================
          WHY CHOOSE US — Honest trust signals
          ============================================ */}
      <section className="px-4 py-24">
        <AnimateOnScroll className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="mb-3 inline-block rounded-full bg-amber-50 px-4 py-1 text-sm font-semibold text-amber-600">
              Garantias
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Sin riesgo, sin compromiso
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Prueba gratis 30 días",
                text: "Configura tu restaurante, prueba el bot con tus clientes y decide si te convence. 50 pedidos incluidos, sin tarjeta de crédito.",
                icon: "🎯",
                color: "bg-green-50 border-green-200",
              },
              {
                title: "Cancela cuando quieras",
                text: "Sin permanencia ni penalizaciones. Si no te funciona, cancelas desde el panel en un clic. Tus datos siguen siendo tuyos.",
                icon: "🔓",
                color: "bg-blue-50 border-blue-200",
              },
              {
                title: "Tus datos, tu control",
                text: "Cumplimos con el RGPD y la LSSI-CE. Datos alojados en la UE. Puedes exportar tu lista de clientes y pedidos en cualquier momento.",
                icon: "🛡️",
                color: "bg-amber-50 border-amber-200",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`card-hover rounded-2xl border ${item.color} p-6 shadow-sm`}
              >
                <div className="mb-4 text-3xl">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* ============================================
          PRICING — Gradient-border featured plan
          ============================================ */}
      <section className="bg-slate-50 px-4 py-24">
        <AnimateOnScroll className="mx-auto max-w-5xl" delay={100}>
          <div className="text-center">
            <span className="mb-3 inline-block rounded-full bg-green-50 px-4 py-1 text-sm font-semibold text-green-600">
              Precios
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Planes simples, sin sorpresas
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Sin comisiones por pedido. Sin permanencia.
            </p>
          </div>

          <div className="mt-14 grid items-start gap-6 md:grid-cols-3">
            {[
              {
                name: "Esencial",
                price: "29",
                highlight: false,
                features: [
                  "500 pedidos/mes",
                  "Bot IA en WhatsApp",
                  "Panel de gestion",
                  "Cobro con tarjeta y efectivo",
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
                  <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                  <p className="mt-3">
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

          {/* Pricing notes */}
          <div className="mt-10 space-y-4">
            <div className="rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 text-center">
              <p className="text-sm font-medium text-slate-700">
                🏛️ Financiable con{" "}
                <strong>Kit Digital</strong> — Subvencion de hasta el 100% para
                pymes y autonomos
              </p>
            </div>
            <p className="text-center text-xs text-slate-400">
              Precios sin IVA. Los cobros online a tus clientes tienen una comision de procesamiento de Stripe del 1,5% + 0,25€ por transaccion (tarifa estandar en Europa).
              Si tus clientes pagan en efectivo, no hay ningun coste adicional.
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/pricing"
              className="text-sm font-semibold text-green-600 hover:text-green-500"
            >
              Ver comparativa completa de planes →
            </Link>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ============================================
          FAQ
          ============================================ */}
      <section className="px-4 py-24">
        <AnimateOnScroll className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="mt-10">
            <FaqSection />
          </div>
        </AnimateOnScroll>
      </section>

      {/* ============================================
          CTA — Dark gradient section
          ============================================ */}
      <section className="noise-overlay relative overflow-hidden bg-slate-950 px-4 py-24">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-1/4 top-0 size-[300px] rounded-full bg-amber-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Empieza a recibir pedidos{" "}
            <span className="text-gradient-green">hoy mismo</span>
          </h2>
          <p className="mt-6 text-lg text-slate-400">
            Configura tu restaurante en 15 minutos. Sin compromiso, sin tarjeta de
            credito.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="animate-pulse-glow h-12 rounded-xl bg-green-500 px-10 text-base font-semibold text-white hover:bg-green-400"
              >
                Empieza gratis
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
            <Link href="/contacto">
              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-xl border-white/15 bg-white/5 px-10 text-base text-white hover:bg-white/10 hover:text-white"
              >
                Contactanos
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            30 dias gratis &middot; Sin tarjeta de credito &middot; Configuracion en 15 min
          </p>
        </div>
      </section>
    </>
  );
}

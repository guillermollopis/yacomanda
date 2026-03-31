import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import {
  Check,
  ArrowRight,
  Gift,
  Users,
  Clock,
  Star,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { PilotForm } from "@/components/marketing/pilot-form";

export const metadata: Metadata = {
  title: "Programa Piloto Gratuito | YaComanda",
  description:
    "Buscamos 5 restaurantes en Valencia para probar YaComanda gratis durante 3 meses. Bot de WhatsApp con IA para recibir pedidos automaticamente. Sin compromiso.",
  openGraph: {
    title: "Programa Piloto Gratuito | YaComanda",
    description:
      "Buscamos 5 restaurantes para probar YaComanda gratis durante 3 meses. Sin compromiso.",
  },
};

const benefits = [
  "3 meses completamente gratis — sin tarjeta, sin compromiso",
  "Te lo configuramos nosotros en menos de 15 minutos",
  "Soporte directo con el fundador por WhatsApp",
  "Tu feedback nos ayuda a mejorar el producto para ti",
  "Si no te convence, te vas sin pagar nada",
];

const steps = [
  {
    num: "1",
    title: "Rellena el formulario",
    desc: "Solo nombre, restaurante y WhatsApp. 30 segundos.",
  },
  {
    num: "2",
    title: "Te contactamos en 24h",
    desc: "Te explicamos todo y resolvemos dudas. Sin presion.",
  },
  {
    num: "3",
    title: "Configuramos todo",
    desc: "Subimos tu carta y conectamos el bot a tu WhatsApp Business.",
  },
  {
    num: "4",
    title: "Empiezas a recibir pedidos",
    desc: "Tus clientes escriben, la IA entiende, cobra y tu preparas.",
  },
];

export default function PilotoPage() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="noise-overlay relative overflow-hidden mesh-gradient px-4 pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="pointer-events-none absolute -left-32 top-20 size-[500px] rounded-full bg-green-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-20 size-[400px] rounded-full bg-amber-500/15 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
            <Gift className="size-4" />
            <span>Solo 5 plazas disponibles</span>
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-amber-400" />
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            Buscamos 5 restaurantes para probar YaComanda{" "}
            <span className="text-gradient-green">gratis durante 3 meses</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
            Estamos lanzando nuestro bot de IA para pedidos por WhatsApp y
            necesitamos restaurantes reales para probarlo. A cambio, tu lo usas
            gratis y nosotros aprendemos de ti.
          </p>

          <div className="mt-8 flex justify-center">
            <Link href="#formulario">
              <Button
                size="lg"
                className="animate-pulse-glow h-14 rounded-xl bg-green-500 px-10 text-lg font-semibold text-white hover:bg-green-400"
              >
                Quiero participar
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHAT YOU GET ===== */}
      <section className="bg-slate-950 px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <AnimateOnScroll>
            <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
              Que incluye el programa piloto
            </h2>
          </AnimateOnScroll>

          <div className="mt-12 space-y-4">
            {benefits.map((b) => (
              <AnimateOnScroll key={b}>
                <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-5">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                    <Check className="size-4 text-green-400" />
                  </div>
                  <p className="text-lg text-slate-300">{b}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-slate-900 px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <AnimateOnScroll>
            <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
              Como funciona
            </h2>
            <p className="mt-4 text-center text-slate-400">
              De formulario a recibir pedidos en menos de 48 horas
            </p>
          </AnimateOnScroll>

          <div className="mt-12 space-y-6">
            {steps.map((s) => (
              <AnimateOnScroll key={s.num}>
                <div className="flex items-start gap-5 rounded-xl border border-slate-700 bg-slate-800/50 p-6">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-lg font-bold text-white">
                    {s.num}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-slate-400">{s.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT IS YACOMANDA (brief) ===== */}
      <section className="bg-slate-950 px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <AnimateOnScroll>
            <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
              Que es YaComanda
            </h2>
          </AnimateOnScroll>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: MessageSquare,
                title: "Pedidos por WhatsApp",
                desc: 'Tu cliente escribe "quiero 2 pollos y una ensalada para las 9" y la IA lo entiende.',
              },
              {
                icon: Sparkles,
                title: "IA que habla espanol",
                desc: "Entiende lenguaje natural, audios, abreviaturas. Como un camarero que nunca se equivoca.",
              },
              {
                icon: Star,
                title: "Sin comisiones",
                desc: "A diferencia de Glovo (30%), con YaComanda pagas una cuota fija. Cada pedido es 100% tuyo.",
              },
            ].map((f) => (
              <AnimateOnScroll key={f.title}>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
                  <f.icon className="mx-auto size-8 text-green-400" />
                  <h3 className="mt-4 font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{f.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section id="formulario" className="bg-slate-900 px-4 py-20">
        <div className="mx-auto max-w-lg">
          <AnimateOnScroll>
            <h2 className="text-center text-3xl font-bold text-white">
              Apuntate al piloto
            </h2>
            <p className="mt-3 text-center text-slate-400">
              Solo necesitamos estos datos. Te contactamos en menos de 24 horas.
            </p>
          </AnimateOnScroll>

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/50 p-6 md:p-8">
            <PilotForm />
          </div>

          <p className="mt-4 text-center text-sm text-slate-500">
            Sin compromiso. Sin tarjeta. Puedes dejarlo cuando quieras.
          </p>
        </div>
      </section>
    </div>
  );
}

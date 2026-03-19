import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import {
  Check,
  ArrowRight,
  Building2,
  FileText,
  ClipboardCheck,
  Rocket,
  Bot,
  LayoutDashboard,
  ChefHat,
  BarChart3,
  Headphones,
  CalendarCheck,
  Users,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Kit Digital para Restaurantes | YaComanda Gratis con Subvencion",
  description:
    "Consigue YaComanda gratis con la subvencion Kit Digital del Gobierno de Espana. Hasta 6.000€ para digitalizar tu restaurante. Te ayudamos con todo el tramite.",
};

const segments = [
  {
    name: "Segmento I",
    employees: "10-49 empleados",
    amount: "hasta 6.000€",
    covers: "Cubre todos los planes",
  },
  {
    name: "Segmento II",
    employees: "3-9 empleados",
    amount: "hasta 6.000€",
    covers: "Cubre todos los planes",
  },
  {
    name: "Segmento III",
    employees: "0-2 empleados",
    amount: "hasta 2.000€",
    covers: "Cubre todos los planes",
  },
];

const steps = [
  {
    step: 1,
    icon: FileText,
    color: "bg-blue-500",
    title: "Registrate en acelerapyme.es",
    desc: "Crea tu cuenta en www.acelerapyme.es, la plataforma oficial del programa Kit Digital.",
  },
  {
    step: 2,
    icon: ClipboardCheck,
    color: "bg-amber-500",
    title: "Haz el test de autodiagnostico digital",
    desc: "Completa el test de madurez digital. Son solo unos minutos y es obligatorio para solicitar la ayuda.",
  },
  {
    step: 3,
    icon: Rocket,
    color: "bg-green-500",
    title: "Elige YaComanda como solucion",
    desc: "Selecciona YaComanda dentro de la categoria de Comercio Electronico. Somos agente digitalizador autorizado.",
  },
  {
    step: 4,
    icon: Building2,
    color: "bg-violet-500",
    title: "Nosotros gestionamos el resto",
    desc: "Nos encargamos de toda la documentacion y tramites. Tu solo tienes que firmar. Sin complicaciones.",
  },
];

const included = [
  {
    icon: Bot,
    title: "Bot IA en WhatsApp",
    desc: "Tu asistente virtual recibe pedidos 24/7 por WhatsApp, entiende texto y audio.",
  },
  {
    icon: LayoutDashboard,
    title: "Panel de gestion completo",
    desc: "Gestiona pedidos, carta, clientes y equipo desde cualquier dispositivo.",
  },
  {
    icon: ChefHat,
    title: "Pantalla de cocina (KDS)",
    desc: "Vista kanban en tiempo real para que cocina vea los pedidos al instante.",
  },
  {
    icon: BarChart3,
    title: "Analiticas avanzadas",
    desc: "Productos top, horas punta, clientes recurrentes. Datos para tomar decisiones.",
  },
  {
    icon: Headphones,
    title: "Soporte prioritario",
    desc: "Acompanamiento durante toda la duracion del servicio. Resolvemos tus dudas.",
  },
  {
    icon: CalendarCheck,
    title: "12 meses de servicio incluido",
    desc: "Un ano completo de YaComanda sin coste para ti, cubierto por la subvencion.",
  },
];

const kitDigitalFaqs = [
  {
    question: "Quien puede solicitar Kit Digital?",
    answer:
      "Pueden solicitarlo pymes y autonomos con domicilio fiscal en Espana, con entre 0 y 49 empleados, que esten dados de alta y lleven al menos 6 meses de antigueedad. Tambien deben estar al corriente de obligaciones tributarias y con la Seguridad Social.",
  },
  {
    question: "Cuanto tarda el proceso?",
    answer:
      "El registro en acelerapyme.es y el test de autodiagnostico se hacen en menos de 30 minutos. La resolucion de la ayuda suele tardar entre 3 y 6 meses desde la solicitud, aunque puede variar segun la convocatoria. Mientras tanto, puedes empezar a usar YaComanda con la prueba gratuita.",
  },
  {
    question: "Necesito hacer algo yo o lo gestionais todo?",
    answer:
      "Tu solo necesitas registrarte en acelerapyme.es y completar el test de autodiagnostico. A partir de ahi, nosotros nos encargamos de toda la documentacion, la solicitud y la justificacion ante Red.es. Te guiamos paso a paso.",
  },
  {
    question: "Que pasa despues de los 12 meses?",
    answer:
      "Una vez finalizado el periodo subvencionado de 12 meses, puedes continuar con YaComanda al precio habitual de tu plan (desde 29€/mes). No hay permanencia: si no quieres seguir, cancelas sin ningun coste ni penalizacion.",
  },
];

export default function KitDigitalPage() {
  return (
    <>
      {/* ============================================
          HERO
          ============================================ */}
      <section className="noise-overlay relative overflow-hidden mesh-gradient px-4 pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-32 top-20 size-[500px] rounded-full bg-green-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-20 size-[400px] rounded-full bg-blue-500/15 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-400">
            <Building2 className="size-4" />
            <span>Subvencion del Gobierno de Espana</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            Consigue YaComanda{" "}
            <span className="text-gradient-green">gratis</span> con Kit Digital
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
            Kit Digital es un programa del Gobierno que subvenciona herramientas
            digitales para pymes y autonomos. YaComanda es una solucion elegible
            que puede cubrirse al 100%.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contacto">
              <Button
                size="lg"
                className="animate-pulse-glow h-12 rounded-xl bg-green-500 px-8 text-base font-semibold text-white hover:bg-green-400"
              >
                Solicitar Kit Digital
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
            <Link href="#que-es">
              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-xl border-white/15 bg-white/5 px-8 text-base text-white hover:bg-white/10 hover:text-white"
              >
                Saber mas
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-slate-500">
            Hasta 6.000€ de subvencion &middot; Sin coste para ti &middot; Nosotros gestionamos todo
          </p>
        </div>
      </section>

      {/* ============================================
          QUE ES KIT DIGITAL
          ============================================ */}
      <section id="que-es" className="scroll-mt-20 px-4 py-24">
        <AnimateOnScroll className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="mb-3 inline-block rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-600">
              Programa oficial
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Que es Kit Digital
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Una iniciativa del Gobierno de Espana para impulsar la
              digitalizacion de pymes y autonomos
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h3 className="text-lg font-bold text-slate-900">
                Plan de digitalizacion nacional
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Kit Digital es el programa de ayudas del Gobierno de Espana
                dirigido a la digitalizacion de pequenas empresas, microempresas
                y personas en situacion de autoempleo. Esta financiado con fondos
                europeos Next Generation EU.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h3 className="text-lg font-bold text-slate-900">
                Para pymes y autonomos
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Pueden beneficiarse empresas de entre 0 y 49 empleados con
                domicilio fiscal en Espana. El programa subvenciona herramientas
                digitales como comercio electronico, gestion de clientes, BI y
                analitica, entre otras.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h3 className="text-lg font-bold text-slate-900">
                Categoria: Comercio Electronico
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                YaComanda se encuadra dentro de la categoria de{" "}
                <strong>Comercio Electronico</strong> del programa Kit Digital.
                Nuestra plataforma permite a restaurantes recibir y gestionar
                pedidos online a traves de WhatsApp.
              </p>
            </div>

            <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-8">
              <h3 className="text-lg font-bold text-green-600">
                Hasta 6.000€ de subvencion
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Dependiendo del tamano de tu negocio, puedes recibir entre 2.000€
                y 6.000€ en ayudas. En todos los casos, la subvencion cubre el
                coste completo de YaComanda durante 12 meses.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ============================================
          IMPORTES POR SEGMENTO
          ============================================ */}
      <section className="bg-slate-50 px-4 py-24">
        <AnimateOnScroll className="mx-auto max-w-4xl" delay={100}>
          <div className="text-center">
            <span className="mb-3 inline-block rounded-full bg-green-50 px-4 py-1 text-sm font-semibold text-green-600">
              Importes
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Cuanto puedes{" "}
              <span className="text-gradient-green">recibir</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              La cuantia depende del numero de empleados de tu negocio
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {segments.map((seg) => (
              <div
                key={seg.name}
                className="card-hover rounded-2xl border border-slate-200 bg-white p-8 text-center"
              >
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-green-50">
                  <Users className="size-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{seg.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{seg.employees}</p>
                <p className="mt-4 text-3xl font-extrabold text-green-600">
                  {seg.amount}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  {seg.covers}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 text-center">
            <p className="text-sm text-slate-700">
              Todos los segmentos cubren el coste completo de YaComanda. El
              importe restante del bono puede usarse para otras soluciones
              digitales.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ============================================
          COMO SOLICITARLO
          ============================================ */}
      <section className="px-4 py-24">
        <AnimateOnScroll className="mx-auto max-w-5xl" delay={100}>
          <div className="text-center">
            <span className="mb-3 inline-block rounded-full bg-amber-50 px-4 py-1 text-sm font-semibold text-amber-600">
              Proceso
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Como solicitarlo
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              En 4 sencillos pasos y nosotros nos encargamos del papeleo
            </p>
          </div>

          <div className="relative mt-16 grid gap-8 md:grid-cols-4 md:gap-0">
            {/* Connector line */}
            <div className="pointer-events-none absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-blue-500/0 via-green-500/40 to-violet-500/0 md:block" />

            {steps.map((item) => (
              <div key={item.step} className="relative text-center md:px-4">
                <div
                  className={`relative z-10 mx-auto flex size-16 items-center justify-center rounded-2xl ${item.color} text-white shadow-lg`}
                >
                  <item.icon className="size-7" />
                </div>
                <h3 className="mt-5 text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contacto">
              <Button className="rounded-xl bg-green-500 px-8 text-white hover:bg-green-400">
                Empezar solicitud <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ============================================
          QUE INCLUYE
          ============================================ */}
      <section className="noise-overlay relative overflow-hidden bg-slate-950 px-4 py-24">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute left-1/3 top-0 size-[500px] rounded-full bg-green-500/10 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 size-[400px] rounded-full bg-blue-500/10 blur-[120px]" />

        <AnimateOnScroll className="relative mx-auto max-w-6xl" delay={100}>
          <div className="text-center">
            <span className="mb-3 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1 text-sm font-semibold text-green-400">
              Todo incluido
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Que incluye Kit Digital +{" "}
              <span className="text-gradient-green">YaComanda</span>
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              12 meses de servicio completo, setup guiado y soporte incluido
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((feature) => (
              <div key={feature.title} className="bento-card p-8">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-green-500/10">
                  <feature.icon className="size-6 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-green-500/20 bg-green-500/5 p-6 text-center">
            <p className="text-sm text-slate-300">
              Ademas incluimos la <strong className="text-white">configuracion inicial guiada</strong>:
              subimos tu carta, configuramos el bot con el tono de tu negocio y
              te ensenamos a usar el panel. Todo listo para que solo tengas que
              cocinar.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ============================================
          FAQ KIT DIGITAL
          ============================================ */}
      <section className="px-4 py-24">
        <AnimateOnScroll className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Preguntas frecuentes sobre Kit Digital
            </h2>
          </div>
          <div className="mt-10">
            <Accordion type="single" collapsible className="w-full">
              {kitDigitalFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ============================================
          CTA
          ============================================ */}
      <section className="noise-overlay relative overflow-hidden bg-slate-950 px-4 py-24">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/15 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Te ayudamos con{" "}
            <span className="text-gradient-green">todo el papeleo</span>
          </h2>
          <p className="mt-6 text-lg text-slate-400">
            Contacta con nosotros y nos encargamos de gestionar tu solicitud de
            Kit Digital de principio a fin. Sin complicaciones.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contacto">
              <Button
                size="lg"
                className="animate-pulse-glow h-12 rounded-xl bg-green-500 px-10 text-base font-semibold text-white hover:bg-green-400"
              >
                Contacta con nosotros
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Sin compromiso &middot; Gestion gratuita &middot; Respuesta en 24h
          </p>
        </div>
      </section>
    </>
  );
}

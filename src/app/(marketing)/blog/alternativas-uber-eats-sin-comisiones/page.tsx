import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, X, Minus } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "5 alternativas a Uber Eats sin comisiones para restaurantes en 2026 — YaComanda",
  description:
    "Comparativa de las mejores alternativas a Uber Eats para restaurantes. Precios reales, pros y contras de cada opcion para dejar de pagar el 30% en comisiones.",
  keywords: [
    "alternativas uber eats",
    "uber eats comisiones restaurantes",
    "alternativa uber eats sin comisiones",
    "delivery sin comisiones",
    "uber eats vs pedido directo",
    "dejar uber eats restaurante",
  ],
  openGraph: {
    title: "5 alternativas a Uber Eats sin comisiones para restaurantes (2026)",
    description:
      "Comparativa honesta: precios reales, pros y contras de cada alternativa a Uber Eats.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="5 alternativas a Uber Eats sin comisiones para restaurantes en 2026"
      description="Comparativa de las mejores alternativas a Uber Eats para restaurantes."
      slug="alternativas-uber-eats-sin-comisiones"
      datePublished="2026-03-31"
    />
    <article className="px-4 pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-green-600"
        >
          <ArrowLeft className="size-4" />
          Volver al blog
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-0.5 text-xs font-semibold text-blue-600">
            Comparativa
          </span>
          <span className="text-slate-400">31 marzo 2026</span>
          <span className="text-slate-400">8 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          5 alternativas a Uber Eats sin comisiones para restaurantes en 2026
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Uber Eats cobra entre el 15% y el 30% por cada pedido, mas tarifas
          de activacion y marketing opcionales que pueden subir la factura
          aun mas. Si tienes un restaurante y una parte importante de tus
          pedidos vienen de clientes que ya te conocen, estas regalando
          margen por ventas que podrian ser directas.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <p>
            <strong>Aclaracion importante:</strong> estas alternativas son
            para recibir pedidos directos de tus clientes actuales. Si
            dependes de Uber Eats para descubrimiento (clientes nuevos que
            buscan &quot;comida cerca&quot;), estas herramientas no
            reemplazan eso — son para el cliente que ya te conoce y pide
            por comodidad.
          </p>

          <h2>El problema con Uber Eats</h2>
          <p>
            Por cada pedido de 20€, Uber Eats se queda con 4€ a 6€. Con
            20 pedidos al dia, eso son 2.400€ a 3.600€ al mes. En Espana,
            la comision base es del 30% para la mayoria de restaurantes
            independientes. En Latinoamerica los numeros son similares.
          </p>
          <p>
            El peor escenario: tus clientes habituales — los que saben tu
            nombre y tu direccion — piden por Uber Eats porque les resulta
            comodo. Estas pagando comision por ventas que ya eran tuyas.
          </p>

          <h2>1. Tu propia pagina web de pedidos</h2>
          <p>
            Una pagina donde tus clientes ven la carta y hacen el pedido
            directamente.
          </p>
          <ul>
            <li><strong>Ejemplos:</strong> GloriaFood (gratis con limitaciones), ChowNow, Starter de plataformas locales</li>
            <li><strong>Coste:</strong> desde 0€ hasta 50€/mes segun funcionalidades</li>
            <li><strong>Pros:</strong> control total de tu marca, sin comision por pedido en algunos planes</li>
            <li><strong>Contras:</strong> tus clientes tienen que encontrar y recordar la URL. La friccion reduce conversiones. Necesitas hacer tu propio marketing.</li>
          </ul>
          <p><strong>Ideal para:</strong> restaurantes con marca fuerte y web propia.</p>

          <h2>2. App propia (marca blanca)</h2>
          <p>
            Una app movil con tu logo que tus clientes descargan.
          </p>
          <ul>
            <li><strong>Ejemplos:</strong> Flipdish, Ordering.co, OwnerApp</li>
            <li><strong>Coste:</strong> 100-300€/mes + posible comision reducida (3-5%)</li>
            <li><strong>Pros:</strong> presencia profesional, notificaciones push, programa de fidelidad</li>
            <li><strong>Contras:</strong> convencer al cliente de descargar OTRA app es muy dificil. El 80% de las apps no se usan tras la primera semana. Coste alto.</li>
          </ul>
          <p><strong>Ideal para:</strong> cadenas con alto volumen y marca reconocida.</p>

          <h2>3. Pedidos por WhatsApp (manual)</h2>
          <p>
            Gratis. Usas WhatsApp Business y gestionas los pedidos tu mismo.
          </p>
          <ul>
            <li><strong>Coste:</strong> 0€</li>
            <li><strong>Pros:</strong> el cliente ya tiene WhatsApp, cero friccion, trato personal</li>
            <li><strong>Contras:</strong> no escala. A partir de 10-15 pedidos/dia se pierde el control. Errores en pedidos, cobros manuales, mensajes perdidos en hora pico.</li>
          </ul>
          <p><strong>Ideal para:</strong> restaurantes con poco volumen y alguien dedicado a responder.</p>

          <h2>4. Marketplace de cuota fija</h2>
          <p>
            Algunas plataformas ofrecen planes de cuota fija mensual en vez
            de comision por pedido. Just Eat tiene planes asi en algunos
            mercados.
          </p>
          <ul>
            <li><strong>Coste:</strong> 100-500€/mes (cuota fija)</li>
            <li><strong>Pros:</strong> coste predecible, acceso a su base de usuarios</li>
            <li><strong>Contras:</strong> la cuota fija puede ser alta para restaurantes pequenos. Sigues dependiendo de la plataforma y sus reglas.</li>
          </ul>
          <p><strong>Ideal para:</strong> restaurantes con volumen medio-alto que quieren predecibilidad.</p>

          <h2>5. Bot de WhatsApp con IA</h2>
          <p>
            La opcion mas nueva: un bot inteligente que entiende los
            mensajes de WhatsApp, identifica el pedido, confirma, cobra
            y lo envia a cocina. Todo automatico, 24/7.
          </p>
          <ul>
            <li>
              <strong>Ejemplos:</strong>{" "}
              <Link href="/" className="text-green-600 font-semibold">
                YaComanda
              </Link>
              , OlaClick, Whato.app
            </li>
            <li><strong>Coste:</strong> desde 29€/mes (tarifa plana, sin comision por pedido)</li>
            <li><strong>Pros:</strong> cero friccion (WhatsApp), automatizacion total, cobro integrado, datos propios, pantalla de cocina</li>
            <li><strong>Contras:</strong> requiere WhatsApp Business API (YaComanda te ayuda con la configuracion), coste mensual</li>
          </ul>
          <p><strong>Ideal para:</strong> restaurantes con 10+ pedidos/dia que quieren automatizar sin perder el canal de WhatsApp.</p>

          <h2>Comparativa rapida</h2>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-3 py-3 text-left font-semibold">Alternativa</th>
                  <th className="px-3 py-3 text-center font-semibold">Coste</th>
                  <th className="px-3 py-3 text-center font-semibold">Automatico</th>
                  <th className="px-3 py-3 text-center font-semibold">Friccion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-3 font-medium">Web propia</td>
                  <td className="px-3 py-3 text-center">0-50€/mes</td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-500" /></td>
                  <td className="px-3 py-3 text-center text-amber-500 font-medium">Media</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">App marca blanca</td>
                  <td className="px-3 py-3 text-center">100-300€/mes</td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-500" /></td>
                  <td className="px-3 py-3 text-center text-red-500 font-medium">Alta</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">WhatsApp manual</td>
                  <td className="px-3 py-3 text-center">0€</td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                  <td className="px-3 py-3 text-center text-green-500 font-medium">Baja</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Cuota fija</td>
                  <td className="px-3 py-3 text-center">100-500€/mes</td>
                  <td className="px-3 py-3 text-center"><Minus className="mx-auto size-4 text-slate-400" /></td>
                  <td className="px-3 py-3 text-center text-amber-500 font-medium">Media</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-3 py-3 font-bold text-green-700">Bot WhatsApp IA</td>
                  <td className="px-3 py-3 text-center font-semibold text-green-700">29€/mes</td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-600" /></td>
                  <td className="px-3 py-3 text-center text-green-600 font-bold">Baja</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>¿Cual elegir?</h2>
          <p>Depende de tu situacion:</p>
          <ul>
            <li><strong>Poco volumen y alguien disponible:</strong> WhatsApp manual funciona.</li>
            <li><strong>Marca fuerte y presupuesto:</strong> una web de pedidos puede complementar.</li>
            <li><strong>Ya recibes muchos pedidos por WhatsApp:</strong> un bot con IA te ahorra horas al dia y elimina errores.</li>
          </ul>
          <p>
            La realidad: tus clientes ya tienen WhatsApp. No van a descargar
            tu app ni buscar tu web. Darles una forma automatica de pedir
            por el canal que ya usan es el camino de menor resistencia.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Deja de regalar el 30% a Uber Eats
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            30 dias gratis. Sin tarjeta. Configura tu carta en 15 minutos.
          </p>
          <Link href="/sign-up" className="mt-6 inline-block">
            <Button className="h-11 rounded-xl bg-green-500 px-8 font-semibold text-white hover:bg-green-400">
              Empieza gratis
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <Link
            href="/blog"
            className="text-sm font-semibold text-green-600 hover:text-green-500"
          >
            ← Todos los articulos
          </Link>
        </div>
      </div>
    </article>
    </>
  );
}

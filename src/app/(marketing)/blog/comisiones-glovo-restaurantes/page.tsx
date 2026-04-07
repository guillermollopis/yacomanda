import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Comisiones de Glovo, Uber Eats y Just Eat: cuanto paga tu restaurante — YaComanda",
  description:
    "Desglosamos las comisiones reales de Glovo (hasta 35%), Uber Eats y Just Eat en 2026. Descubre cuanto pierdes y las alternativas sin comisiones.",
  openGraph: {
    title: "Comisiones de Glovo, Uber Eats y Just Eat para restaurantes",
    description:
      "Las comisiones reales que cobran las plataformas de delivery en Espana y como dejar de perder margen.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Comisiones de Glovo, Uber Eats y Just Eat: cuanto paga tu restaurante"
      description="Desglosamos las comisiones reales de Glovo (hasta 35%), Uber Eats y Just Eat en 2026."
      slug="comisiones-glovo-restaurantes"
      datePublished="2026-03-09"
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
          <span className="rounded-full border border-red-200 bg-red-50 px-3 py-0.5 text-xs font-semibold text-red-600">
            Costes
          </span>
          <span className="text-slate-400">9 marzo 2026</span>
          <span className="text-slate-400">6 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Comisiones de Glovo, Uber Eats y Just Eat: cuanto paga realmente tu
          restaurante
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Si tienes un restaurante en Espana y trabajas con plataformas de
          delivery, probablemente ya sabes que las comisiones son altas. Pero
          ¿sabes exactamente cuanto te cuestan?
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>Las comisiones reales en 2026</h2>
          <p>
            Las tres grandes plataformas de delivery en Espana cobran comisiones
            por cada pedido que gestionan. Estas son las cifras reales:
          </p>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">
                    Plataforma
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">
                    Comision
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">
                    Otros costes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    Glovo
                  </td>
                  <td className="px-4 py-3 text-red-600 font-semibold">
                    25-35%
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    Alta + cuota mensual posible
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    Uber Eats
                  </td>
                  <td className="px-4 py-3 text-red-600 font-semibold">
                    15-30%
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    Activacion + publicidad sugerida
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    Just Eat
                  </td>
                  <td className="px-4 py-3 text-red-600 font-semibold">
                    14-30%
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    Depende del plan
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Estas comisiones se aplican sobre el precio total del pedido,
            incluyendo IVA. Eso significa que en un pedido de 25€, Glovo se
            puede quedar con hasta 8,75€.
          </p>

          <h2>Cuanto dinero pierdes al mes</h2>
          <p>
            Hagamos cuentas con un ejemplo realista. Un restaurante medio en
            Espana que hace 200 pedidos al mes por plataforma, con un ticket
            medio de 22€:
          </p>

          <div className="not-prose my-8 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
            <div className="space-y-2 text-sm">
              <p className="text-slate-700">
                200 pedidos &times; 22€ ={" "}
                <strong>4.400€ en ventas</strong>
              </p>
              <p className="text-slate-700">
                Comision Glovo al 30% ={" "}
                <strong className="text-red-600">1.320€/mes perdidos</strong>
              </p>
              <p className="text-slate-700">
                Al ano ={" "}
                <strong className="text-red-600">15.840€</strong>
              </p>
            </div>
            <p className="mt-4 text-sm font-bold text-slate-800">
              Eso es el sueldo de un empleado a media jornada. Solo en comisiones.
            </p>
          </div>

          <h2>Y no solo son las comisiones</h2>
          <p>El coste real de usar plataformas de delivery va mas alla del porcentaje:</p>
          <ul>
            <li>
              <strong>El cliente no es tuyo.</strong> Es de Glovo. Si Glovo sube
              comisiones, no tienes negociacion. Si Glovo cierra, pierdes el
              canal.
            </li>
            <li>
              <strong>No tienes datos.</strong> No sabes el telefono, email ni
              historial de tus clientes. No puedes hacer marketing directo.
            </li>
            <li>
              <strong>Competencia desleal.</strong> Tu restaurante aparece al
              lado de cadenas que pagan por visibilidad. Tu pizza de 12€ compite
              con la de Telepizza a 5,99€.
            </li>
            <li>
              <strong>Pagos retenidos.</strong> Algunas plataformas retienen el
              pago hasta 2 semanas. Tu ya has pagado los ingredientes, el
              personal y la luz.
            </li>
          </ul>

          <h2>Las alternativas: pedidos directos</h2>
          <p>
            La buena noticia: la mayoria de tus clientes ya tienen WhatsApp. De
            hecho, muchos restaurantes ya reciben pedidos por WhatsApp, pero los
            gestionan a mano.
          </p>
          <p>
            La nueva generacion de herramientas permite automatizar este
            proceso:
          </p>
          <ul>
            <li>El cliente escribe por WhatsApp como siempre</li>
            <li>Un bot con IA entiende el pedido (texto, audio, fotos)</li>
            <li>Confirma, cobra y envia a cocina automaticamente</li>
            <li>Tu solo preparas</li>
          </ul>
          <p>
            Sin descargar apps. Sin QRs. Sin comisiones por pedido. El cliente
            ya tiene WhatsApp — solo necesitas conectarlo.
          </p>

          <h2>Cuanto cuesta la alternativa</h2>
          <p>
            Herramientas como{" "}
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            funcionan con tarifa plana desde 29€/mes, sin comisiones por pedido.
            Comparado con los 1.320€/mes del ejemplo anterior, el ahorro es
            evidente.
          </p>
          <p>
            Ademas, con{" "}
            <strong>Kit Digital</strong> muchos restaurantes pueden acceder a
            estas herramientas con subvencion del 100%.
          </p>

          <h2>Conclusion</h2>
          <p>
            Las plataformas de delivery tienen su sitio: aportan visibilidad y
            volumen. Pero no deberian ser tu unico canal. Cada pedido directo
            que recibes es un pedido sin comision, con un cliente que es tuyo.
          </p>
          <p>
            Si ya recibes pedidos por WhatsApp, automatizarlo es el primer paso
            para recuperar tu margen.
          </p>
        </div>

        {/* Calculator CTA */}
        <div className="mt-12 rounded-2xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            ¿Cuanto pierdes tu en comisiones?
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Usa nuestra calculadora gratuita para ver cuanto dinero regalas al ano a las plataformas de delivery.
          </p>
          <Link href="/calculadora-comisiones" className="mt-4 inline-block">
            <Button className="h-11 rounded-xl bg-red-600 px-8 font-semibold text-white hover:bg-red-500">
              Calcular mi ahorro
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>

        {/* CTA */}
        <div className="mt-6 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Deja de perder el 30% en comisiones
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Prueba YaComanda gratis 30 dias. Sin tarjeta. Sin permanencia.
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

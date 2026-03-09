import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Como recibir pedidos por WhatsApp en tu restaurante: guia completa 2026 — YaComanda",
  description:
    "Guia paso a paso para automatizar pedidos por WhatsApp en tu restaurante. Desde la opcion manual hasta bots con IA que cobran automaticamente.",
  openGraph: {
    title:
      "Como recibir pedidos por WhatsApp en tu restaurante (guia 2026)",
    description:
      "Todo lo que necesitas saber para recibir y gestionar pedidos por WhatsApp de forma automatica.",
  },
};

export default function Post() {
  return (
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
          <span className="rounded-full border border-green-200 bg-green-50 px-3 py-0.5 text-xs font-semibold text-green-600">
            Guia
          </span>
          <span className="text-slate-400">9 marzo 2026</span>
          <span className="text-slate-400">7 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Como recibir pedidos por WhatsApp en tu restaurante: guia completa
          2026
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          El 95% de los espanoles usa WhatsApp. Tus clientes ya lo tienen. La
          pregunta no es si deberian poder pedirte por WhatsApp — es como
          hacerlo sin volverte loco.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>Por que WhatsApp para pedidos</h2>
          <p>
            Piensa en como piden tus clientes hoy. Muchos ya te escriben por
            WhatsApp: &ldquo;Oye, preparame dos bocadillos para las 14h&rdquo;.
            Es natural, rapido y no requiere descargar nada.
          </p>
          <p>El problema es la gestion. Leer mensajes, confirmar, calcular
            totales, cobrar, avisar a cocina... todo manual. Con 5 pedidos al
            dia es viable. Con 20, es un caos.
          </p>
          <p>Veamos las opciones para sistematizarlo, de menor a mayor automatizacion.</p>

          <h2>Opcion 1: WhatsApp Business (manual)</h2>
          <p>
            La opcion mas basica. Usas WhatsApp Business (gratis) y configuras:
          </p>
          <ul>
            <li>
              <strong>Respuestas rapidas:</strong> plantillas para preguntas
              frecuentes (&ldquo;Aqui tienes nuestra carta&rdquo;, &ldquo;Hacemos entregas de 13 a 16h&rdquo;).
            </li>
            <li>
              <strong>Catalogo:</strong> WhatsApp Business permite crear un
              catalogo con fotos y precios.
            </li>
            <li>
              <strong>Etiquetas:</strong> para organizar conversaciones (nuevo
              pedido, preparando, entregado).
            </li>
          </ul>
          <p>
            <strong>Ventajas:</strong> gratis, simple.
            <br />
            <strong>Limitaciones:</strong> todo sigue siendo manual. No cobra
            automaticamente. No envia a cocina. No escala mas alla de 10-15
            pedidos/dia sin perder pedidos o cometer errores.
          </p>

          <h2>Opcion 2: WhatsApp + formulario externo</h2>
          <p>
            Un paso mas. Creas un formulario (Google Forms, Typeform, tu propia
            web) con los platos y opciones. Compartes el enlace por WhatsApp.
          </p>
          <ul>
            <li>El cliente abre el enlace, rellena el formulario</li>
            <li>Tu recibes un email o notificacion con el pedido</li>
            <li>Confirmas por WhatsApp</li>
          </ul>
          <p>
            <strong>Ventajas:</strong> mas estructurado, menos errores.
            <br />
            <strong>Limitaciones:</strong> el cliente sale de WhatsApp (friccion).
            Muchos no completan el formulario. Sigue sin cobrar automaticamente.
          </p>

          <h2>Opcion 3: chatbot basico</h2>
          <p>
            Herramientas como Tidio o ManyChat permiten crear flujos
            automatizados en WhatsApp. El bot guia al cliente con botones:
            &ldquo;¿Que quieres pedir?&rdquo; → [Pizzas] [Hamburguesas] [Bebidas].
          </p>
          <ul>
            <li>El cliente navega por menus con botones</li>
            <li>El bot calcula el total</li>
            <li>Tu recibes el pedido estructurado</li>
          </ul>
          <p>
            <strong>Ventajas:</strong> automatiza la toma de pedido.
            <br />
            <strong>Limitaciones:</strong> experiencia rigida (el cliente no puede
            escribir &ldquo;ponme lo de siempre&rdquo;). Configuracion compleja.
            Costes desde 50-100€/mes. Muchos no estan pensados para
            restaurantes.
          </p>

          <h2>Opcion 4: bot con IA (la nueva generacion)</h2>
          <p>
            Aqui es donde la cosa cambia. Los bots con inteligencia artificial
            entienden lenguaje natural. El cliente escribe como le da la gana:
          </p>

          <div className="not-prose my-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="space-y-3 text-sm">
              <div className="w-fit rounded-2xl rounded-tl-md bg-white px-4 py-2.5 shadow-sm">
                &ldquo;Ponme 2 margaritas grandes, una ensalada cesar sin crutones
                y 3 coca colas&rdquo;
              </div>
              <div className="ml-auto w-fit rounded-2xl rounded-br-md bg-green-500 px-4 py-2.5 text-white">
                Perfecto! Tu pedido: 2x Pizza Margarita Grande (11,50€), 1x
                Ensalada Cesar sin crutones (8,90€), 3x Coca Cola (2,50€).
                Total: 39,40€. ¿Confirmas?
              </div>
            </div>
          </div>

          <p>La IA:</p>
          <ul>
            <li>Entiende texto libre, audios de voz e incluso fotos</li>
            <li>Hace matching con tu carta real (sabe que &ldquo;margarita&rdquo; es tu &ldquo;Pizza Margarita&rdquo;)</li>
            <li>Calcula el total con variantes y extras</li>
            <li>Envia link de pago automaticamente</li>
            <li>Notifica a cocina con el pedido confirmado</li>
          </ul>
          <p>
            <strong>Ventajas:</strong> experiencia natural para el cliente, todo
            automatico, escala a cientos de pedidos.
            <br />
            <strong>Limitaciones:</strong> requiere un servicio de pago (desde
            29€/mes).
          </p>

          <h2>Como elegir la opcion correcta</h2>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold">
                    Pedidos/dia
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Opcion recomendada
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 text-slate-900">1-5</td>
                  <td className="px-4 py-3 text-slate-500">
                    WhatsApp Business manual
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">5-15</td>
                  <td className="px-4 py-3 text-slate-500">
                    Formulario o chatbot basico
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">15+</td>
                  <td className="px-4 py-3 text-slate-500">
                    Bot con IA (automatizacion completa)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Si tu restaurante ya recibe mas de 15 pedidos por WhatsApp al dia y
            los gestionas a mano, estas perdiendo tiempo y dinero. Un bot con IA
            se paga solo con los errores que evita.
          </p>

          <h2>Como empezar con un bot de IA</h2>
          <p>
            Con herramientas como{" "}
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>
            , el proceso es:
          </p>
          <ol>
            <li>
              <strong>Crea tu cuenta</strong> (5 minutos, sin tarjeta).
            </li>
            <li>
              <strong>Sube tu carta</strong> — puedes hacerlo con una foto del
              menu y la IA extrae los platos automaticamente.
            </li>
            <li>
              <strong>Conecta tu WhatsApp Business</strong> — se enlaza con la
              API oficial de Meta.
            </li>
            <li>
              <strong>Activa el bot</strong> — tu WhatsApp empieza a recibir
              pedidos automaticamente.
            </li>
          </ol>
          <p>
            Desde ese momento, cada mensaje que llega se procesa solo. Tu
            recibes el pedido confirmado y pagado en tu pantalla de cocina.
          </p>

          <h2>Y con Kit Digital, puede ser gratis</h2>
          <p>
            Si tu restaurante es una pyme o trabajas como autonomo, puedes
            acceder a la subvencion Kit Digital del gobierno. YaComanda es
            elegible, lo que significa que el coste puede estar cubierto al
            100%.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Automatiza tus pedidos por WhatsApp
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Prueba YaComanda gratis 30 dias. Sube tu carta y activa el bot en
            15 minutos.
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
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Bot de WhatsApp para restaurantes: que es y como funciona — YaComanda",
  description:
    "Descubre como funciona un bot de WhatsApp para restaurantes, sus ventajas frente a pedidos manuales y que buscar en un chatbot con IA para hosteleria.",
  keywords: [
    "bot whatsapp restaurante",
    "chatbot restaurante whatsapp",
    "automatizar pedidos whatsapp restaurante",
    "bot ia restaurante",
    "whatsapp pedidos automaticos",
  ],
  openGraph: {
    title: "Bot de WhatsApp para restaurantes: que es y como funciona",
    description:
      "Todo sobre bots de WhatsApp para restaurantes: tipos, ventajas y como elegir el mejor para tu negocio.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Bot de WhatsApp para restaurantes: que es y como funciona"
      description="Descubre como funciona un bot de WhatsApp para restaurantes, sus ventajas y que buscar en un chatbot con IA."
      slug="bot-whatsapp-restaurante"
      datePublished="2026-03-16"
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
          <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-0.5 text-xs font-semibold text-violet-600">
            Tecnologia
          </span>
          <span className="text-slate-400">16 marzo 2026</span>
          <span className="text-slate-400">7 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Bot de WhatsApp para restaurantes: que es y como funciona
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Cada vez mas restaurantes en Espana reciben pedidos por WhatsApp. El
          problema es que gestionarlos a mano es lento, propenso a errores y no
          escala. Un bot de WhatsApp resuelve exactamente eso.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>Que es un bot de WhatsApp para restaurantes</h2>
          <p>
            Un bot de WhatsApp es un programa que responde automaticamente a los
            mensajes que llegan a tu numero de WhatsApp Business. En el caso de
            un restaurante, el bot se encarga de recibir pedidos, resolver
            dudas sobre la carta y gestionar el proceso completo hasta el cobro.
          </p>
          <p>
            Para el cliente, la experiencia es la misma que escribirle a una
            persona: abre WhatsApp, escribe lo que quiere pedir y recibe una
            respuesta inmediata. La diferencia es que detras hay un sistema
            automatizado que nunca se distrae, no comete errores y funciona las
            24 horas.
          </p>

          <h2>Como funciona el proceso completo</h2>
          <p>
            El flujo tipico de un pedido con bot de WhatsApp es asi:
          </p>
          <ol>
            <li>
              <strong>El cliente escribe</strong> — puede ser un mensaje de
              texto libre (&ldquo;Quiero dos pizzas margarita y una ensalada&rdquo;),
              un audio de voz o incluso una foto.
            </li>
            <li>
              <strong>El bot entiende el pedido</strong> — identifica los
              platos de tu carta, las cantidades, las variantes (tamano,
              ingredientes extra) y calcula el precio total.
            </li>
            <li>
              <strong>Confirma con el cliente</strong> — envia un resumen del
              pedido con el desglose de precios y pide confirmacion.
            </li>
            <li>
              <strong>Cobra automaticamente</strong> — envia un enlace de pago
              (tarjeta, Bizum) y el cliente paga sin salir de WhatsApp.
            </li>
            <li>
              <strong>Avisa a cocina</strong> — el pedido confirmado aparece
              en la pantalla de cocina (KDS) listo para preparar.
            </li>
            <li>
              <strong>Notifica al cliente</strong> — cuando el pedido esta
              listo, el bot envia un mensaje automatico al cliente.
            </li>
          </ol>

          <div className="not-prose my-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="space-y-3 text-sm">
              <div className="w-fit rounded-2xl rounded-tl-md bg-white px-4 py-2.5 shadow-sm">
                &ldquo;Hola, quiero una hamburguesa doble con extra de queso y
                patatas fritas. Para recoger en 30 min&rdquo;
              </div>
              <div className="ml-auto w-fit rounded-2xl rounded-br-md bg-green-500 px-4 py-2.5 text-white">
                Perfecto! Tu pedido: 1x Hamburguesa Doble + extra queso
                (10,90€), 1x Patatas Fritas (3,50€). Total: 14,40€. Recogida
                en 30 min. ¿Confirmas?
              </div>
            </div>
          </div>

          <h2>Ventajas de usar un bot de WhatsApp</h2>
          <p>
            Comparado con recibir pedidos por telefono, apps de delivery o
            WhatsApp manual, un bot tiene ventajas claras:
          </p>
          <ul>
            <li>
              <strong>Disponibilidad 24/7:</strong> el bot responde a las 3 de
              la manana igual que a las 3 de la tarde. Los clientes pueden
              hacer pedidos fuera de horario para el dia siguiente.
            </li>
            <li>
              <strong>Cero errores de transcripcion:</strong> no hay riesgo de
              apuntar mal un pedido o confundir una mesa. El bot lee
              exactamente lo que pide el cliente y lo cruza con tu carta.
            </li>
            <li>
              <strong>Respuesta instantanea:</strong> el cliente no espera a que
              alguien coja el telefono o lea su mensaje. Recibe respuesta en
              segundos.
            </li>
            <li>
              <strong>Sin comisiones de plataforma:</strong> a diferencia de
              Glovo o Uber Eats, no pagas un 30% por cada pedido. Solo la
              suscripcion mensual del bot.
            </li>
            <li>
              <strong>Datos propios:</strong> cada pedido te deja el telefono y
              el historial del cliente. Puedes hacer marketing directo,
              promociones personalizadas y fidelizar.
            </li>
            <li>
              <strong>Menos interrupciones en sala:</strong> el personal no
              tiene que dejar de atender mesas para coger llamadas de pedidos
              a domicilio.
            </li>
          </ul>

          <h2>Tipos de bot: basado en reglas vs IA</h2>
          <p>
            No todos los bots funcionan igual. Hay dos grandes tipos y la
            diferencia es importante:
          </p>

          <h3>Bot basado en reglas</h3>
          <p>
            Funciona con menus de botones. El cliente pulsa opciones
            predefinidas: [Pizzas] → [Margarita] → [Grande] → [Confirmar]. Es
            lineal y predecible.
          </p>
          <p>
            <strong>Problema:</strong> si el cliente escribe &ldquo;ponme lo de
            siempre&rdquo; o &ldquo;una margarita sin aceitunas y anade una
            coca cola&rdquo;, el bot no entiende. Solo funciona si el cliente
            sigue el flujo exacto de botones.
          </p>

          <h3>Bot con inteligencia artificial</h3>
          <p>
            Usa modelos de lenguaje (como los que hay detras de ChatGPT) para
            entender texto libre en cualquier idioma. El cliente escribe como
            quiera y el bot interpreta el pedido.
          </p>
          <p>
            <strong>Ventaja:</strong> experiencia natural. El cliente pide como
            si hablara con un camarero. Entiende variantes, modificaciones,
            comentarios y hasta audios de voz. Mucho mas facil de usar para
            clientes de todas las edades.
          </p>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold">
                    Caracteristica
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Bot con reglas
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Bot con IA
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 text-slate-900">Texto libre</td>
                  <td className="px-4 py-3 text-slate-500">No</td>
                  <td className="px-4 py-3 text-slate-500">Si</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Audios de voz</td>
                  <td className="px-4 py-3 text-slate-500">No</td>
                  <td className="px-4 py-3 text-slate-500">Si</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Multiples idiomas</td>
                  <td className="px-4 py-3 text-slate-500">Limitado</td>
                  <td className="px-4 py-3 text-slate-500">Si</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Modificaciones</td>
                  <td className="px-4 py-3 text-slate-500">Solo predefinidas</td>
                  <td className="px-4 py-3 text-slate-500">Cualquiera</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Configuracion</td>
                  <td className="px-4 py-3 text-slate-500">Compleja</td>
                  <td className="px-4 py-3 text-slate-500">Subir carta</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Que buscar en un bot de WhatsApp para restaurantes</h2>
          <p>
            Si estas evaluando opciones, estos son los criterios que importan:
          </p>
          <ul>
            <li>
              <strong>Calidad de la IA:</strong> ¿entiende texto libre, audios y
              fotos? ¿Sabe hacer matching con tu carta real?
            </li>
            <li>
              <strong>Integracion de pagos:</strong> ¿puede cobrar
              automaticamente con tarjeta y Bizum?
            </li>
            <li>
              <strong>Pantalla de cocina (KDS):</strong> ¿incluye un panel donde
              cocina ve los pedidos en tiempo real?
            </li>
            <li>
              <strong>Analiticas:</strong> ¿te muestra datos de ventas, platos
              mas pedidos y horas punta?
            </li>
            <li>
              <strong>API oficial de WhatsApp:</strong> ¿usa la API oficial de
              Meta o un sistema no autorizado que puede bloquear tu numero?
            </li>
            <li>
              <strong>Soporte en espanol:</strong> ¿puedes resolver dudas en tu
              idioma?
            </li>
          </ul>

          <h2>Como funciona YaComanda</h2>
          <p>
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            es un bot de WhatsApp con IA disenado especificamente para
            restaurantes en Espana. Asi funciona:
          </p>
          <ul>
            <li>
              <strong>IA que entiende lenguaje natural</strong> — el cliente
              escribe, envia audios o fotos. La IA entiende el pedido y lo
              cruza con tu carta.
            </li>
            <li>
              <strong>Cobro automatico</strong> — envia enlace de pago con
              tarjeta y Bizum. El dinero llega directamente a tu cuenta.
            </li>
            <li>
              <strong>Pantalla de cocina (KDS)</strong> — los pedidos confirmados
              aparecen en un panel tipo kanban para cocina. Compatible con
              tablet y movil.
            </li>
            <li>
              <strong>Panel de gestion</strong> — analiticas, catalogo,
              clientes, historial de pedidos y configuracion del bot desde un
              dashboard web.
            </li>
            <li>
              <strong>Notificaciones al propietario</strong> — recibe alertas
              en tu propio WhatsApp cuando entra un pedido, con botones para
              aceptar o rechazar directamente.
            </li>
            <li>
              <strong>API oficial de Meta</strong> — sin riesgo de bloqueo.
              Compatible con WhatsApp Business existente.
            </li>
          </ul>
          <p>
            Ademas, YaComanda es elegible para el{" "}
            <Link
              href="/blog/kit-digital-restaurante-subvencion"
              className="text-green-600 font-semibold"
            >
              Kit Digital
            </Link>
            , por lo que puedes cubrir el coste con la subvencion del gobierno.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Prueba YaComanda gratis 30 dias
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Sube tu carta, activa el bot y empieza a recibir pedidos por
            WhatsApp en 15 minutos. Sin permanencia.
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

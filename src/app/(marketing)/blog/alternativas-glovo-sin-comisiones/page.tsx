import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, X, Minus } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "5 alternativas a Glovo sin comisiones para restaurantes en 2026 — YaComanda",
  description:
    "Comparativa honesta de las mejores alternativas a Glovo para restaurantes. Precios, pros, contras y cual te conviene segun tu volumen de pedidos.",
  openGraph: {
    title: "5 alternativas a Glovo sin comisiones para restaurantes (2026)",
    description:
      "Comparativa honesta: precios reales, pros y contras de cada alternativa a las plataformas de delivery.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="5 alternativas a Glovo sin comisiones para restaurantes en 2026"
      description="Comparativa honesta de las mejores alternativas a Glovo para restaurantes."
      slug="alternativas-glovo-sin-comisiones"
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
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-0.5 text-xs font-semibold text-blue-600">
            Comparativa
          </span>
          <span className="text-slate-400">9 marzo 2026</span>
          <span className="text-slate-400">8 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          5 alternativas a Glovo sin comisiones para restaurantes en 2026
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Glovo cobra entre el 25% y el 35% por cada pedido. Para muchos
          restaurantes, eso no es sostenible. Aqui tienes 5 alternativas reales
          para recibir pedidos directos sin comisiones por pedido.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <p>
            <strong>Nota importante:</strong> esta comparativa se centra en
            herramientas de pedidos directos (el cliente te pide a ti, no a
            traves de un marketplace). Si necesitas la logistica de reparto de
            Glovo, estas herramientas no la incluyen — son para takeaway o
            reparto propio.
          </p>

          <h2>1. Tu propia web de pedidos</h2>
          <p>
            La opcion clasica: una pagina web con tu carta donde el cliente
            puede hacer pedidos online. Hay muchas plataformas que te la
            montan.
          </p>
          <ul>
            <li>
              <strong>Ejemplos:</strong> GloriaFood (gratis con limitaciones),
              Starter de Just Eat (cuota fija), apps tipo Last.app.
            </li>
            <li>
              <strong>Coste:</strong> desde 0€ hasta 100€+/mes segun funcionalidades.
            </li>
            <li>
              <strong>Pros:</strong> control total del menu y marca, sin
              comisiones por pedido en algunos planes.
            </li>
            <li>
              <strong>Contras:</strong> el cliente tiene que descubrir tu web,
              la friccion de salir de WhatsApp o buscar tu URL reduce
              conversiones. Necesitas hacer tu propio marketing.
            </li>
          </ul>
          <p>
            <strong>Ideal para:</strong> restaurantes con clientela fiel que ya
            busca su web.
          </p>

          <h2>2. Apps de pedidos propias (marca blanca)</h2>
          <p>
            Una app movil con tu marca que tus clientes descargan. Varios
            proveedores las ofrecen llave en mano.
          </p>
          <ul>
            <li>
              <strong>Ejemplos:</strong> Flipdish, Orderlord, Ordering.co.
            </li>
            <li>
              <strong>Coste:</strong> 60-200€/mes + posible comision reducida
              (3-5%).
            </li>
            <li>
              <strong>Pros:</strong> presencia profesional, notificaciones push,
              programa de fidelizacion integrado.
            </li>
            <li>
              <strong>Contras:</strong> convencer al cliente de descargar OTRA
              app es dificil. El 80% de las descargas no se usan despues de la
              primera semana. Coste alto para el volumen de un restaurante
              pequeno.
            </li>
          </ul>
          <p>
            <strong>Ideal para:</strong> cadenas o restaurantes con alto volumen
            y marca reconocida.
          </p>

          <h2>3. Pedidos por WhatsApp (manual)</h2>
          <p>
            Gratis. Usas WhatsApp Business y gestionas los pedidos tu mismo.
            Ya lo hacen miles de restaurantes en Espana.
          </p>
          <ul>
            <li>
              <strong>Coste:</strong> 0€.
            </li>
            <li>
              <strong>Pros:</strong> el cliente ya tiene WhatsApp, cero
              friccion, trato personal.
            </li>
            <li>
              <strong>Contras:</strong> no escala. A partir de 10-15 pedidos/dia
              se pierde el control. Errores en pedidos, no hay cobro automatico,
              facil olvidar un mensaje en hora punta.
            </li>
          </ul>
          <p>
            <strong>Ideal para:</strong> restaurantes con pocos pedidos (menos de
            10/dia) y tiempo para gestionar.
          </p>

          <h2>4. Redes sociales + formulario</h2>
          <p>
            Publicas tu carta en Instagram/Facebook y los clientes hacen pedidos
            via DM o un link a formulario.
          </p>
          <ul>
            <li>
              <strong>Coste:</strong> 0€ (o el coste de una herramienta de
              formularios).
            </li>
            <li>
              <strong>Pros:</strong> visibilidad en redes, aprovechas
              seguidores existentes.
            </li>
            <li>
              <strong>Contras:</strong> gestion caotica de DMs, sin
              automatizacion, el cliente tiene que cambiar de plataforma. Tasa
              de abandono alta en formularios largos.
            </li>
          </ul>
          <p>
            <strong>Ideal para:</strong> negocios muy pequenos o food trucks con
            presencia fuerte en redes.
          </p>

          <h2>5. Bot de WhatsApp con IA</h2>
          <p>
            La opcion mas nueva: un bot inteligente que entiende los mensajes de
            WhatsApp, identifica el pedido, confirma, cobra y envia a cocina.
            Todo automatico.
          </p>
          <ul>
            <li>
              <strong>Ejemplos:</strong>{" "}
              <Link href="/" className="text-green-600 font-semibold">
                YaComanda
              </Link>
              , OlaClick, Whato.app.
            </li>
            <li>
              <strong>Coste:</strong> desde 29€/mes (tarifa plana, sin
              comision por pedido).
            </li>
            <li>
              <strong>Pros:</strong> cero friccion (el cliente usa WhatsApp como
              siempre), automatizacion total, cobro integrado, datos de clientes
              propios, pantalla de cocina incluida.
            </li>
            <li>
              <strong>Contras:</strong> requiere WhatsApp Business API (YaComanda
              te ayuda con la configuracion), coste mensual.
            </li>
          </ul>
          <p>
            <strong>Ideal para:</strong> restaurantes con 10+ pedidos/dia que
            quieren automatizar sin perder el canal de WhatsApp.
          </p>

          <h2>Comparativa rapida</h2>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-3 py-3 text-left font-semibold">
                    Alternativa
                  </th>
                  <th className="px-3 py-3 text-center font-semibold">
                    Coste
                  </th>
                  <th className="px-3 py-3 text-center font-semibold">
                    Automatico
                  </th>
                  <th className="px-3 py-3 text-center font-semibold">
                    Friccion
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-3 font-medium">Web propia</td>
                  <td className="px-3 py-3 text-center">0-100€/mes</td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                  <td className="px-3 py-3 text-center text-amber-500 font-medium">
                    Media
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">App marca blanca</td>
                  <td className="px-3 py-3 text-center">60-200€/mes</td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                  <td className="px-3 py-3 text-center text-red-500 font-medium">
                    Alta
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">WhatsApp manual</td>
                  <td className="px-3 py-3 text-center">0€</td>
                  <td className="px-3 py-3 text-center">
                    <X className="mx-auto size-4 text-red-500" />
                  </td>
                  <td className="px-3 py-3 text-center text-green-500 font-medium">
                    Baja
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Redes + formulario</td>
                  <td className="px-3 py-3 text-center">0€</td>
                  <td className="px-3 py-3 text-center">
                    <Minus className="mx-auto size-4 text-slate-400" />
                  </td>
                  <td className="px-3 py-3 text-center text-red-500 font-medium">
                    Alta
                  </td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-3 py-3 font-bold text-green-700">
                    Bot WhatsApp IA
                  </td>
                  <td className="px-3 py-3 text-center font-semibold text-green-700">
                    29€/mes
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-600" />
                  </td>
                  <td className="px-3 py-3 text-center text-green-600 font-bold">
                    Baja
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Cual elegir</h2>
          <p>Depende de tu situacion:</p>
          <ul>
            <li>
              <strong>Poco volumen y tiempo libre:</strong> WhatsApp manual es
              suficiente.
            </li>
            <li>
              <strong>Quieres presencia online profesional:</strong> una web de
              pedidos puede ser buen complemento.
            </li>
            <li>
              <strong>Ya recibes muchos pedidos por WhatsApp:</strong> un bot
              con IA te ahorra horas al dia y elimina errores.
            </li>
          </ul>
          <p>
            La realidad para la mayoria de restaurantes en Espana: tus clientes
            ya usan WhatsApp. Darles una forma automatica de pedir por ahi es
            el camino de menor resistencia.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Prueba la opcion 5: pedidos por WhatsApp con IA
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

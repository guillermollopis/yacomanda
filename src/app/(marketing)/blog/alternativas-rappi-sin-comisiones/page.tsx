import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, X, Minus } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "5 alternativas a Rappi sin comisiones para restaurantes en 2026 — YaComanda",
  description:
    "Comparativa de las mejores alternativas a Rappi para restaurantes en Colombia, Mexico y Latinoamerica. Precios reales, pros y contras de cada opcion.",
  keywords: [
    "alternativas a rappi",
    "rappi comisiones restaurantes",
    "alternativa rappi sin comisiones",
    "pedidos directos restaurante",
    "rappi colombia alternativas",
    "rappi mexico alternativas",
    "delivery sin comisiones latinoamerica",
  ],
  openGraph: {
    title: "5 alternativas a Rappi sin comisiones para restaurantes (2026)",
    description:
      "Comparativa honesta: precios reales, pros y contras de cada alternativa a Rappi en Latinoamerica.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="5 alternativas a Rappi sin comisiones para restaurantes en 2026"
      description="Comparativa de las mejores alternativas a Rappi para restaurantes en Latinoamerica."
      slug="alternativas-rappi-sin-comisiones"
      datePublished="2026-03-30"
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
          <span className="text-slate-400">30 marzo 2026</span>
          <span className="text-slate-400">8 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          5 alternativas a Rappi sin comisiones para restaurantes en 2026
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Rappi cobra entre el 20% y el 35% por cada pedido. Si tienes un
          restaurante en Colombia, Mexico o cualquier pais de Latinoamerica,
          sabes que ese margen duele. Aqui tienes 5 alternativas reales para
          recibir pedidos directos sin regalar tu ganancia.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <p>
            <strong>Aclaracion:</strong> estas alternativas son para recibir
            pedidos directos de tus clientes. Si dependes del trafico de
            descubrimiento de Rappi (clientes nuevos que buscan &quot;comida cerca
            de mi&quot;), estas herramientas no reemplazan eso — son para el
            cliente que ya te conoce y quiere pedir sin pasar por una plataforma.
          </p>

          <h2>El problema con Rappi (y las plataformas de delivery)</h2>
          <p>
            La logica es simple: por cada pedido de $50.000 COP, Rappi se queda
            con $12.500 a $17.500. Multiplica eso por 30 pedidos al dia y
            estas regalando entre 375.000 y 525.000 COP al mes. En Mexico los
            numeros son similares: un pedido de $200 MXN te deja $130-$160
            despues de la comision.
          </p>
          <p>
            El peor escenario: tus clientes habituales — los que ya saben tu
            nombre y ubicacion — piden por Rappi por comodidad. Estas pagando
            comision por ventas que ya eran tuyas.
          </p>

          <h2>1. Tu propia pagina web de pedidos</h2>
          <p>
            Una pagina donde tus clientes ven la carta y hacen el pedido
            directamente. Hay varias plataformas que la montan por ti.
          </p>
          <ul>
            <li>
              <strong>Ejemplos:</strong> GloriaFood (gratis con limitaciones),
              PedidosYa para Comercios (cuota fija en algunos paises),
              Starter de plataformas locales.
            </li>
            <li>
              <strong>Coste:</strong> desde $0 hasta $300.000 COP/mes segun
              funcionalidades.
            </li>
            <li>
              <strong>Pros:</strong> control total de tu marca y menu, sin
              comision por pedido en algunos planes.
            </li>
            <li>
              <strong>Contras:</strong> tus clientes tienen que encontrar la
              pagina. La friccion de buscar una URL o salir de WhatsApp reduce
              las conversiones. Necesitas hacer tu propio marketing.
            </li>
          </ul>
          <p>
            <strong>Ideal para:</strong> restaurantes con marca fuerte y
            clientela que ya busca su web.
          </p>

          <h2>2. App propia (marca blanca)</h2>
          <p>
            Una app movil con tu logo que tus clientes descargan del App Store
            o Google Play. Varios proveedores las ofrecen llave en mano.
          </p>
          <ul>
            <li>
              <strong>Ejemplos:</strong> Ordering.co, Flipdish,
              OwnerApp.
            </li>
            <li>
              <strong>Coste:</strong> $200.000-$800.000 COP/mes + posible
              comision reducida (3-5%).
            </li>
            <li>
              <strong>Pros:</strong> presencia profesional, notificaciones push,
              programa de fidelidad.
            </li>
            <li>
              <strong>Contras:</strong> convencer al cliente de descargar OTRA
              app es muy dificil. El 80% de las apps descargadas no se usan
              despues de la primera semana. Coste alto para un restaurante
              independiente.
            </li>
          </ul>
          <p>
            <strong>Ideal para:</strong> cadenas con marca reconocida y alto
            volumen.
          </p>

          <h2>3. Pedidos por WhatsApp (manual)</h2>
          <p>
            Gratis. Usas WhatsApp Business y gestionas los pedidos tu mismo.
            Ya lo hacen la mayoria de restaurantes en Latinoamerica.
          </p>
          <ul>
            <li>
              <strong>Coste:</strong> $0.
            </li>
            <li>
              <strong>Pros:</strong> el cliente ya tiene WhatsApp, cero
              friccion, trato personal.
            </li>
            <li>
              <strong>Contras:</strong> no escala. A partir de 10-15 pedidos/dia
              se pierde el control. Errores en pedidos, no hay cobro automatico,
              facil perder un mensaje en hora pico.
            </li>
          </ul>
          <p>
            <strong>Ideal para:</strong> restaurantes con pocos pedidos (menos
            de 10/dia) y alguien dedicado a responder.
          </p>

          <h2>4. Redes sociales + link de pago</h2>
          <p>
            Publicas tu carta en Instagram/Facebook y los clientes piden por
            DM o un link a formulario. Le agregas un link de Mercado Pago o
            Nequi para cobrar.
          </p>
          <ul>
            <li>
              <strong>Coste:</strong> $0 (mas la comision de la pasarela de
              pago).
            </li>
            <li>
              <strong>Pros:</strong> visibilidad en redes, aprovechas los
              seguidores que ya tienes.
            </li>
            <li>
              <strong>Contras:</strong> gestion caotica de DMs, cero
              automatizacion, el cliente tiene que saltar entre plataformas.
              Alta tasa de abandono.
            </li>
          </ul>
          <p>
            <strong>Ideal para:</strong> negocios muy chicos o food trucks
            con presencia fuerte en redes.
          </p>

          <h2>5. Bot de WhatsApp con IA</h2>
          <p>
            La opcion mas nueva: un bot inteligente que entiende los mensajes
            de WhatsApp, identifica el pedido, confirma, cobra y lo envia a
            cocina. Todo automatico, 24/7.
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
              <strong>Coste:</strong> desde $29 USD/mes (tarifa plana, sin
              comision por pedido).
            </li>
            <li>
              <strong>Pros:</strong> cero friccion (el cliente usa WhatsApp
              como siempre), automatizacion total, cobro integrado con
              pasarelas locales, datos de clientes propios, pantalla de cocina
              incluida.
            </li>
            <li>
              <strong>Contras:</strong> requiere WhatsApp Business API
              (YaComanda te ayuda con la configuracion), coste mensual.
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
                  <td className="px-3 py-3 text-center">$0-300k COP/mes</td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                  <td className="px-3 py-3 text-center text-amber-500 font-medium">
                    Media
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">App marca blanca</td>
                  <td className="px-3 py-3 text-center">$200-800k COP/mes</td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                  <td className="px-3 py-3 text-center text-red-500 font-medium">
                    Alta
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">WhatsApp manual</td>
                  <td className="px-3 py-3 text-center">$0</td>
                  <td className="px-3 py-3 text-center">
                    <X className="mx-auto size-4 text-red-500" />
                  </td>
                  <td className="px-3 py-3 text-center text-green-500 font-medium">
                    Baja
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Redes + link pago</td>
                  <td className="px-3 py-3 text-center">$0</td>
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
                    $29 USD/mes
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

          <h2>Por que WhatsApp es clave en Latinoamerica</h2>
          <p>
            En paises como Colombia, Mexico, Argentina y Peru, WhatsApp tiene
            mas del 90% de penetracion. Tus clientes ya te escriben por ahi
            para preguntar horarios, ver la carta o hacer pedidos. La
            diferencia es si esos mensajes los gestionas tu manualmente o
            dejas que un bot lo haga por ti, sin errores y sin esperas.
          </p>

          <h2>Cual elegir</h2>
          <p>Depende de tu situacion:</p>
          <ul>
            <li>
              <strong>Poco volumen y alguien disponible:</strong> WhatsApp
              manual funciona.
            </li>
            <li>
              <strong>Marca fuerte y presupuesto:</strong> una web de pedidos
              puede complementar.
            </li>
            <li>
              <strong>Ya recibes muchos pedidos por WhatsApp:</strong> un bot
              con IA te ahorra horas al dia y elimina errores.
            </li>
          </ul>
          <p>
            La realidad: en Latinoamerica, WhatsApp es el canal. Darles a tus
            clientes una forma automatica de pedir por ahi — sin descargar
            apps, sin buscar URLs — es el camino de menor resistencia.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Deja de regalar el 30% a Rappi
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

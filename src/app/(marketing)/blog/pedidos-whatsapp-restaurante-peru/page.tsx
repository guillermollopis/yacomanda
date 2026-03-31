import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Como recibir pedidos por WhatsApp en tu restaurante en Peru (2026) — YaComanda",
  description:
    "Guia completa para restaurantes peruanos que quieren automatizar pedidos por WhatsApp. Desde lo manual hasta bots con IA que cobran con Yape y Plin.",
  keywords: [
    "pedidos whatsapp restaurante peru",
    "bot whatsapp restaurante peru",
    "pedidos online restaurante peru",
    "yape restaurante",
    "plin restaurante",
    "alternativa rappi peru",
    "delivery sin comisiones peru",
  ],
  openGraph: {
    title:
      "Como recibir pedidos por WhatsApp en tu restaurante en Peru (2026)",
    description:
      "Guia paso a paso para restaurantes peruanos: automatiza pedidos por WhatsApp y deja de depender de Rappi y PedidosYa.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Como recibir pedidos por WhatsApp en tu restaurante en Peru"
      description="Guia completa para restaurantes peruanos que quieren automatizar pedidos por WhatsApp."
      slug="pedidos-whatsapp-restaurante-peru"
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
          <span className="rounded-full border border-green-200 bg-green-50 px-3 py-0.5 text-xs font-semibold text-green-600">
            Guia
          </span>
          <span className="text-slate-400">31 marzo 2026</span>
          <span className="text-slate-400">7 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Como recibir pedidos por WhatsApp en tu restaurante en Peru
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Peru es un pais de comida. Desde cevicherias y pollerias hasta
          chifas y picanterias, el peruano come fuera de casa mas que casi
          cualquier otro latinoamericano. Y cuando pide a domicilio, lo
          hace por WhatsApp. Mas del 90% de los peruanos con smartphone
          usan WhatsApp a diario. La pregunta es como convertir esos
          mensajes en pedidos automaticos sin regalar tu margen a Rappi o
          PedidosYa.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>El costo real de Rappi y PedidosYa para tu restaurante</h2>
          <p>
            Una polleria o cevicheria en Lima que recibe 20 pedidos diarios
            por Rappi con ticket promedio de S/ 45 esta pagando:
          </p>
          <ul>
            <li>Comision Rappi/PedidosYa (25-35%): S/ 11.25 - S/ 15.75 por pedido</li>
            <li>Al mes: S/ 6,750 a S/ 9,450 solo en comisiones</li>
            <li>Al ano: mas de S/ 80,000</li>
          </ul>
          <p>
            Y muchos de esos pedidos vienen de clientes habituales — gente
            del barrio que ya sabe tu nombre y tu direccion. Esas ventas
            podrian ser directas.
          </p>

          <h2>3 formas de recibir pedidos por WhatsApp</h2>

          <h3>1. WhatsApp Business manual</h3>
          <p>
            Lo basico y gratis. Configuras WhatsApp Business con tu catalogo,
            horario y respuestas rapidas. Cada pedido lo gestionas tu.
          </p>
          <ul>
            <li>Sube tu carta al catalogo de WhatsApp Business</li>
            <li>Configura mensajes automaticos de bienvenida</li>
            <li>Usa etiquetas: &quot;Nuevo&quot;, &quot;En preparacion&quot;, &quot;Entregado&quot;</li>
            <li>Cobra por Yape, Plin o contra entrega</li>
          </ul>
          <p>
            <strong>Funciona hasta:</strong> 8-10 pedidos/dia. Despues, en
            hora punta los mensajes se acumulan y empiezas a perder pedidos.
          </p>

          <h3>2. WhatsApp + Yape/Plin</h3>
          <p>
            Un paso arriba: gestionas manualmente pero usas Yape o Plin
            para el cobro. En Peru esto es muy natural — la gran mayoria
            de tus clientes ya tienen Yape instalado y lo usan para todo.
          </p>
          <ul>
            <li>El cliente hace el pedido por WhatsApp</li>
            <li>Tu le pasas tu numero de Yape o Plin</li>
            <li>El cliente paga y te envia el pantallazo de confirmacion</li>
            <li>Tu confirmas y preparas el pedido</li>
          </ul>
          <p>
            <strong>Ventaja:</strong> cobro instantaneo, sin efectivo, y tu
            cliente ya conoce Yape.
            <strong> Desventaja:</strong> verificar pantallazos es tedioso y
            propenso a errores. En hora pico se vuelve un caos.
          </p>

          <h3>3. Bot de WhatsApp con IA (automatico)</h3>
          <p>
            Un bot con inteligencia artificial que entiende lo que el cliente
            escribe, arma el pedido, confirma el total y cobra — todo sin
            intervencion humana.
          </p>
          <ul>
            <li>
              El cliente escribe: &quot;quiero un ceviche mixto, una causa
              limena y dos inca kolas&quot;
            </li>
            <li>El bot entiende, confirma el pedido y muestra el total</li>
            <li>Envia el link de pago (compatible con Yape, Plin, tarjeta, transferencia BCP/Interbank)</li>
            <li>Manda la comanda directo a la pantalla de cocina</li>
            <li>Guarda el historial del cliente automaticamente</li>
          </ul>
          <p>
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            hace exactamente esto. Tarifa plana desde $29 USD/mes (~S/ 110),
            sin comision por pedido. Comparado con los miles de soles que le
            pagas a Rappi, es una fraccion.
          </p>

          <h2>Cuanto te ahorras: numeros reales</h2>
          <p>
            Polleria en Lima, 20 pedidos/dia, ticket promedio S/ 50:
          </p>
          <ul>
            <li>
              <strong>Con Rappi (28% comision):</strong> S/ 14/pedido x
              600 pedidos/mes = S/ 8,400/mes
            </li>
            <li>
              <strong>Con bot de WhatsApp:</strong> ~S/ 110/mes +
              comision pasarela (~3.5%) = ~S/ 1,160/mes
            </li>
            <li>
              <strong>Ahorro potencial:</strong> ~S/ 7,240/mes
            </li>
          </ul>
          <p>
            Incluso si solo migras el 30% de tus pedidos recurrentes a
            WhatsApp, el ahorro ya supera los S/ 2,000 mensuales.
          </p>

          <h2>Como empezar paso a paso</h2>
          <ol>
            <li>
              <strong>Identifica clientes repetidores:</strong> los que piden
              cada semana y que ya te conocen por nombre.
            </li>
            <li>
              <strong>Mete un flyer en cada delivery:</strong> &quot;Pide
              directo por WhatsApp y llevate un 10% de descuento&quot; con tu
              numero y un codigo QR.
            </li>
            <li>
              <strong>Configura tu bot:</strong> sube tu carta, conecta
              WhatsApp Business API y tu pasarela de pago. Con YaComanda son
              15 minutos.
            </li>
            <li>
              <strong>Pon tu numero en Google Maps:</strong> muchos clientes
              nuevos te encuentran ahi. Si ven WhatsApp, te escriben directo.
            </li>
          </ol>

          <h2>Preguntas frecuentes</h2>

          <p><strong>¿Funciona con Yape y Plin?</strong></p>
          <p>
            Si. YaComanda se integra con pasarelas de pago peruanas.
            Tambien puedes ofrecer pago por transferencia BCP/Interbank
            o efectivo contra entrega.
          </p>

          <p><strong>¿Necesito un numero de telefono aparte?</strong></p>
          <p>
            Para la API de WhatsApp Business necesitas un numero que no este
            registrado en WhatsApp regular. Puede ser una linea nueva de
            Claro, Movistar o Entel. YaComanda te guia en todo el proceso.
          </p>

          <p><strong>¿Sirve para pollerias, cevicherias y chifas?</strong></p>
          <p>
            Absolutamente. El bot se adapta a cualquier tipo de carta. Da
            igual si vendes pollo a la brasa, ceviche o chaufa — el bot
            entiende el pedido y lo procesa. Funciona en Lima, Arequipa,
            Trujillo, Cusco y cualquier ciudad del Peru.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Recibe pedidos por WhatsApp, automatico
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

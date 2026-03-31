import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Como recibir pedidos por WhatsApp en tu restaurante en Chile (2026) — YaComanda",
  description:
    "Guia completa para restaurantes chilenos que quieren automatizar pedidos por WhatsApp. Desde lo manual hasta bots con IA que cobran con Mercado Pago y Webpay.",
  keywords: [
    "pedidos whatsapp restaurante chile",
    "bot whatsapp restaurante chile",
    "pedidos online restaurante chile",
    "alternativa pedidosya chile",
    "alternativa rappi chile",
    "delivery sin comisiones chile",
    "automatizar pedidos restaurante santiago",
  ],
  openGraph: {
    title:
      "Como recibir pedidos por WhatsApp en tu restaurante en Chile (2026)",
    description:
      "Guia paso a paso para restaurantes chilenos: automatiza pedidos por WhatsApp y deja de depender de PedidosYa y Rappi.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Como recibir pedidos por WhatsApp en tu restaurante en Chile"
      description="Guia completa para restaurantes chilenos que quieren automatizar pedidos por WhatsApp."
      slug="pedidos-whatsapp-restaurante-chile"
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
          Como recibir pedidos por WhatsApp en tu restaurante en Chile
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Chile tiene una de las tasas de penetracion digital mas altas de
          Latinoamerica. Mas del 90% de los chilenos con smartphone usan
          WhatsApp a diario. Pero tambien es uno de los mercados donde
          PedidosYa, Rappi y Uber Eats cobran mas comisiones. Si tus
          clientes ya te conocen, ¿por que seguir pagando el 30%?
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>El costo real de las plataformas de delivery en Chile</h2>
          <p>
            Un restaurante en Santiago o Valparaiso que recibe 20 pedidos
            diarios por PedidosYa con ticket promedio de $12.000 CLP esta
            pagando:
          </p>
          <ul>
            <li>Comision PedidosYa/Rappi/Uber Eats (25-35%): $3.000 - $4.200 por pedido</li>
            <li>Al mes: $1.800.000 a $2.520.000 CLP solo en comisiones</li>
            <li>Al ano: mas de $21 millones CLP</li>
          </ul>
          <p>
            Una parte importante de esos pedidos vienen de clientes
            habituales. Ya te conocen, ya saben tu direccion. Esas ventas
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
            <li>Cobra por transferencia bancaria, Mercado Pago o efectivo</li>
          </ul>
          <p>
            <strong>Funciona hasta:</strong> 8-10 pedidos/dia. Despues, los
            errores y los tiempos de respuesta empiezan a costar clientes.
          </p>

          <h3>2. WhatsApp + transferencia/Webpay</h3>
          <p>
            Un paso arriba: gestionas manualmente pero usas transferencia
            bancaria o Webpay para el cobro. En Chile el sistema bancario
            es muy eficiente y las transferencias son instantaneas.
          </p>
          <ul>
            <li>El cliente hace el pedido por WhatsApp</li>
            <li>Tu le pasas los datos de transferencia o un link de Webpay</li>
            <li>El cliente paga y te envia el comprobante</li>
            <li>Confirmas y preparas el pedido</li>
          </ul>
          <p>
            <strong>Ventaja:</strong> cobro rapido, bajo costo de transaccion.
            <strong> Desventaja:</strong> verificar comprobantes manualmente
            es tedioso y en hora pico se cometen errores.
          </p>

          <h3>3. Bot de WhatsApp con IA (automatico)</h3>
          <p>
            Un bot con inteligencia artificial que entiende lo que el cliente
            escribe, arma el pedido, confirma el total y cobra — todo sin
            intervencion humana.
          </p>
          <ul>
            <li>
              El cliente escribe: &quot;quiero un completo italiano, una
              empanada de pino y un mote con huesillo&quot;
            </li>
            <li>El bot entiende, confirma el pedido y muestra el total</li>
            <li>Envia el link de pago (compatible con Mercado Pago, Webpay, tarjeta, transferencia)</li>
            <li>Manda la comanda directo a la pantalla de cocina</li>
            <li>Guarda el historial del cliente automaticamente</li>
          </ul>
          <p>
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            hace exactamente esto. Tarifa plana desde $29 USD/mes (~$28.000
            CLP), sin comision por pedido. Comparado con los millones que le
            pagas a PedidosYa, es una fraccion.
          </p>

          <h2>Cuanto te ahorras: numeros reales</h2>
          <p>
            Restaurante en Santiago, 20 pedidos/dia, ticket promedio
            $12.000 CLP:
          </p>
          <ul>
            <li>
              <strong>Con PedidosYa (30% comision):</strong> $3.600/pedido x
              600 pedidos/mes = $2.160.000 CLP/mes
            </li>
            <li>
              <strong>Con bot de WhatsApp:</strong> ~$28.000 CLP/mes +
              comision pasarela (~3%) = ~$244.000 CLP/mes
            </li>
            <li>
              <strong>Ahorro potencial:</strong> ~$1.900.000 CLP/mes
            </li>
          </ul>
          <p>
            Incluso si solo migras el 30% de tus pedidos recurrentes a
            WhatsApp, el ahorro ya supera los $570.000 CLP mensuales.
          </p>

          <h2>Como empezar paso a paso</h2>
          <ol>
            <li>
              <strong>Identifica clientes repetidores:</strong> los que piden
              cada semana por PedidosYa y que ya te conocen.
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

          <p><strong>¿Funciona con Webpay y Mercado Pago?</strong></p>
          <p>
            Si. YaComanda se integra con las pasarelas de pago mas usadas
            en Chile. Tambien puedes ofrecer pago por transferencia bancaria
            o efectivo contra entrega.
          </p>

          <p><strong>¿Necesito un numero de telefono aparte?</strong></p>
          <p>
            Para la API de WhatsApp Business necesitas un numero que no este
            registrado en WhatsApp regular. Puede ser una linea nueva de
            Entel, Movistar o Claro. YaComanda te guia en todo el proceso.
          </p>

          <p><strong>¿Funciona fuera de Santiago?</strong></p>
          <p>
            Si. En ciudades como Valparaiso, Concepcion, Temuco o Antofagasta,
            donde las plataformas de delivery tienen menos presencia,
            WhatsApp es el canal principal de pedidos. Un bot automatiza lo
            que ya haces manualmente.
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

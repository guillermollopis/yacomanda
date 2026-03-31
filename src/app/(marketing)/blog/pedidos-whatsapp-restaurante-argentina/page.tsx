import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Como recibir pedidos por WhatsApp en tu restaurante en Argentina (2026) — YaComanda",
  description:
    "Guia completa para restaurantes argentinos que quieren automatizar pedidos por WhatsApp. Desde lo manual hasta bots con IA que cobran con Mercado Pago y transferencia bancaria.",
  keywords: [
    "pedidos whatsapp restaurante argentina",
    "bot whatsapp restaurante argentina",
    "pedidos online restaurante argentina",
    "mercado pago restaurante",
    "alternativa pedidosya",
    "delivery sin comisiones argentina",
    "automatizar pedidos restaurante buenos aires",
  ],
  openGraph: {
    title:
      "Como recibir pedidos por WhatsApp en tu restaurante en Argentina (2026)",
    description:
      "Guia paso a paso para restaurantes argentinos: automatiza pedidos por WhatsApp y deja de depender de PedidosYa.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Como recibir pedidos por WhatsApp en tu restaurante en Argentina"
      description="Guia completa para restaurantes argentinos que quieren automatizar pedidos por WhatsApp."
      slug="pedidos-whatsapp-restaurante-argentina"
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
          Como recibir pedidos por WhatsApp en tu restaurante en Argentina
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Argentina es uno de los paises con mayor penetracion de WhatsApp
          en el mundo: mas del 95% de los argentinos con smartphone lo usan
          a diario. Tus clientes ya te escriben por WhatsApp para preguntar
          el menu o hacer pedidos. La pregunta es como convertir esos
          mensajes en un canal de ventas automatizado sin depender de las
          comisiones de PedidosYa y Rappi.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>El costo real de PedidosYa y Rappi para tu restaurante</h2>
          <p>
            Un restaurante promedio en Buenos Aires o Cordoba que recibe 25
            pedidos diarios por PedidosYa con ticket promedio de $15.000 ARS
            esta pagando:
          </p>
          <ul>
            <li>Comision PedidosYa/Rappi (25-35%): $3.750 - $5.250 por pedido</li>
            <li>Al mes: $2.800.000 a $3.900.000 ARS solo en comisiones</li>
            <li>Al ano: mas de $33 millones ARS</li>
          </ul>
          <p>
            Y lo peor: una parte importante de esos pedidos vienen de
            clientes que ya te conocen. Te buscan por nombre en la app. Esas
            ventas podrian ser directas, sin intermediarios.
          </p>

          <h2>3 formas de recibir pedidos por WhatsApp</h2>

          <h3>1. WhatsApp Business manual</h3>
          <p>
            Lo basico y gratis. Configuras WhatsApp Business con tu catalogo,
            horario y respuestas rapidas. Cada pedido lo gestionas vos mismo.
          </p>
          <ul>
            <li>Subi tu carta al catalogo de WhatsApp Business</li>
            <li>Configura mensajes automaticos de bienvenida</li>
            <li>Usa etiquetas: &quot;Nuevo&quot;, &quot;En preparacion&quot;, &quot;Entregado&quot;</li>
            <li>Cobra por Mercado Pago, transferencia bancaria o efectivo</li>
          </ul>
          <p>
            <strong>Funciona hasta:</strong> 8-10 pedidos/dia. Despues, los
            errores y los tiempos de respuesta empiezan a costarte clientes.
          </p>

          <h3>2. WhatsApp + Mercado Pago</h3>
          <p>
            Un paso arriba: gestionas manualmente pero usas Mercado Pago
            para el cobro. En Argentina esto es muy natural — la gran
            mayoria de tus clientes ya tienen la app de Mercado Pago
            instalada y la usan a diario.
          </p>
          <ul>
            <li>El cliente hace el pedido por WhatsApp</li>
            <li>Vos le pasas el link de pago de Mercado Pago</li>
            <li>El cliente paga y te llega la notificacion</li>
            <li>Confirmas y preparas el pedido</li>
          </ul>
          <p>
            <strong>Ventaja:</strong> cobro instantaneo, sin efectivo, y tu
            cliente ya conoce la plataforma.
            <strong> Desventaja:</strong> sigue siendo manual y propenso a
            errores en horas pico.
          </p>

          <h3>3. Bot de WhatsApp con IA (automatico)</h3>
          <p>
            Un bot con inteligencia artificial que entiende lo que el cliente
            escribe, arma el pedido, confirma el total y cobra — todo sin
            intervencion humana.
          </p>
          <ul>
            <li>
              El cliente escribe: &quot;quiero una milanesa napolitana con
              papas fritas y una coca&quot;
            </li>
            <li>El bot entiende, confirma el pedido y muestra el total</li>
            <li>Envia el link de pago (compatible con Mercado Pago, tarjeta, transferencia)</li>
            <li>Manda la comanda directo a la pantalla de cocina</li>
            <li>Guarda el historial del cliente automaticamente</li>
          </ul>
          <p>
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            hace exactamente esto. Tarifa plana desde $29 USD/mes, sin
            comision por pedido. Comparado con los millones que le pagas a
            PedidosYa, es una fraccion minima.
          </p>

          <h2>Cuanto te ahorras: numeros reales</h2>
          <p>
            Restaurante en Buenos Aires, 20 pedidos/dia, ticket promedio
            $15.000 ARS:
          </p>
          <ul>
            <li>
              <strong>Con PedidosYa (30% comision):</strong> $4.500/pedido x
              600 pedidos/mes = $2.700.000 ARS/mes
            </li>
            <li>
              <strong>Con bot de WhatsApp:</strong> ~$30.000 ARS/mes +
              comision Mercado Pago (~4%) = ~$390.000 ARS/mes
            </li>
            <li>
              <strong>Ahorro potencial:</strong> ~$2.300.000 ARS/mes
            </li>
          </ul>
          <p>
            Incluso si solo migras el 30% de tus pedidos recurrentes a
            WhatsApp, el ahorro ya supera los $700.000 ARS mensuales.
          </p>

          <h2>Como empezar paso a paso</h2>
          <ol>
            <li>
              <strong>Identifica clientes repetidores:</strong> los que piden
              cada semana por PedidosYa y que ya te conocen.
            </li>
            <li>
              <strong>Mete un flyer en cada delivery:</strong> &quot;Pedi
              directo por WhatsApp y llevate un 10% de descuento&quot; con tu
              numero y un codigo QR.
            </li>
            <li>
              <strong>Configura tu bot:</strong> subi tu carta, conecta
              WhatsApp Business API y tu cuenta de Mercado Pago. Con
              YaComanda son 15 minutos.
            </li>
            <li>
              <strong>Pone tu numero en Google Maps:</strong> muchos clientes
              nuevos te encuentran ahi. Si ven WhatsApp, te escriben directo.
            </li>
          </ol>

          <h2>Preguntas frecuentes</h2>

          <p><strong>¿Funciona con Mercado Pago?</strong></p>
          <p>
            Si. YaComanda se integra con Mercado Pago, que es la pasarela
            de pago mas usada en Argentina. Tambien podes ofrecer pago
            por transferencia bancaria (CBU/CVU) o efectivo contra entrega.
          </p>

          <p><strong>¿Necesito un numero de telefono aparte?</strong></p>
          <p>
            Para la API de WhatsApp Business necesitas un numero que no este
            registrado en WhatsApp regular. Puede ser una linea nueva.
            YaComanda te guia en todo el proceso.
          </p>

          <p><strong>¿Puedo usarlo fuera de Buenos Aires?</strong></p>
          <p>
            Absolutamente. De hecho, en ciudades donde PedidosYa no tiene
            tanta presencia (Rosario, Mendoza, Tucuman, Mar del Plata),
            WhatsApp es el canal principal de pedidos. Un bot le da a tu
            restaurante el mismo nivel de automatizacion que las grandes
            cadenas.
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

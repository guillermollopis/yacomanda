import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Como recibir pedidos por WhatsApp en tu restaurante en Colombia (2026) — YaComanda",
  description:
    "Guia completa para restaurantes colombianos que quieren automatizar pedidos por WhatsApp. Desde lo manual hasta bots con IA que cobran con Nequi y Daviplata.",
  keywords: [
    "pedidos whatsapp restaurante colombia",
    "bot whatsapp restaurante colombia",
    "pedidos online restaurante colombia",
    "alternativa rappi colombia",
    "delivery sin comisiones colombia",
    "automatizar pedidos restaurante bogota",
    "pedidos directos restaurante medellin",
  ],
  openGraph: {
    title:
      "Como recibir pedidos por WhatsApp en tu restaurante en Colombia (2026)",
    description:
      "Guia paso a paso para restaurantes colombianos: automatiza pedidos por WhatsApp y deja de depender de Rappi.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Como recibir pedidos por WhatsApp en tu restaurante en Colombia"
      description="Guia completa para restaurantes colombianos que quieren automatizar pedidos por WhatsApp."
      slug="pedidos-whatsapp-restaurante-colombia"
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
          <span className="rounded-full border border-green-200 bg-green-50 px-3 py-0.5 text-xs font-semibold text-green-600">
            Guia
          </span>
          <span className="text-slate-400">30 marzo 2026</span>
          <span className="text-slate-400">7 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Como recibir pedidos por WhatsApp en tu restaurante en Colombia
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Colombia es el segundo mercado mas grande de Rappi. Pero tambien es
          uno de los paises con mayor uso de WhatsApp en el mundo: mas del
          95% de los colombianos con smartphone lo usan a diario. Tus
          clientes ya te escriben por WhatsApp. La pregunta es como
          convertir esos mensajes en pedidos automaticos.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>El costo real de Rappi para tu restaurante</h2>
          <p>
            Un restaurante promedio en Bogota o Medellin que recibe 25
            pedidos diarios por Rappi con ticket promedio de $35.000 COP
            esta pagando:
          </p>
          <ul>
            <li>Comision Rappi (25-30%): $8.750 - $10.500 por pedido</li>
            <li>Al mes: $6.5 a $7.8 millones COP solo en comisiones</li>
            <li>Al ano: mas de $78 millones COP</li>
          </ul>
          <p>
            Y lo peor: una parte importante de esos pedidos vienen de
            clientes que ya te conocen. Te buscan por nombre. Esas ventas
            podrian ser directas.
          </p>

          <h2>3 formas de recibir pedidos por WhatsApp</h2>

          <h2>1. WhatsApp Business manual</h2>
          <p>
            Lo basico y gratis. Configuras WhatsApp Business con tu catalogo,
            horario y respuestas rapidas. Cada pedido lo gestionas tu.
          </p>
          <ul>
            <li>Sube tu carta al catalogo de WhatsApp Business</li>
            <li>Configura mensajes automaticos de bienvenida</li>
            <li>Usa etiquetas: &quot;Nuevo&quot;, &quot;En preparacion&quot;, &quot;Entregado&quot;</li>
            <li>Cobra por Nequi, Daviplata o contra entrega</li>
          </ul>
          <p>
            <strong>Funciona hasta:</strong> 8-10 pedidos/dia. Despues, los
            errores y los tiempos de respuesta empiezan a costar clientes.
          </p>

          <h2>2. WhatsApp + Nequi/Daviplata</h2>
          <p>
            Un paso arriba: gestionas manualmente pero usas billeteras
            digitales para el cobro. En Colombia esto es muy natural — la
            mayoria de tus clientes ya tienen Nequi o Daviplata.
          </p>
          <ul>
            <li>El cliente hace el pedido por WhatsApp</li>
            <li>Tu le pasas el numero de Nequi o el link de pago</li>
            <li>El cliente paga y te envia el pantallazo</li>
            <li>Tu confirmas y preparas el pedido</li>
          </ul>
          <p>
            <strong>Ventaja:</strong> cobro casi instantaneo, sin efectivo.
            <strong> Desventaja:</strong> sigue siendo manual y propenso a
            errores.
          </p>

          <h2>3. Bot de WhatsApp con IA (automatico)</h2>
          <p>
            Un bot con inteligencia artificial que entiende lo que el cliente
            escribe, arma el pedido, confirma el total y cobra — todo sin
            intervencion humana.
          </p>
          <ul>
            <li>
              El cliente escribe: &quot;quiero una bandeja paisa y un jugo de
              lulo&quot;
            </li>
            <li>El bot entiende, confirma el pedido y muestra el total</li>
            <li>Envia el link de pago (compatible con Nequi, PSE, tarjeta)</li>
            <li>Manda la comanda directo a la pantalla de cocina</li>
            <li>Guarda el historial del cliente automaticamente</li>
          </ul>
          <p>
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            hace exactamente esto. Tarifa plana desde $29 USD/mes (~$120.000
            COP), sin comision por pedido. Comparado con los millones que le
            pagas a Rappi, es una fraccion.
          </p>

          <h2>Cuanto te ahorras: numeros reales</h2>
          <p>
            Restaurante en Bogota, 20 pedidos/dia, ticket promedio $40.000
            COP:
          </p>
          <ul>
            <li>
              <strong>Con Rappi (27% comision):</strong> $10.800/pedido ×
              600 pedidos/mes = $6.480.000 COP/mes
            </li>
            <li>
              <strong>Con bot de WhatsApp:</strong> ~$120.000 COP/mes +
              comision pasarela (~3%) = ~$840.000 COP/mes
            </li>
            <li>
              <strong>Ahorro potencial:</strong> ~$5.600.000 COP/mes
            </li>
          </ul>
          <p>
            Incluso si solo migras el 30% de tus pedidos recurrentes a
            WhatsApp, el ahorro ya supera el millon y medio mensual.
          </p>

          <h2>Como empezar paso a paso</h2>
          <ol>
            <li>
              <strong>Identifica clientes repetidores:</strong> los que piden
              cada semana por Rappi y que ya te conocen.
            </li>
            <li>
              <strong>Mete un flyer en cada domicilio:</strong> &quot;Pide
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

          <p><strong>¿Funciona con Nequi y Daviplata?</strong></p>
          <p>
            Si. YaComanda se integra con pasarelas de pago colombianas.
            Tambien puedes ofrecer pago contra entrega o transferencia PSE.
          </p>

          <p><strong>¿Necesito un numero de telefono aparte?</strong></p>
          <p>
            Para la API de WhatsApp Business necesitas un numero que no este
            registrado en WhatsApp regular. Puede ser una linea nueva.
            YaComanda te guia en todo el proceso.
          </p>

          <p><strong>¿Puedo usarlo en ciudades pequenas?</strong></p>
          <p>
            Absolutamente. De hecho, en ciudades donde Rappi no tiene tanta
            presencia (Bucaramanga, Pereira, Manizales), WhatsApp es el
            canal principal de pedidos. Un bot le da a tu restaurante el
            mismo nivel de automatizacion que las grandes cadenas.
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

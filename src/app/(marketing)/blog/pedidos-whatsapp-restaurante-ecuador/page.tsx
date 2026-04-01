import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Como recibir pedidos por WhatsApp en tu restaurante en Ecuador (2026) — YaComanda",
  description:
    "Guia completa para restaurantes ecuatorianos que quieren automatizar pedidos por WhatsApp. Desde lo manual hasta bots con IA que cobran con transferencia, Deuna y PayPhone.",
  keywords: [
    "pedidos whatsapp restaurante ecuador",
    "whatsapp restaurante quito",
    "whatsapp restaurante guayaquil",
    "pedidos online ecuador restaurante",
    "delivery whatsapp ecuador",
    "bot whatsapp restaurante ecuador",
    "alternativa pedidosya ecuador",
  ],
  openGraph: {
    title:
      "Como recibir pedidos por WhatsApp en tu restaurante en Ecuador (2026)",
    description:
      "Guia paso a paso para restaurantes ecuatorianos: automatiza pedidos por WhatsApp y deja de depender de plataformas con comisiones altas.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Como recibir pedidos por WhatsApp en tu restaurante en Ecuador"
      description="Guia completa para restaurantes ecuatorianos que quieren automatizar pedidos por WhatsApp."
      slug="pedidos-whatsapp-restaurante-ecuador"
      datePublished="2026-04-01"
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
          <span className="text-slate-400">1 abril 2026</span>
          <span className="text-slate-400">8 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Como recibir pedidos por WhatsApp en tu restaurante en Ecuador
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Ecuador es uno de los paises con mayor penetracion de WhatsApp en
          Latinoamerica: mas del 85% de los ecuatorianos con smartphone lo
          usan todos los dias. El mercado de delivery crecio de forma
          explosiva durante la pandemia y no ha parado. Tus clientes ya te
          buscan por WhatsApp. El problema es que la mayoria de restaurantes
          todavia gestionan esos mensajes a mano, perdiendo pedidos y
          cometiendo errores. Esta guia te muestra como cambiar eso.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>El panorama del delivery en Ecuador en 2026</h2>
          <p>
            Despues de la pandemia, el delivery se convirtio en parte de la
            rutina de millones de ecuatorianos. PedidosYa domina el mercado
            como la plataforma principal, Uber Eats mantiene presencia en
            Quito y Guayaquil, y Rappi salio del pais en 2023. Esto deja a
            los restaurantes con pocas opciones de plataforma — y las que
            quedan cobran comisiones que se comen tu margen.
          </p>
          <p>
            Mientras tanto, WhatsApp se ha convertido en el canal de
            comunicacion numero uno del pais. No solo para chatear: los
            ecuatorianos ya lo usan para hacer compras, coordinar servicios
            y, cada vez mas, para pedir comida. La oportunidad esta ahi.
          </p>

          <h2>El problema de las comisiones en Ecuador</h2>
          <p>
            Un restaurante en Quito o Guayaquil que trabaja con plataformas
            de delivery enfrenta comisiones del 25% al 30% por cada pedido.
            Hagamos los numeros:
          </p>
          <ul>
            <li>Ticket promedio: $12 USD</li>
            <li>Comision plataforma (27%): $3.24 por pedido</li>
            <li>20 pedidos diarios: $64.80 USD/dia en comisiones</li>
            <li>Al mes: $1.944 USD solo en comisiones</li>
            <li>Al ano: mas de $23.000 USD</li>
          </ul>
          <p>
            Para un restaurante pequeno o mediano en Ecuador, eso es una
            fortuna. Y gran parte de esos pedidos vienen de clientes que ya
            te conocen — te buscan por nombre en la app. Esas ventas
            podrian ser directas, sin intermediarios.
          </p>

          <h2>Como la mayoria de restaurantes usan WhatsApp hoy</h2>
          <p>
            Si tienes un restaurante en Ecuador, probablemente ya recibes
            mensajes como &quot;Hola, tienen menu del dia?&quot; o &quot;Me
            mandan una encebollado y dos jugos?&quot;. La realidad es que
            la mayoria de restaurantes gestionan esto de forma
            completamente manual:
          </p>
          <ul>
            <li>El cliente escribe al WhatsApp del restaurante</li>
            <li>Alguien lee el mensaje, anota el pedido en papel o lo grita a cocina</li>
            <li>Le pregunta la direccion al cliente</li>
            <li>Calcula el total a mano</li>
            <li>Coordina el pago por transferencia o efectivo</li>
            <li>Confirma cuando el pedido esta listo</li>
          </ul>
          <p>
            Esto funciona con 5 o 6 pedidos al dia. Pero cuando creces,
            empiezan los errores: pedidos olvidados, totales mal calculados,
            mensajes sin responder y clientes que se van a otro lado.
          </p>

          <h2>Paso 1: Configura WhatsApp Business correctamente</h2>
          <p>
            Antes de automatizar, necesitas tener bien configurado lo basico.
            WhatsApp Business es gratuito y te da herramientas esenciales:
          </p>
          <ol>
            <li>
              <strong>Descarga WhatsApp Business</strong> (no el WhatsApp
              normal) desde la tienda de tu telefono. Usa un numero dedicado
              para el restaurante.
            </li>
            <li>
              <strong>Completa tu perfil de empresa:</strong> nombre del
              restaurante, direccion, horario de atencion, sitio web y una
              foto de perfil profesional.
            </li>
            <li>
              <strong>Sube tu carta al catalogo:</strong> WhatsApp Business
              te permite crear un catalogo con fotos, nombres y precios de
              tus platos. Es como un mini menu digital dentro del chat.
            </li>
            <li>
              <strong>Configura mensajes automaticos:</strong> mensaje de
              bienvenida cuando alguien te escribe por primera vez, y
              mensaje de ausencia fuera de horario.
            </li>
            <li>
              <strong>Crea respuestas rapidas:</strong> atajos para mensajes
              frecuentes como tu menu del dia, horarios o metodos de pago
              aceptados.
            </li>
            <li>
              <strong>Usa etiquetas:</strong> organiza tus chats con
              etiquetas como &quot;Pedido nuevo&quot;, &quot;En
              preparacion&quot;, &quot;Entregado&quot; y &quot;Pago
              pendiente&quot;.
            </li>
          </ol>
          <p>
            Con esto ya tienes un canal profesional. Pero sigues dependiendo
            de que alguien este respondiendo manualmente cada mensaje.
          </p>

          <h2>Paso 2: Integra los metodos de pago que usan tus clientes</h2>
          <p>
            Ecuador tiene un ecosistema de pagos digitales en crecimiento.
            Los metodos mas usados para pedidos por WhatsApp son:
          </p>
          <ul>
            <li>
              <strong>Transferencia bancaria:</strong> sigue siendo el
              metodo mas comun. El cliente transfiere desde su banco (Banco
              Pichincha, Banco del Pacifico, Produbanco, etc.) y te envia
              el comprobante por WhatsApp.
            </li>
            <li>
              <strong>Deuna:</strong> billetera digital que esta creciendo
              rapido en Ecuador. Permite pagos instantaneos con codigo QR o
              link de pago.
            </li>
            <li>
              <strong>PayPhone:</strong> plataforma ecuatoriana de pagos
              moviles. Puedes generar links de cobro y recibir pagos con
              tarjeta directamente desde WhatsApp.
            </li>
            <li>
              <strong>Efectivo contra entrega:</strong> todavia importante
              en Ecuador, especialmente fuera de Quito y Guayaquil. Muchos
              clientes prefieren pagar cuando reciben su comida.
            </li>
          </ul>
          <p>
            La clave es ofrecer al menos dos opciones: una digital
            (transferencia o Deuna) y efectivo. Asi no pierdes a ningun
            cliente.
          </p>

          <h2>Paso 3: Automatiza con un bot de WhatsApp con IA</h2>
          <p>
            Aqui es donde el juego cambia por completo. En lugar de que tu
            o un empleado responda cada mensaje, un bot con inteligencia
            artificial se encarga de todo el proceso:
          </p>
          <ul>
            <li>
              El cliente escribe: &quot;quiero un encebollado de albacora y
              un jugo de naranja&quot;
            </li>
            <li>
              El bot entiende el pedido, incluso con errores de escritura o
              variaciones naturales del lenguaje
            </li>
            <li>Confirma los items, muestra el total y pregunta la direccion</li>
            <li>Envia un link de pago o acepta transferencia</li>
            <li>Manda la comanda directamente a la pantalla de cocina</li>
            <li>Notifica al cliente cuando el pedido esta en camino</li>
            <li>Guarda el historial para que el cliente pueda repetir su pedido facilmente</li>
          </ul>
          <p>
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            es un bot de WhatsApp con IA disenado especificamente para
            restaurantes. No es un chatbot generico: entiende cartas,
            modificaciones (&quot;sin cebolla&quot;, &quot;extra
            queso&quot;), combos y horarios. Funciona 24/7, nunca se
            confunde y responde en segundos.
          </p>

          <h2>Cuanto te ahorras: numeros reales para Ecuador</h2>
          <p>
            Restaurante en Quito, 20 pedidos/dia, ticket promedio $12 USD:
          </p>
          <ul>
            <li>
              <strong>Con PedidosYa (27% comision):</strong> $3.24/pedido x
              600 pedidos/mes = $1.944 USD/mes
            </li>
            <li>
              <strong>Con bot de WhatsApp (YaComanda):</strong> $29 USD/mes
              + comision pasarela (~3.5%) = ~$281 USD/mes
            </li>
            <li>
              <strong>Ahorro potencial:</strong> ~$1.663 USD/mes
            </li>
          </ul>
          <p>
            Eso es casi $20.000 USD al ano. Incluso si solo migras un
            tercio de tus pedidos recurrentes a WhatsApp, el ahorro ya
            supera los $500 USD mensuales — y el bot se paga solo desde la
            primera semana.
          </p>
          <p>
            Ademas, $29 USD/mes es un costo fijo predecible. No importa si
            un mes vendes mas — la tarifa no sube con tus ventas como pasa
            con las comisiones de plataformas.
          </p>

          <h2>Funciona en todo Ecuador</h2>
          <p>
            YaComanda no esta limitado a las ciudades grandes. Funciona en
            cualquier ciudad donde tus clientes usen WhatsApp:
          </p>
          <ul>
            <li>
              <strong>Quito:</strong> la ciudad con mayor volumen de
              delivery. Alta competencia con plataformas, pero tambien alta
              disposicion del cliente a pedir directo si el proceso es
              facil.
            </li>
            <li>
              <strong>Guayaquil:</strong> segundo mercado de delivery.
              Muchos restaurantes ya reciben pedidos por WhatsApp de forma
              informal.
            </li>
            <li>
              <strong>Cuenca:</strong> ciudad con fuerte identidad
              gastronomica. Los restaurantes locales tienen clientes fieles
              que prefieren el trato directo.
            </li>
            <li>
              <strong>Ambato, Manta, Loja, Riobamba:</strong> en ciudades
              donde las plataformas de delivery tienen poca o ninguna
              presencia, WhatsApp es el unico canal digital de pedidos. Un
              bot te da la misma tecnologia que usan las grandes cadenas.
            </li>
          </ul>

          <h2>Como empezar paso a paso</h2>
          <ol>
            <li>
              <strong>Identifica tus clientes recurrentes:</strong> los que
              ya te conocen y piden cada semana por plataforma o por
              WhatsApp. Ellos son los primeros que puedes migrar.
            </li>
            <li>
              <strong>Incluye un flyer en cada pedido:</strong> &quot;Pide
              directo por WhatsApp y ahorra un 10%&quot; con tu numero y un
              codigo QR. Es la tactica mas efectiva.
            </li>
            <li>
              <strong>Configura tu bot:</strong> sube tu carta, conecta tu
              numero de WhatsApp Business API y elige tus metodos de pago.
              Con YaComanda son 15 minutos de configuracion.
            </li>
            <li>
              <strong>Pon tu numero en Google Maps:</strong> muchos clientes
              nuevos te descubren ahi. Si ven un numero de WhatsApp,
              escriben directo en vez de buscar en una app de delivery.
            </li>
            <li>
              <strong>Publica en redes sociales:</strong> comparte tu numero
              de WhatsApp en Facebook e Instagram con el mensaje de que
              pueden pedir directo y recibir descuento.
            </li>
          </ol>

          <h2>Preguntas frecuentes</h2>

          <p><strong>¿Funciona con transferencia bancaria y Deuna?</strong></p>
          <p>
            Si. YaComanda se integra con pasarelas de pago y tambien soporta
            flujos de transferencia bancaria donde el cliente envia el
            comprobante. Tambien puedes ofrecer pago en efectivo contra
            entrega.
          </p>

          <p><strong>¿Necesito un numero de telefono aparte?</strong></p>
          <p>
            Para la API de WhatsApp Business necesitas un numero que no este
            registrado en WhatsApp regular. Puede ser una linea nueva de
            Claro, Movistar o CNT. YaComanda te guia en todo el proceso de
            configuracion.
          </p>

          <p><strong>¿Puedo seguir usando PedidosYa al mismo tiempo?</strong></p>
          <p>
            Si, de hecho es lo recomendado. No tienes que dejar las
            plataformas de un dia para otro. Empieza migrando tus clientes
            recurrentes a WhatsApp y reduce gradualmente tu dependencia de
            plataformas con comisiones altas.
          </p>

          <p><strong>¿Funciona para todo tipo de restaurante?</strong></p>
          <p>
            Si. Ya sea que tengas una cevicheria en Guayaquil, una
            pizzeria en Quito, un restaurante de almuerzos en Cuenca o un
            food truck en Ambato, YaComanda se adapta a tu carta y tu
            forma de trabajar.
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

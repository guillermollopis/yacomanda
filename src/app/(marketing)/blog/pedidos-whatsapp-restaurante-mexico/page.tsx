import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Como recibir pedidos por WhatsApp en tu restaurante en Mexico (2026) — YaComanda",
  description:
    "Guia completa para restaurantes mexicanos que quieren automatizar pedidos por WhatsApp. Desde la opcion manual hasta bots con IA que cobran con Mercado Pago.",
  keywords: [
    "pedidos whatsapp restaurante mexico",
    "bot whatsapp restaurante mexico",
    "pedidos online restaurante mexico",
    "alternativa rappi mexico",
    "delivery sin comisiones mexico",
    "whatsapp business restaurante",
    "automatizar pedidos restaurante",
  ],
  openGraph: {
    title:
      "Como recibir pedidos por WhatsApp en tu restaurante en Mexico (2026)",
    description:
      "Guia paso a paso para restaurantes mexicanos: automatiza pedidos por WhatsApp y deja de depender de Rappi y Uber Eats.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Como recibir pedidos por WhatsApp en tu restaurante en Mexico"
      description="Guia completa para restaurantes mexicanos que quieren automatizar pedidos por WhatsApp."
      slug="pedidos-whatsapp-restaurante-mexico"
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
          Como recibir pedidos por WhatsApp en tu restaurante en Mexico
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Mexico tiene mas de 80 millones de usuarios de WhatsApp. Tus
          clientes ya lo usan para preguntarte el horario, ver el menu y
          hacer pedidos. El problema es que gestionar todo eso manualmente
          no escala. Aqui te explico como automatizarlo paso a paso.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>La realidad del delivery en Mexico</h2>
          <p>
            Si tienes un restaurante en Mexico, probablemente ya estas en
            Rappi, Uber Eats o Didi Food. Y probablemente ya sabes lo que
            cuesta: entre el 20% y el 35% de comision por cada pedido. En
            un negocio donde los margenes son del 10-15%, eso no es
            sostenible.
          </p>
          <p>
            Pero hay un dato que muchos ignoran: una buena parte de tus
            pedidos de delivery vienen de clientes que ya te conocen. Te
            buscan por nombre en Rappi. Esos clientes podrian pedirte
            directamente por WhatsApp — y tu te ahorras la comision.
          </p>

          <h2>Opcion 1: WhatsApp Business (gratis, manual)</h2>
          <p>
            Lo basico. Configuras un perfil de WhatsApp Business con tu
            carta en el catalogo, tu horario y respuestas rapidas.
          </p>
          <ul>
            <li>Sube tu carta al catalogo de WhatsApp Business</li>
            <li>Configura mensajes de bienvenida y fuera de horario</li>
            <li>Usa etiquetas para organizar pedidos (nuevo, en preparacion, entregado)</li>
            <li>Crea respuestas rapidas para preguntas frecuentes</li>
          </ul>
          <p>
            <strong>Limitacion:</strong> todo es manual. Tu o alguien de tu
            equipo tiene que leer cada mensaje, confirmar el pedido, calcular
            el total y coordinar el cobro. Funciona con 5-8 pedidos al dia,
            pero despues se vuelve un caos.
          </p>

          <h2>Opcion 2: WhatsApp + link de Mercado Pago</h2>
          <p>
            Un paso arriba: sigues gestionando los pedidos manualmente, pero
            para el cobro envias un link de Mercado Pago. El cliente paga en
            linea y tu recibes la confirmacion.
          </p>
          <ul>
            <li>Creas un link de pago por cada pedido desde Mercado Pago</li>
            <li>El cliente paga con tarjeta, transferencia o saldo</li>
            <li>La comision es del 3.6% + IVA (mucho menos que Rappi)</li>
          </ul>
          <p>
            <strong>Limitacion:</strong> sigue siendo manual. Crear un link de
            pago por cada pedido toma tiempo. Y no tienes un registro
            automatico de pedidos ni datos del cliente.
          </p>

          <h2>Opcion 3: Bot de WhatsApp con IA (automatico)</h2>
          <p>
            La opcion mas avanzada: un bot que entiende los mensajes de tus
            clientes con inteligencia artificial, arma el pedido, confirma,
            cobra y manda la comanda a tu cocina. Todo sin que tu hagas nada.
          </p>
          <ul>
            <li>El cliente escribe &quot;quiero 2 tacos al pastor y una horchata&quot;</li>
            <li>El bot entiende, confirma el pedido y el total</li>
            <li>Envia un link de pago integrado</li>
            <li>Manda la comanda a la pantalla de cocina automaticamente</li>
            <li>Guarda los datos del cliente para futuras promociones</li>
          </ul>
          <p>
            Herramientas como{" "}
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            estan disenadas exactamente para esto. Tarifa plana desde $29
            USD/mes, sin comision por pedido.
          </p>

          <h2>Numeros reales: cuanto te ahorras</h2>
          <p>
            Supongamos que tu restaurante recibe 20 pedidos al dia con un
            ticket promedio de $180 MXN:
          </p>
          <ul>
            <li>
              <strong>Con Rappi (25% comision):</strong> pagas $900 MXN/dia =
              $27,000 MXN/mes en comisiones
            </li>
            <li>
              <strong>Con bot de WhatsApp ($29 USD/mes):</strong> pagas
              ~$500 MXN/mes + comision de pasarela (~3.6%)
            </li>
            <li>
              <strong>Ahorro mensual:</strong> mas de $20,000 MXN
            </li>
          </ul>
          <p>
            Obviamente, no todos los pedidos de Rappi se van a mover a
            WhatsApp de un dia para otro. Pero si logras migrar el 30-40%
            de tus pedidos recurrentes, el ahorro ya paga la herramienta
            varias veces.
          </p>

          <h2>Como empezar hoy</h2>
          <ol>
            <li>
              <strong>Identifica tus clientes recurrentes:</strong> los que
              piden cada semana son los primeros candidatos a migrar a
              WhatsApp.
            </li>
            <li>
              <strong>Agrega un flyer en tus entregas:</strong> &quot;Pide
              directo por WhatsApp y ahorra&quot; con tu numero y un QR.
            </li>
            <li>
              <strong>Configura el bot:</strong> sube tu carta, conecta tu
              WhatsApp Business y tu pasarela de pago. Con YaComanda toma
              unos 15 minutos.
            </li>
            <li>
              <strong>Ofrece un incentivo:</strong> 10% de descuento en el
              primer pedido directo para motivar el cambio.
            </li>
          </ol>

          <h2>Preguntas frecuentes</h2>

          <p><strong>¿Necesito WhatsApp Business API?</strong></p>
          <p>
            Si quieres un bot automatizado, si. La API de WhatsApp Business
            permite que un sistema responda por ti. YaComanda te ayuda con
            toda la configuracion.
          </p>

          <p><strong>¿Funciona con pago contra entrega?</strong></p>
          <p>
            Si. Puedes configurar pago en linea, contra entrega o ambos. El
            bot confirma el metodo de pago con el cliente.
          </p>

          <p><strong>¿Que pasa si el cliente escribe algo que el bot no entiende?</strong></p>
          <p>
            Los bots con IA como YaComanda entienden lenguaje natural. Si
            algo es ambiguo, el bot pregunta para confirmar. Y siempre puedes
            tomar el control manualmente.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Automatiza tus pedidos por WhatsApp
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

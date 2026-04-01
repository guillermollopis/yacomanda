import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, X, Minus } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Como vender comida por WhatsApp: guia completa para restaurantes en 2026 — YaComanda",
  description:
    "Aprende a vender comida por WhatsApp paso a paso. 3 niveles: manual, WhatsApp Business y bot automatizado. Pagos, consejos y errores comunes.",
  keywords: [
    "vender comida por whatsapp",
    "como vender comida por whatsapp",
    "pedidos de comida por whatsapp",
    "negocio de comida por whatsapp",
    "venta de comida whatsapp",
    "vender comida online whatsapp",
    "restaurante pedidos whatsapp",
  ],
  openGraph: {
    title: "Como vender comida por WhatsApp: guia completa (2026)",
    description:
      "3 niveles para vender comida por WhatsApp: manual, Business y bot automatizado. Paso a paso con pagos, tips y errores comunes.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Como vender comida por WhatsApp: guia completa para restaurantes en 2026"
      description="Aprende a vender comida por WhatsApp en 3 niveles: manual, WhatsApp Business y bot automatizado. Pagos, consejos y errores comunes."
      slug="como-vender-comida-por-whatsapp"
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
          <span className="text-slate-400">10 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Como vender comida por WhatsApp: guia completa para restaurantes en 2026
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Tus clientes ya estan en WhatsApp. Cada dia abren la app 25 veces,
          leen el 90% de los mensajes en menos de 3 minutos y — lo mas
          importante — ya saben usarla. No necesitas ensenarles nada. La
          pregunta no es si deberias vender comida por WhatsApp, sino como
          hacerlo bien. En esta guia te mostramos 3 niveles para empezar,
          desde lo mas basico hasta la automatizacion completa.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>¿Por que WhatsApp es el canal #1 para vender comida?</h2>
          <p>
            Antes de meternos en el como, vale la pena entender por que
            WhatsApp le gana a cualquier otro canal para pedidos de comida:
          </p>
          <ul>
            <li>
              <strong>2 mil millones de usuarios activos.</strong> En
              Latinoamerica y Espana, WhatsApp es la app de mensajeria
              dominante. No necesitas convencer al cliente de descargar nada.
            </li>
            <li>
              <strong>Tasa de apertura del 90%+.</strong> Comparado con el
              20-30% del email y el 5% de las notificaciones push. Tu mensaje
              se lee.
            </li>
            <li>
              <strong>Conversacional.</strong> El cliente puede preguntar, pedir
              modificaciones, resolver dudas — todo en la misma ventana. No hay
              formularios frios ni carritos abandonados.
            </li>
            <li>
              <strong>Sin comisiones de plataforma.</strong> A diferencia de
              Glovo, Rappi o Uber Eats, WhatsApp no te cobra el 25-35% por
              cada pedido. El margen es tuyo.
            </li>
            <li>
              <strong>Datos propios.</strong> Cada cliente que te escribe es un
              contacto tuyo. Puedes recontactarlo, enviarle promos, fidelizarlo.
              En un marketplace, el cliente es de la plataforma.
            </li>
          </ul>

          <h2>Nivel 1: Manual (copia y pega)</h2>
          <p>
            La forma mas basica de empezar. No necesitas nada especial — solo
            tu numero de WhatsApp personal o Business y un menu en texto o
            imagen.
          </p>
          <h3>Como funciona</h3>
          <ol>
            <li>
              Crea una version de tu menu en texto plano o como imagen (foto
              de la carta o diseno en Canva).
            </li>
            <li>
              Cuando un cliente te escribe, le envias el menu manualmente.
            </li>
            <li>
              El cliente responde con lo que quiere. Tu anotas el pedido,
              confirmas direccion y forma de pago.
            </li>
            <li>
              Preparas el pedido y lo entregas o avisas que esta listo para
              recoger.
            </li>
          </ol>
          <h3>Pros</h3>
          <ul>
            <li>Coste: $0</li>
            <li>Puedes empezar hoy mismo</li>
            <li>Trato personal con cada cliente</li>
          </ul>
          <h3>Contras</h3>
          <ul>
            <li>No escala — con 20+ pedidos al dia se vuelve caotico</li>
            <li>Errores frecuentes (pedidos mal anotados, precios desactualizados)</li>
            <li>Dependes de una persona respondiendo mensajes todo el tiempo</li>
            <li>No puedes procesar pagos dentro de WhatsApp</li>
          </ul>
          <p>
            <strong>Ideal para:</strong> restaurantes que estan probando el
            canal, reciben menos de 10 pedidos al dia por WhatsApp y quieren
            validar la demanda antes de invertir.
          </p>

          <h2>Nivel 2: WhatsApp Business (catalogos + respuestas rapidas)</h2>
          <p>
            WhatsApp Business es una app gratuita disenada para negocios.
            Anade funcionalidades que el WhatsApp normal no tiene y que
            facilitan bastante la venta de comida.
          </p>
          <h3>Como configurarlo paso a paso</h3>
          <ol>
            <li>
              <strong>Descarga WhatsApp Business</strong> desde la tienda de
              apps (es gratis). Puedes usarlo con el mismo numero o con uno
              nuevo.
            </li>
            <li>
              <strong>Completa tu perfil de empresa:</strong> nombre del
              restaurante, direccion, horario, descripcion, foto de portada
              profesional y enlace a tu web o redes.
            </li>
            <li>
              <strong>Crea tu catalogo:</strong> ve a Herramientas de negocio
              &gt; Catalogo. Anade cada plato con foto, nombre, descripcion y
              precio. El cliente puede navegar tu carta dentro de WhatsApp.
            </li>
            <li>
              <strong>Configura respuestas rapidas:</strong> atajos para
              mensajes frecuentes. Por ejemplo, escribe &quot;/menu&quot; y se
              envia automaticamente tu saludo + enlace al catalogo.
            </li>
            <li>
              <strong>Mensaje de bienvenida automatico:</strong> cuando alguien
              te escribe por primera vez, recibe un saludo profesional con tu
              horario y como pedir.
            </li>
            <li>
              <strong>Etiquetas:</strong> organiza chats por estado (nuevo
              pedido, en preparacion, entregado, cliente frecuente).
            </li>
          </ol>
          <h3>Pros</h3>
          <ul>
            <li>Gratis</li>
            <li>Catalogo visual integrado en WhatsApp</li>
            <li>Respuestas rapidas ahorran tiempo</li>
            <li>Perfil profesional genera confianza</li>
          </ul>
          <h3>Contras</h3>
          <ul>
            <li>Sigue siendo manual — tu o alguien del equipo debe responder cada mensaje</li>
            <li>El catalogo no toma pedidos (el cliente ve la carta pero tiene que escribirte lo que quiere)</li>
            <li>No hay cobro automatico</li>
            <li>Con 30+ pedidos diarios, la persona que responde se satura</li>
          </ul>
          <p>
            <strong>Ideal para:</strong> restaurantes con 10-30 pedidos diarios
            por WhatsApp que quieren dar una imagen profesional y ahorrar
            algo de tiempo.
          </p>

          <h2>Nivel 3: Bot automatizado con IA</h2>
          <p>
            Aqui es donde la cosa cambia. Un bot de WhatsApp atiende a tus
            clientes 24/7, muestra el menu, toma el pedido completo con
            extras y modificaciones, procesa el pago y envia la comanda
            directamente a cocina. Tu no tocas nada.
          </p>
          <h3>Como funciona con YaComanda</h3>
          <ol>
            <li>
              <strong>Subes tu carta</strong> a la plataforma (15 minutos).
              Categorias, platos, extras, precios, fotos.
            </li>
            <li>
              <strong>Conectas tu WhatsApp.</strong> Se vincula tu numero
              Business con el bot.
            </li>
            <li>
              <strong>El cliente te escribe</strong> y el bot le responde al
              instante. Puede enviar texto, audio o incluso una foto de lo
              que quiere. El bot de IA lo entiende todo.
            </li>
            <li>
              <strong>Pedido completo.</strong> El bot confirma los items,
              calcula el total, pregunta direccion si es delivery y ofrece
              formas de pago.
            </li>
            <li>
              <strong>Pago automatico.</strong> El cliente paga con tarjeta,
              Mercado Pago o transferencia — sin salir de WhatsApp.
            </li>
            <li>
              <strong>Comanda a cocina.</strong> El pedido aparece en la
              pantalla de cocina de YaComanda. Sin intermediarios, sin copiar
              nada a mano.
            </li>
          </ol>
          <h3>Pros</h3>
          <ul>
            <li>Automatico 24/7 — atiende mientras duermes</li>
            <li>Cero errores de transcripcion</li>
            <li>Cobro integrado</li>
            <li>Escala sin limite (100 pedidos se gestionan igual que 10)</li>
            <li>Datos de cada cliente para remarketing y fidelizacion</li>
          </ul>
          <h3>Contras</h3>
          <ul>
            <li>Coste: desde $29 USD/mes</li>
            <li>Requiere 15-30 minutos de configuracion inicial</li>
          </ul>
          <p>
            <strong>Ideal para:</strong> restaurantes con 50+ pedidos
            semanales por WhatsApp o cualquiera que quiera dejar de responder
            mensajes manualmente.
          </p>

          <h2>Comparativa de los 3 niveles</h2>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-3 py-3 text-left font-semibold">Nivel</th>
                  <th className="px-3 py-3 text-center font-semibold">Coste</th>
                  <th className="px-3 py-3 text-center font-semibold">Toma pedidos solo</th>
                  <th className="px-3 py-3 text-center font-semibold">Cobra solo</th>
                  <th className="px-3 py-3 text-center font-semibold">Escala</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-3 font-medium">Manual</td>
                  <td className="px-3 py-3 text-center">$0</td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">WhatsApp Business</td>
                  <td className="px-3 py-3 text-center">$0</td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                  <td className="px-3 py-3 text-center"><Minus className="mx-auto size-4 text-amber-500" /></td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-3 py-3 font-bold text-green-700">Bot con IA</td>
                  <td className="px-3 py-3 text-center font-semibold text-green-700">$29/mes</td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-600" /></td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-600" /></td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-600" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Como cobrar los pedidos por WhatsApp</h2>
          <p>
            Uno de los mayores retos de vender comida por WhatsApp es el
            cobro. Estas son las opciones mas comunes segun tu pais:
          </p>
          <ul>
            <li>
              <strong>Efectivo contra entrega.</strong> La opcion mas simple.
              El repartidor cobra al entregar. Funciona, pero complica el
              control de caja y aumenta el riesgo de pedidos falsos.
            </li>
            <li>
              <strong>Transferencia bancaria.</strong> El cliente transfiere
              antes de que prepares el pedido. Seguro pero lento: tienes que
              verificar cada transferencia manualmente.
            </li>
            <li>
              <strong>Mercado Pago (Argentina, Mexico, Colombia, Chile, Uruguay).</strong> Generas
              un link de pago y lo envias por WhatsApp. El cliente paga con
              tarjeta, saldo de Mercado Pago o PSE. Comision: 3-5%.
            </li>
            <li>
              <strong>Nequi / Daviplata (Colombia).</strong> El cliente envia
              el dinero a tu numero. Rapido y popular, pero manual.
            </li>
            <li>
              <strong>Link de pago con tarjeta.</strong> Si usas un bot como
              YaComanda, el cobro con tarjeta se integra directamente en la
              conversacion. El cliente paga sin salir de WhatsApp.
            </li>
          </ul>
          <p>
            <strong>Consejo:</strong> ofrece al menos 2 formas de pago. Hay
            clientes que solo pagan en efectivo y otros que solo quieren
            pagar con tarjeta. Si limitas las opciones, pierdes ventas.
          </p>

          <h2>7 tips para vender mas comida por WhatsApp</h2>
          <ol>
            <li>
              <strong>Perfil profesional.</strong> Usa WhatsApp Business con
              foto de portada, horario, direccion y descripcion completa. Un
              perfil vacio genera desconfianza.
            </li>
            <li>
              <strong>Fotos de calidad.</strong> Los platos con fotos se
              venden 3 veces mas que los que solo tienen texto. No necesitas
              un fotografo — buena luz natural y un fondo limpio bastan.
            </li>
            <li>
              <strong>Responde rapido.</strong> El 60% de los clientes elige
              al restaurante que responde primero. Si tardas 20 minutos,
              piden a otro. Un bot responde en 2 segundos.
            </li>
            <li>
              <strong>Menu actualizado.</strong> Nada frustra mas que pedir
              algo y que te digan que no esta disponible. Actualiza precios y
              disponibilidad a diario.
            </li>
            <li>
              <strong>Promociones exclusivas.</strong> Ofrece descuentos solo
              por WhatsApp: &quot;10% de descuento si pides por aqui&quot;.
              Asi motivas al cliente a usar tu canal directo en vez del
              marketplace.
            </li>
            <li>
              <strong>Listas de difusion.</strong> Envia tu menu del dia o
              promos semanales a clientes que ya te han comprado. Sin spam —
              una vez por semana maximo.
            </li>
            <li>
              <strong>Link directo en redes.</strong> Pon tu link de WhatsApp
              (wa.me/tu-numero) en Instagram, Facebook, Google Maps y tu web.
              Que pedir sea un solo clic.
            </li>
          </ol>

          <h2>5 errores comunes al vender comida por WhatsApp</h2>
          <ol>
            <li>
              <strong>No confirmar el pedido.</strong> Siempre envia un
              resumen con items, total y tiempo estimado antes de preparar.
              Evita malentendidos y cancelaciones.
            </li>
            <li>
              <strong>Usar un numero personal.</strong> Mezclar mensajes del
              restaurante con tu WhatsApp personal es receta para el
              desastre. Usa un numero exclusivo.
            </li>
            <li>
              <strong>No tener horario claro.</strong> Si no dices tu horario,
              recibiras mensajes a las 2 AM y clientes frustrados porque no
              respondes. Configura el mensaje de ausencia.
            </li>
            <li>
              <strong>Copiar el menu de otro restaurante.</strong> Tu menu en
              WhatsApp debe tener tus precios, tus fotos y tu estilo. Un PDF
              generico no vende.
            </li>
            <li>
              <strong>No migrar a un bot cuando creces.</strong> Si recibes
              mas de 50 pedidos por semana y sigues respondiendo a mano,
              estas perdiendo ventas y quemando a tu equipo. Es el momento de
              automatizar.
            </li>
          </ol>

          <h2>¿Cuando pasar de manual a bot automatico?</h2>
          <p>
            La regla practica es simple: si recibes mas de 50 pedidos por
            semana por WhatsApp (unos 7-8 al dia), la gestion manual ya te
            esta costando mas de lo que cuesta un bot.
          </p>
          <p>
            Piensa en el tiempo: cada pedido manual toma 5-10 minutos de ida
            y vuelta (saludo, enviar menu, aclarar dudas, anotar pedido,
            confirmar pago). Con 50 pedidos semanales son 4-8 horas solo
            respondiendo WhatsApp. Eso es una persona a medio tiempo.
          </p>
          <p>
            Un bot como{" "}
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            cuesta $29/mes y gestiona todos esos pedidos en automatico.
            Responde al instante, no comete errores, no necesita descanso y
            cobra solo. La matematica es clara.
          </p>

          <h2>Resumen: tu plan de accion</h2>
          <ol>
            <li>
              <strong>Hoy:</strong> instala WhatsApp Business, completa tu
              perfil y sube tu catalogo. Empieza a recibir pedidos.
            </li>
            <li>
              <strong>Semana 1-2:</strong> configura respuestas rapidas,
              mensaje de bienvenida y etiquetas. Pon tu link de WhatsApp en
              todas partes.
            </li>
            <li>
              <strong>Cuando superes 50 pedidos/semana:</strong> activa un
              bot como YaComanda. Automatiza pedidos, cobros y comandas a
              cocina. Deja de responder mensajes y enfocate en cocinar.
            </li>
          </ol>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Automatiza tus pedidos de WhatsApp hoy
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            30 dias gratis. Sin tarjeta. Tu bot listo en 15 minutos.
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

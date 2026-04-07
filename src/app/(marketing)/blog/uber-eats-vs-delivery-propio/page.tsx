import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, X, Minus } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Uber Eats vs delivery propio: que le conviene mas a tu restaurante en 2026 — YaComanda",
  description:
    "Comparativa completa entre Uber Eats y delivery propio para restaurantes. Numeros reales: 35.652 euros/ano de diferencia. Descubre que modelo te conviene.",
  keywords: [
    "uber eats vs delivery propio",
    "uber eats comisiones",
    "delivery propio restaurante",
    "alternativa uber eats",
    "comisiones uber eats restaurante",
    "delivery sin comisiones",
    "pedido directo restaurante",
  ],
  openGraph: {
    title: "Uber Eats vs delivery propio: que le conviene mas a tu restaurante (2026)",
    description:
      "Comparativa con numeros reales. Un restaurante con 500 pedidos/mes puede ahorrar 35.652 euros/ano con delivery propio.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Uber Eats vs delivery propio: que le conviene mas a tu restaurante en 2026"
      description="Comparativa completa entre Uber Eats y delivery propio. Numeros reales, tabla comparativa y estrategia hibrida para restaurantes."
      slug="uber-eats-vs-delivery-propio"
      datePublished="2026-04-02"
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
          <span className="text-slate-400">2 abril 2026</span>
          <span className="text-slate-400">10 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Uber Eats vs delivery propio: que le conviene mas a tu restaurante en 2026
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Uber Eats te da visibilidad. Eso nadie lo discute. Pero, ¿a que
          precio? Cuando un 60-70% de tus pedidos vienen de clientes que ya
          te conocen, cada comision del 30% es dinero que sale de tu bolsillo
          sin necesidad. Vamos a poner numeros reales sobre la mesa y
          comparar los dos modelos: plataforma de delivery vs canal propio.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">

          {/* ── SECTION 1: EL MODELO UBER EATS ── */}
          <h2>Como funciona el modelo Uber Eats (y cuanto te cuesta realmente)</h2>
          <p>
            Uber Eats cobra entre el <strong>25% y el 30%</strong> de comision
            por cada pedido. Eso incluye la plataforma, el procesamiento de
            pago y, en teoria, la visibilidad ante nuevos clientes. Pero hay
            mas costes escondidos:
          </p>
          <ul>
            <li>
              <strong>Comision base:</strong> 30% en la mayoria de mercados
              (puede bajar al 15% si el restaurante gestiona su propio reparto,
              pero entonces pierdes la logistica que es uno de los principales
              atractivos).
            </li>
            <li>
              <strong>Promociones y anuncios:</strong> Uber Eats te invita
              constantemente a pagar campanas promocionales dentro de la app.
              Si no pagas, tu restaurante baja en el ranking.
            </li>
            <li>
              <strong>Inflacion de precios:</strong> para compensar la comision,
              muchos restaurantes suben los precios un 20-30% en la app. El
              cliente lo nota y se queja. Pierdes competitividad.
            </li>
            <li>
              <strong>Sin datos del cliente:</strong> Uber Eats no te comparte
              el email ni el telefono del cliente. No puedes enviar promociones,
              no puedes fidelizar, no puedes comunicarte directamente.
            </li>
          </ul>

          <h3>La trampa de la visibilidad</h3>
          <p>
            Uber Eats te vende visibilidad ante clientes nuevos. Y es real:
            hay gente que busca &quot;comida japonesa cerca&quot; y te
            descubre. El problema es que <strong>la mayoria de tus pedidos
            no vienen de esos clientes nuevos</strong>. Vienen de gente que
            ya te conoce y simplemente usa la app porque es comoda.
          </p>
          <p>
            Estas pagando un 30% de comision por clientes que ya son tuyos.
            Es como pagar a un taxista cada vez que tu mejor amigo viene a
            cenar a tu casa.
          </p>

          {/* ── SECTION 2: EL MODELO DELIVERY PROPIO ── */}
          <h2>El modelo de delivery propio: que significa y como funciona</h2>
          <p>
            Delivery propio no significa que tengas que contratar repartidores
            ni montar una app. Significa que <strong>el cliente te contacta
            directamente</strong> — por WhatsApp, por tu web, por telefono —
            y tu gestionas el pedido sin intermediarios.
          </p>
          <p>Las ventajas son claras:</p>
          <ul>
            <li>
              <strong>Te quedas el 100% del margen.</strong> No hay comision
              por pedido. Solo el coste de la herramienta que uses (si es que
              usas alguna).
            </li>
            <li>
              <strong>Tienes los datos del cliente.</strong> Su nombre, su
              telefono, su historial de pedidos. Puedes enviar promociones,
              ofrecer descuentos a clientes frecuentes, felicitar cumpleanos.
            </li>
            <li>
              <strong>Controlas tu marca.</strong> Los precios los decides tu.
              La experiencia del cliente la decides tu. No hay competidores
              al lado en un listado.
            </li>
            <li>
              <strong>Construyes un activo.</strong> Tu lista de clientes
              crece con cada pedido. Con Uber Eats, cada pedido desaparece
              en su sistema.
            </li>
          </ul>

          <h3>Canales para delivery propio</h3>
          <p>Tienes varias opciones, segun tu volumen y tus ganas de tecnologia:</p>
          <ul>
            <li>
              <strong>WhatsApp Business (manual):</strong> gratis, pero no
              escala. A partir de 10-15 pedidos/dia se vuelve caotico.
            </li>
            <li>
              <strong>Bot de WhatsApp con IA:</strong> automatiza pedidos
              24/7. El cliente manda un mensaje, el bot le muestra la carta,
              toma el pedido, cobra y lo envia a cocina. Herramientas como{" "}
              <Link href="/">YaComanda</Link> lo hacen por una{" "}
              <strong>cuota fija desde 29 euros/mes</strong>, sin comision por pedido.
            </li>
            <li>
              <strong>Web de pedidos:</strong> pagina propia donde el cliente
              elige y paga. Funciona, pero tiene mas friccion (el cliente
              tiene que recordar tu URL).
            </li>
            <li>
              <strong>Telefono:</strong> el clasico. Sin coste, pero ocupa
              tiempo del personal y genera errores.
            </li>
          </ul>
          <p>
            Si quieres profundizar en como vender por WhatsApp, tenemos una{" "}
            <Link href="/blog/como-vender-comida-por-whatsapp">
              guia completa sobre como vender comida por WhatsApp
            </Link>.
          </p>

          {/* ── SECTION 3: TABLA COMPARATIVA ── */}
          <h2>Comparativa lado a lado: Uber Eats vs delivery propio</h2>
        </div>

        <div className="my-8 overflow-x-auto">
          <table className="w-full rounded-lg border border-slate-200 text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Criterio</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-700">Uber Eats</th>
                <th className="px-4 py-3 text-center font-semibold text-green-700">Delivery propio (WhatsApp + YaComanda)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-4 py-3 font-medium">Comision por pedido</td>
                <td className="px-4 py-3 text-center text-red-600 font-semibold">25-30%</td>
                <td className="px-4 py-3 text-center text-green-600 font-semibold">0%</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-4 py-3 font-medium">Coste mensual</td>
                <td className="px-4 py-3 text-center">Variable (depende del volumen)</td>
                <td className="px-4 py-3 text-center">Desde 29 euros/mes (fijo)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Datos del cliente</td>
                <td className="px-4 py-3 text-center"><X className="mx-auto size-4 text-red-400" /></td>
                <td className="px-4 py-3 text-center"><Check className="mx-auto size-4 text-green-500" /></td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-4 py-3 font-medium">Control de marca y precios</td>
                <td className="px-4 py-3 text-center"><X className="mx-auto size-4 text-red-400" /></td>
                <td className="px-4 py-3 text-center"><Check className="mx-auto size-4 text-green-500" /></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Fidelizacion</td>
                <td className="px-4 py-3 text-center text-amber-500 font-medium">Limitada</td>
                <td className="px-4 py-3 text-center text-green-600 font-medium">Total</td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-4 py-3 font-medium">Tiempo de configuracion</td>
                <td className="px-4 py-3 text-center">1-2 semanas</td>
                <td className="px-4 py-3 text-center">15 minutos</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Descubrimiento (clientes nuevos)</td>
                <td className="px-4 py-3 text-center"><Check className="mx-auto size-4 text-green-500" /></td>
                <td className="px-4 py-3 text-center"><X className="mx-auto size-4 text-red-400" /></td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="px-4 py-3 font-medium">Escalabilidad</td>
                <td className="px-4 py-3 text-center text-amber-500 font-medium">Si (pero mas caro)</td>
                <td className="px-4 py-3 text-center text-green-600 font-medium">Si (mismo coste)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">

          {/* ── SECTION 4: NUMEROS REALES ── */}
          <h2>Los numeros que importan: cuanto ahorras con delivery propio</h2>
          <p>
            Vamos a comparar dos restaurantes identicos. Misma carta, mismo
            volumen, mismo ticket medio. La unica diferencia es el canal de
            pedidos.
          </p>
        </div>

        {/* Callout: Restaurante A */}
        <div className="my-6 rounded-xl border border-red-200 bg-red-50 p-6">
          <h3 className="text-lg font-bold text-red-800">Restaurante A: todo por Uber Eats</h3>
          <ul className="mt-3 space-y-1 text-sm text-red-900">
            <li><strong>500 pedidos/mes</strong> con ticket medio de 20 euros</li>
            <li>Facturacion bruta: <strong>10.000 euros/mes</strong></li>
            <li>Comision Uber Eats (30%): <strong>-3.000 euros/mes</strong></li>
            <li>Facturacion neta: <strong>7.000 euros/mes</strong></li>
            <li>Coste anual en comisiones: <strong className="text-red-700">36.000 euros</strong></li>
          </ul>
        </div>

        {/* Callout: Restaurante B */}
        <div className="my-6 rounded-xl border border-green-200 bg-green-50 p-6">
          <h3 className="text-lg font-bold text-green-800">Restaurante B: delivery propio con YaComanda</h3>
          <ul className="mt-3 space-y-1 text-sm text-green-900">
            <li><strong>500 pedidos/mes</strong> con ticket medio de 20 euros</li>
            <li>Facturacion bruta: <strong>10.000 euros/mes</strong></li>
            <li>Coste YaComanda: <strong>-29 euros/mes</strong></li>
            <li>Facturacion neta: <strong>9.971 euros/mes</strong></li>
            <li>Coste anual de la herramienta: <strong className="text-green-700">348 euros</strong></li>
          </ul>
        </div>

        {/* Callout: Diferencia */}
        <div className="my-8 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 p-8 text-center text-white">
          <p className="text-lg font-semibold text-green-100">Diferencia anual</p>
          <p className="mt-2 text-5xl font-extrabold">35.652 euros</p>
          <p className="mt-2 text-green-200">
            Es lo que se ahorra el Restaurante B cada ano. Con el mismo
            volumen y los mismos clientes.
          </p>
          <Link
            href="/calculadora-comisiones"
            className="mt-4 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-green-700 hover:bg-green-50"
          >
            Calcula tu ahorro exacto
          </Link>
        </div>

        <div className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <p>
            Incluso si solo consigues mover el 50% de tus pedidos a canal
            propio, hablamos de <strong>17.826 euros al ano</strong> de
            ahorro. Con eso puedes contratar a medio camarero, renovar la
            cocina o simplemente tener un margen que te permita dormir
            tranquilo.
          </p>
          <p>
            ¿Quieres hacer los calculos con tus numeros reales? Usa nuestra{" "}
            <Link href="/calculadora-comisiones">
              calculadora de comisiones
            </Link>{" "}
            y compara en 30 segundos.
          </p>

          {/* ── SECTION 5: ENFOQUE HIBRIDO ── */}
          <h2>La estrategia inteligente: el enfoque hibrido</h2>
          <p>
            No te estamos diciendo que borres tu perfil de Uber Eats manana.
            Las plataformas de delivery siguen siendo utiles para una cosa:{" "}
            <strong>descubrimiento</strong>. Cuando alguien nuevo busca
            &quot;pizza en mi zona&quot; y te encuentra en Uber Eats, eso
            tiene valor.
          </p>
          <p>El enfoque hibrido funciona asi:</p>
          <ol>
            <li>
              <strong>Usa Uber Eats como escaparate.</strong> Mantente en la
              plataforma para que clientes nuevos te descubran.
            </li>
            <li>
              <strong>Convierte a esos clientes en directos.</strong> Cada
              cliente que te descubre en Uber Eats deberia acabar pidiendo
              por tu canal propio la segunda vez.
            </li>
            <li>
              <strong>Reduce la dependencia progresivamente.</strong> A medida
              que tu base de clientes directos crece, tu factura de
              comisiones baja.
            </li>
          </ol>
          <p>
            El objetivo no es eliminar las plataformas. Es dejar de pagar
            comision por clientes que ya son tuyos. Eso solo es posible si
            tienes un canal directo bien montado.
          </p>

          {/* ── SECTION 6: COMO HACER LA TRANSICION ── */}
          <h2>Como empezar la transicion (paso a paso)</h2>
          <p>
            No necesitas hacerlo todo de golpe. Empieza con un paso sencillo
            y ve escalando:
          </p>
          <ol>
            <li>
              <strong>Anade tu numero de WhatsApp al packaging.</strong> En
              cada bolsa de delivery de Uber Eats, incluye una tarjeta o
              pegatina: &quot;La proxima vez, pide directo por WhatsApp y
              ahorra un 10%&quot;. Asi de simple.
            </li>
            <li>
              <strong>Configura un canal de pedido directo.</strong> Puede
              ser WhatsApp Business (gratuito) o un{" "}
              <Link href="/blog/bot-whatsapp-restaurante">
                bot de WhatsApp con IA
              </Link>{" "}
              como YaComanda si quieres automatizarlo.
            </li>
            <li>
              <strong>Ofrece un incentivo al primer pedido directo.</strong>{" "}
              Un 10% de descuento en el primer pedido por WhatsApp. Aunque
              &quot;pierdas&quot; un 10%, sigues ahorrando el 20% que pagarias
              a Uber Eats.
            </li>
            <li>
              <strong>Publica tu numero en redes sociales.</strong> Google
              Maps, Instagram, Facebook. Que todo el mundo sepa que pueden
              pedir directamente.
            </li>
            <li>
              <strong>Mide y ajusta.</strong> Despues de un mes, mira cuantos
              pedidos has movido al canal directo. Si son 50 de 500, ya estas
              ahorrando 300 euros/mes. Sigue empujando.
            </li>
          </ol>

          <p>
            Si necesitas mas ideas, revisa nuestra guia sobre{" "}
            <Link href="/blog/delivery-propio-restaurante-sin-intermediarios">
              como montar tu delivery propio sin intermediarios
            </Link>{" "}
            y la comparativa de{" "}
            <Link href="/blog/alternativas-uber-eats-sin-comisiones">
              alternativas a Uber Eats sin comisiones
            </Link>.
          </p>

          {/* ── SECTION 7: OBJECIONES COMUNES ── */}
          <h2>Pero... ¿y si pierdo pedidos?</h2>
          <p>
            Es la objecion mas comun. &quot;Si salgo de Uber Eats, pierdo
            visibilidad.&quot; Y tiene parte de razon. Por eso no
            recomendamos salir de golpe.
          </p>
          <p>
            Lo que recomendamos es dejar de pagar comision por ventas que ya
            son tuyas. El cliente que pide tu burger todos los viernes no te
            descubrio hoy en Uber Eats. Ya sabe donde estas. Solo necesita
            un canal comodo para pedirte directamente.
          </p>
          <p>
            Y WhatsApp es ese canal. No hay nada que descargar. No hay URLs
            que recordar. El cliente manda un mensaje y el bot le muestra la
            carta, toma el pedido y cobra. Mas facil que abrir la app de
            Uber Eats.
          </p>

          <h2>¿Que pasa con el reparto?</h2>
          <p>
            Esta es otra pregunta frecuente. Si no usas Uber Eats, ¿quien
            reparte? Tienes varias opciones:
          </p>
          <ul>
            <li>
              <strong>Repartidores propios:</strong> si ya tienes equipo de
              reparto, perfecto. Solo cambias el canal de entrada del pedido.
            </li>
            <li>
              <strong>Plataformas de reparto bajo demanda:</strong> servicios
              como Stuart, Lalamove o Glovo Connect te permiten pedir un
              repartidor para pedidos puntuales. Pagas por envio (3-5 euros),
              no por comision sobre el pedido.
            </li>
            <li>
              <strong>Solo recogida:</strong> muchos restaurantes ofrecen
              descuento por recogida en local. Sin coste de reparto, margen
              maximo.
            </li>
          </ul>

          <h2>El momento es ahora</h2>
          <p>
            En 2026, los restaurantes que dependen al 100% de plataformas de
            delivery estan regalando entre el 25% y el 35% de su facturacion.
            Eso no es sostenible.
          </p>
          <p>
            Los que estan creciendo son los que usan un enfoque hibrido:
            plataformas para descubrimiento, canal propio para fidelizar. Y
            la herramienta mas sencilla para canal propio es WhatsApp, que
            tus clientes ya usan todos los dias.
          </p>
          <p>
            La pregunta no es si deberias tener delivery propio. La pregunta
            es cuanto estas perdiendo cada mes por no tenerlo.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            ¿Cuanto estas pagando en comisiones cada mes?
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Introduce tus numeros y descubre cuanto podrias ahorrarte con
            delivery propio. Es gratis y tarda 30 segundos.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/calculadora-comisiones">
              <Button className="h-11 rounded-xl bg-green-500 px-8 font-semibold text-white hover:bg-green-400">
                Calcula tu ahorro
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline" className="h-11 rounded-xl px-8 font-semibold">
                Prueba YaComanda gratis
              </Button>
            </Link>
          </div>
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

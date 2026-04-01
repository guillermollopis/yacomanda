import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, X, Minus } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Como montar tu propio delivery sin depender de Glovo, Rappi ni Uber Eats — YaComanda",
  description:
    "Guia paso a paso para crear tu canal de delivery propio. Ahorra el 25-35% en comisiones y recupera el control de tus clientes. 4 opciones comparadas.",
  keywords: [
    "delivery propio restaurante",
    "como montar delivery propio",
    "delivery sin intermediarios",
    "delivery sin comisiones restaurante",
    "canal propio delivery",
    "delivery directo restaurante",
    "alternativa glovo rappi uber eats",
  ],
  openGraph: {
    title: "Como montar tu propio delivery sin intermediarios (2026)",
    description:
      "Deja de pagar 25-35% en comisiones. Guia para crear tu canal de delivery propio con 4 opciones comparadas.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Como montar tu propio delivery sin depender de Glovo, Rappi ni Uber Eats"
      description="Guia paso a paso para crear tu canal de delivery propio. Ahorra el 25-35% en comisiones con 4 opciones comparadas."
      slug="delivery-propio-restaurante-sin-intermediarios"
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
          Como montar tu propio delivery sin depender de Glovo, Rappi ni Uber Eats
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Cada pedido que recibes por Glovo, Rappi o Uber Eats te cuesta
          entre el 25% y el 35% en comisiones. En un plato de $10, la
          plataforma se queda con $2.50-3.50. Y encima, el cliente no es
          tuyo — es del marketplace. Si quieres recontactarlo, no puedes.
          En esta guia te mostramos como montar tu propio canal de delivery
          paso a paso, con 4 opciones reales y numeros concretos.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>¿Por que necesitas tu propio canal de delivery?</h2>
          <p>
            Los marketplaces resolvieron un problema real: conectar
            restaurantes con clientes que buscan comida. Pero el precio que
            cobran es brutal. Estas son las 3 razones principales para tener
            tu canal propio:
          </p>
          <ul>
            <li>
              <strong>Margen.</strong> La comision del 25-35% se come gran
              parte de tu beneficio. En muchos platos, el restaurante pierde
              dinero por cada pedido del marketplace. Con un canal propio, la
              comision es 0% o, como maximo, el 3-5% del procesador de pagos.
            </li>
            <li>
              <strong>Datos del cliente.</strong> Cuando alguien pide por
              Rappi, tu no sabes quien es. No tienes su telefono, su email
              ni su historial. Con un canal propio, cada pedido te deja un
              contacto para fidelizar: promos, descuentos por cumpleanos,
              menu del dia.
            </li>
            <li>
              <strong>Marca.</strong> En un marketplace, tu restaurante es
              uno mas en una lista de 200. Compites por precio y por posicion
              en el algoritmo. En tu canal propio, el cliente te busca a ti.
              La experiencia es tuya.
            </li>
          </ul>

          <h2>Los 4 pilares de un delivery propio</h2>
          <p>
            Para tener un delivery sin intermediarios necesitas resolver 4
            cosas:
          </p>
          <ol>
            <li>
              <strong>Sistema de pedidos:</strong> como recibe el cliente tu
              menu y como realiza el pedido.
            </li>
            <li>
              <strong>Logistica de entrega:</strong> quien lleva la comida
              del restaurante al cliente.
            </li>
            <li>
              <strong>Cobro:</strong> como pagas antes, durante o despues de
              la entrega.
            </li>
            <li>
              <strong>Marketing:</strong> como consigues que los clientes
              pidan por tu canal en vez del marketplace.
            </li>
          </ol>
          <p>
            Vamos a ver 4 opciones que resuelven estos pilares de formas
            distintas.
          </p>

          <h2>Opcion 1: WhatsApp + gestion manual</h2>
          <p>
            La forma mas simple y gratuita. El cliente te escribe por
            WhatsApp, tu le envias el menu, tomas el pedido a mano y
            coordinas la entrega con tu repartidor (o con un servicio de
            moto bajo demanda).
          </p>
          <ul>
            <li><strong>Coste:</strong> $0</li>
            <li><strong>Pros:</strong> cero inversion, empiezas hoy, control total</li>
            <li><strong>Contras:</strong> no escala. Con mas de 15-20 pedidos al dia, una persona se pasa todo el turno respondiendo WhatsApp. Errores frecuentes. Sin cobro automatico</li>
          </ul>
          <p>
            <strong>Veredicto:</strong> bueno para validar la demanda. No es
            una solucion a largo plazo si quieres crecer.
          </p>

          <h2>Opcion 2: App propia</h2>
          <p>
            Desarrollar una app movil (iOS + Android) con tu marca, tu menu,
            sistema de pedidos, pago integrado y seguimiento de entrega.
          </p>
          <ul>
            <li><strong>Coste:</strong> $5,000 - $20,000 USD de desarrollo + $500-2,000/mes de mantenimiento</li>
            <li><strong>Pros:</strong> experiencia premium, marca propia total, funcionalidades a medida</li>
            <li><strong>Contras:</strong> inversion enorme, 3-6 meses de desarrollo, necesitas convencer al cliente de descargar TU app (la tasa de descarga es bajisima — el 80% no descarga apps de restaurantes individuales). Mantenimiento continuo</li>
          </ul>
          <p>
            <strong>Veredicto:</strong> solo viable para cadenas grandes con
            presupuesto y marca reconocida. Para un restaurante independiente,
            la relacion coste-beneficio no cuadra.
          </p>

          <h2>Opcion 3: Bot de WhatsApp + repartidores propios</h2>
          <p>
            El punto medio ideal. Usas WhatsApp (que tus clientes ya tienen)
            con un bot de IA que automatiza todo el proceso de pedido y
            cobro. La entrega la haces con tus propios repartidores o con
            un servicio de moto bajo demanda.
          </p>
          <ul>
            <li><strong>Coste:</strong> desde $29 USD/mes (bot) + coste de repartidores</li>
            <li><strong>Pros:</strong> sin descargas (el cliente ya tiene WhatsApp), pedidos y cobros automaticos, escala sin limite, datos de cada cliente, comanda directa a cocina</li>
            <li><strong>Contras:</strong> necesitas gestionar la logistica de entrega (repartidores o servicio externo)</li>
          </ul>
          <p>
            Con{" "}
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>
            , el bot atiende por WhatsApp las 24 horas: muestra el menu,
            toma el pedido con extras y modificaciones, cobra con tarjeta o
            Mercado Pago, y envia la comanda a la pantalla de cocina. Tu
            solo te preocupas de cocinar y entregar.
          </p>
          <p>
            <strong>Veredicto:</strong> la mejor relacion coste-beneficio
            para restaurantes independientes. Combina la ubicuidad de
            WhatsApp con la automatizacion de un sistema profesional.
          </p>

          <h2>Opcion 4: Seguir en marketplaces pero con canal propio como principal</h2>
          <p>
            No tienes que abandonar Glovo o Rappi de golpe. La estrategia
            mas inteligente es mantener presencia en marketplaces para
            captar nuevos clientes, pero redirigir a los recurrentes a tu
            canal propio.
          </p>
          <ul>
            <li><strong>Coste:</strong> comision del marketplace + coste de tu canal propio</li>
            <li><strong>Pros:</strong> no pierdes visibilidad, transicion gradual, reduces riesgo</li>
            <li><strong>Contras:</strong> gestion doble (marketplace + canal propio) durante la transicion</li>
          </ul>
          <p>
            <strong>Veredicto:</strong> la estrategia mas realista. Usa el
            marketplace como canal de adquisicion y tu WhatsApp como canal
            de retencion.
          </p>

          <h2>Comparativa de las 4 opciones</h2>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-3 py-3 text-left font-semibold">Opcion</th>
                  <th className="px-3 py-3 text-center font-semibold">Coste</th>
                  <th className="px-3 py-3 text-center font-semibold">Escala</th>
                  <th className="px-3 py-3 text-center font-semibold">Sin descarga</th>
                  <th className="px-3 py-3 text-center font-semibold">Cobro auto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-3 font-medium">WhatsApp manual</td>
                  <td className="px-3 py-3 text-center">$0</td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-600" /></td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">App propia</td>
                  <td className="px-3 py-3 text-center">$5,000+</td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-600" /></td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-600" /></td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-3 py-3 font-bold text-green-700">Bot WhatsApp + riders</td>
                  <td className="px-3 py-3 text-center font-semibold text-green-700">$29/mes</td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-600" /></td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-600" /></td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-600" /></td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Marketplace + canal propio</td>
                  <td className="px-3 py-3 text-center">25-35% + $29/mes</td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-600" /></td>
                  <td className="px-3 py-3 text-center"><Minus className="mx-auto size-4 text-amber-500" /></td>
                  <td className="px-3 py-3 text-center"><Minus className="mx-auto size-4 text-amber-500" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Como migrar clientes de Rappi/Glovo a tu WhatsApp</h2>
          <p>
            Esta es la parte mas importante y la que mas restaurantes ignoran.
            No basta con tener un canal propio — necesitas que los clientes
            lo usen. Aqui van 6 tacticas probadas:
          </p>
          <ol>
            <li>
              <strong>Flyer en cada pedido del marketplace.</strong> Incluye
              un papel dentro de la bolsa: &quot;La proxima vez pide directo
              por WhatsApp y obtene un 10% de descuento&quot; + tu numero o
              QR. Esto es legal y funciona.
            </li>
            <li>
              <strong>Descuento exclusivo.</strong> Ofrece precios mas bajos
              por tu canal directo. Si en Rappi tu hamburguesa cuesta $12
              (porque necesitas cubrir la comision), por WhatsApp puede
              costar $10. El cliente ahorra y tu ganas mas.
            </li>
            <li>
              <strong>Programa de fidelidad.</strong> Cada 5 pedidos por
              WhatsApp, el 6to tiene un descuento o un extra gratis. Los
              marketplaces no te dejan hacer esto con tus datos.
            </li>
            <li>
              <strong>Redes sociales.</strong> En tu bio de Instagram y
              Facebook, pon el link directo a tu WhatsApp (wa.me/tu-numero).
              En cada post de comida, anade &quot;Pide por WhatsApp&quot;.
            </li>
            <li>
              <strong>Google Business.</strong> Agrega tu numero de WhatsApp
              en tu ficha de Google. Muchos clientes te encuentran por Google
              Maps y quieren pedir directo.
            </li>
            <li>
              <strong>Menu fisico.</strong> Si tienes local, pon un QR en
              cada mesa y en la puerta: &quot;Pide delivery directo por
              WhatsApp&quot;. Los clientes que comen en el local son los mas
              faciles de convertir.
            </li>
          </ol>

          <h2>Los numeros: cuanto ahorras con delivery propio</h2>
          <p>
            Hagamos cuentas con un restaurante que vende $3,000 USD/mes por
            delivery:
          </p>
          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-3 py-3 text-left font-semibold">Concepto</th>
                  <th className="px-3 py-3 text-center font-semibold">Marketplace</th>
                  <th className="px-3 py-3 text-center font-semibold">Canal propio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-3 font-medium">Ventas mensuales</td>
                  <td className="px-3 py-3 text-center">$3,000</td>
                  <td className="px-3 py-3 text-center">$3,000</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Comision plataforma</td>
                  <td className="px-3 py-3 text-center text-red-600 font-semibold">-$900 (30%)</td>
                  <td className="px-3 py-3 text-center text-green-600 font-semibold">$0</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Bot de WhatsApp</td>
                  <td className="px-3 py-3 text-center">$0</td>
                  <td className="px-3 py-3 text-center">-$29</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Comision pago (3.5%)</td>
                  <td className="px-3 py-3 text-center">incluida</td>
                  <td className="px-3 py-3 text-center">-$105</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-3 py-3 font-bold text-green-700">Te quedas con</td>
                  <td className="px-3 py-3 text-center font-bold">$2,100</td>
                  <td className="px-3 py-3 text-center font-bold text-green-700">$2,866</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Eso son <strong>$766 mas al mes</strong> — $9,192 al ano. Y eso
            sin contar que con datos propios puedes hacer remarketing,
            aumentar frecuencia de compra y subir el ticket promedio.
          </p>
          <p>
            Nota: el coste del repartidor no esta incluido porque es el
            mismo en ambos casos. Si usas tu propio repartidor, pagas lo
            mismo vengas del marketplace o de tu canal. La diferencia real
            es la comision de la plataforma.
          </p>

          <h2>La logistica: ¿quien entrega?</h2>
          <p>
            Este es el punto que mas preocupa a los restaurantes. Sin
            marketplace, ¿quien lleva la comida? Tienes 3 opciones:
          </p>
          <ul>
            <li>
              <strong>Repartidores propios.</strong> Contratas 1-2 motoristas
              en horario pico. Es la opcion mas barata a largo plazo y te da
              control total. Ideal si tu zona de cobertura es limitada (3-5 km).
            </li>
            <li>
              <strong>Servicio de moto bajo demanda.</strong> Plataformas
              como Lalamove, Mensajeros Urbanos o PedidosYa Envios te
              asignan un motorista por pedido. Pagas $2-5 por entrega. No
              tienes que contratar a nadie.
            </li>
            <li>
              <strong>Recogida en local (takeaway).</strong> No necesitas
              repartidor. El cliente pide por WhatsApp, paga, y lo recoge.
              Muchos restaurantes empiezan con esto y anaden delivery despues.
            </li>
          </ul>

          <h2>Plan de accion: de marketplace a canal propio en 4 semanas</h2>
          <ol>
            <li>
              <strong>Semana 1:</strong> configura tu canal de WhatsApp con
              un bot como{" "}
              <Link href="/" className="text-green-600 font-semibold">
                YaComanda
              </Link>
              . Sube tu carta, conecta cobros y haz pruebas internas.
            </li>
            <li>
              <strong>Semana 2:</strong> lanza con descuento exclusivo
              (&quot;10% de descuento por pedir directo&quot;). Incluye
              flyers en todos los pedidos del marketplace. Publica en redes.
            </li>
            <li>
              <strong>Semana 3-4:</strong> mide resultados. ¿Cuantos
              pedidos llegan por WhatsApp vs marketplace? Ajusta precios y
              promos. Define tu zona de delivery y resuelve la logistica.
            </li>
            <li>
              <strong>Mes 2 en adelante:</strong> sigue incluyendo flyers
              en cada pedido del marketplace. Cada cliente convertido es un
              cliente que deja de costarte 30% para siempre.
            </li>
          </ol>
          <p>
            No necesitas dejar el marketplace de un dia para otro. La
            estrategia ganadora es usar Glovo/Rappi para captar y WhatsApp
            para retener. Con el tiempo, la proporcion se invierte y tu
            margen mejora cada mes.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Monta tu delivery propio por $29/mes
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            30 dias gratis. Sin tarjeta. Bot de WhatsApp + cobros + pantalla de cocina.
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

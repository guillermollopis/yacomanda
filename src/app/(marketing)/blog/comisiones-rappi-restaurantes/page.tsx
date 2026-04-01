import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Comisiones de Rappi para restaurantes: cuanto pagas realmente en 2026 — YaComanda",
  description:
    "Desglose completo de las comisiones de Rappi para restaurantes en Colombia, Mexico, Peru, Argentina y Chile. Costos ocultos, ejemplos reales y alternativas.",
  keywords: [
    "comisiones rappi restaurantes",
    "cuanto cobra rappi",
    "porcentaje rappi restaurantes",
    "comisiones rappi colombia",
    "rappi costos restaurante",
    "comisiones rappi mexico",
    "rappi porcentaje por pedido",
    "alternativas a rappi sin comisiones",
  ],
  openGraph: {
    title: "Comisiones de Rappi para restaurantes: cuanto pagas realmente (2026)",
    description:
      "Desglose completo de comisiones, costos ocultos y ejemplos reales de lo que Rappi cobra a los restaurantes en Latinoamerica.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Comisiones de Rappi para restaurantes: cuanto pagas realmente en 2026"
      description="Desglose completo de las comisiones de Rappi para restaurantes en Latinoamerica."
      slug="comisiones-rappi-restaurantes"
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
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-0.5 text-xs font-semibold text-blue-600">
            Costes
          </span>
          <span className="text-slate-400">1 abril 2026</span>
          <span className="text-slate-400">9 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Comisiones de Rappi para restaurantes: cuanto pagas realmente en 2026
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Si tienes un restaurante en Rappi, probablemente ya sabes que las
          comisiones son altas. Pero &iquest;sabes exactamente cuanto te cuesta
          cada pedido? Entre la comision base, los costos logisticos, las
          promociones y las tarifas ocultas, la cifra real puede ser mucho mayor
          de lo que imaginas. Aqui te hacemos el desglose completo para 2026.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>Estructura de comisiones de Rappi en 2026</h2>
          <p>
            Rappi cobra a los restaurantes un porcentaje por cada pedido que se
            procesa a traves de la plataforma. Este porcentaje varia segun el
            pais, el tipo de contrato y si el restaurante usa la logistica de
            Rappi o la suya propia.
          </p>
          <p>
            El rango general es <strong>entre el 25% y el 35%</strong> del
            valor del pedido. Este porcentaje incluye la comision por el uso de
            la plataforma y, en la mayoria de casos, la logistica de entrega.
            Pero no es lo unico que pagas.
          </p>

          <h3>Desglose de lo que Rappi cobra</h3>
          <ul>
            <li>
              <strong>Comision por pedido:</strong> entre el 25% y el 35% del
              subtotal del pedido (antes de propina e impuestos). El porcentaje
              exacto depende de tu contrato y pais.
            </li>
            <li>
              <strong>Tarifa de activacion:</strong> algunos paises cobran una
              tarifa unica de activacion al registrar tu restaurante. En
              Colombia puede ser de $200.000 a $500.000 COP.
            </li>
            <li>
              <strong>Logistica de entrega:</strong> si usas los repartidores de
              Rappi, la comision ya incluye este costo. Si usas tu propia flota,
              la comision baja al rango de 15-20%, pero asumes el gasto de
              delivery.
            </li>
            <li>
              <strong>Listados promocionados (Rappi Ads):</strong> para aparecer
              en los primeros resultados de busqueda dentro de la app, Rappi
              cobra un costo adicional por clic o por impresion. Muchos
              restaurantes gastan entre $300.000 y $1.500.000 COP mensuales
              solo en visibilidad.
            </li>
            <li>
              <strong>Promociones y descuentos:</strong> cuando participas en
              campanas de descuento (tipo &quot;2x1&quot; o &quot;envio gratis&quot;),
              parte o todo el costo del descuento lo asume el restaurante.
            </li>
            <li>
              <strong>IVA sobre la comision:</strong> en paises como Colombia y
              Mexico, Rappi cobra IVA sobre su comision. Eso significa que si tu
              comision es del 27%, realmente pagas 27% + IVA (en Colombia seria
              un 32.1% efectivo con el 19% de IVA).
            </li>
          </ul>

          <h2>Ejemplo real: restaurante con 500 pedidos al mes</h2>
          <p>
            Hagamos numeros con un caso tipico en Colombia. Un restaurante que
            recibe <strong>500 pedidos mensuales</strong> por Rappi con un
            ticket promedio de <strong>$25.000 COP</strong>.
          </p>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-3 py-3 text-left font-semibold">Concepto</th>
                  <th className="px-3 py-3 text-right font-semibold">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-3">Ventas totales (500 x $25.000)</td>
                  <td className="px-3 py-3 text-right font-medium">$12.500.000 COP</td>
                </tr>
                <tr>
                  <td className="px-3 py-3">Comision Rappi (27% promedio)</td>
                  <td className="px-3 py-3 text-right font-medium text-red-600">-$3.375.000 COP</td>
                </tr>
                <tr>
                  <td className="px-3 py-3">IVA sobre comision (19%)</td>
                  <td className="px-3 py-3 text-right font-medium text-red-600">-$641.250 COP</td>
                </tr>
                <tr>
                  <td className="px-3 py-3">Rappi Ads (presupuesto minimo)</td>
                  <td className="px-3 py-3 text-right font-medium text-red-600">-$500.000 COP</td>
                </tr>
                <tr>
                  <td className="px-3 py-3">Descuentos asumidos por restaurante</td>
                  <td className="px-3 py-3 text-right font-medium text-red-600">-$300.000 COP</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-3 py-3 font-bold">Total que Rappi se lleva</td>
                  <td className="px-3 py-3 text-right font-bold text-red-700">-$4.816.250 COP</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-3 py-3 font-bold">Lo que te queda</td>
                  <td className="px-3 py-3 text-right font-bold">$7.683.750 COP</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Eso es un <strong>38.5% del total de tus ventas</strong> que se va
            en comisiones y costos asociados a Rappi. De cada $25.000 COP que
            pide un cliente, solo te quedan $15.367 COP antes de cubrir tus
            propios costos de ingredientes, personal y local.
          </p>

          <h2>Comisiones de Rappi por pais</h2>
          <p>
            Las comisiones varian significativamente segun el mercado. Aqui tienes
            los rangos aproximados para 2026:
          </p>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-3 py-3 text-left font-semibold">Pais</th>
                  <th className="px-3 py-3 text-center font-semibold">Comision base</th>
                  <th className="px-3 py-3 text-center font-semibold">Con logistica</th>
                  <th className="px-3 py-3 text-center font-semibold">IVA sobre comision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-3 font-medium">Colombia</td>
                  <td className="px-3 py-3 text-center">15-20%</td>
                  <td className="px-3 py-3 text-center">25-30%</td>
                  <td className="px-3 py-3 text-center">19%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Mexico</td>
                  <td className="px-3 py-3 text-center">18-22%</td>
                  <td className="px-3 py-3 text-center">25-35%</td>
                  <td className="px-3 py-3 text-center">16%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Peru</td>
                  <td className="px-3 py-3 text-center">15-20%</td>
                  <td className="px-3 py-3 text-center">25-30%</td>
                  <td className="px-3 py-3 text-center">18%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Argentina</td>
                  <td className="px-3 py-3 text-center">18-22%</td>
                  <td className="px-3 py-3 text-center">27-35%</td>
                  <td className="px-3 py-3 text-center">21%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Chile</td>
                  <td className="px-3 py-3 text-center">15-20%</td>
                  <td className="px-3 py-3 text-center">25-30%</td>
                  <td className="px-3 py-3 text-center">19%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Ecuador</td>
                  <td className="px-3 py-3 text-center">15-18%</td>
                  <td className="px-3 py-3 text-center">25-28%</td>
                  <td className="px-3 py-3 text-center">15%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Nota importante:</strong> estas cifras son aproximadas y
            dependen del tipo de contrato que negocies con Rappi. Los
            restaurantes con mayor volumen suelen conseguir mejores tarifas, pero
            incluso con descuento la comision rara vez baja del 20% con logistica
            incluida.
          </p>

          <h2>Comparativa: Rappi vs otras plataformas de delivery</h2>
          <p>
            Rappi no es la unica plataforma con comisiones altas. Aqui tienes
            como se compara con las principales alternativas en Latinoamerica:
          </p>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-3 py-3 text-left font-semibold">Plataforma</th>
                  <th className="px-3 py-3 text-center font-semibold">Comision</th>
                  <th className="px-3 py-3 text-center font-semibold">Logistica incluida</th>
                  <th className="px-3 py-3 text-center font-semibold">Presencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-3 font-medium">Rappi</td>
                  <td className="px-3 py-3 text-center">25-35%</td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                  <td className="px-3 py-3 text-center text-xs">CO, MX, PE, AR, CL, EC, BR</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">PedidosYa</td>
                  <td className="px-3 py-3 text-center">20-30%</td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                  <td className="px-3 py-3 text-center text-xs">AR, UY, CL, PE, EC, DO, BO, PY</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Uber Eats</td>
                  <td className="px-3 py-3 text-center">25-35%</td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                  <td className="px-3 py-3 text-center text-xs">MX, CO, CL, PE, GT, CR, PA</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">iFood</td>
                  <td className="px-3 py-3 text-center">12-27%</td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                  <td className="px-3 py-3 text-center text-xs">BR, CO</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Didi Food</td>
                  <td className="px-3 py-3 text-center">18-30%</td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                  <td className="px-3 py-3 text-center text-xs">MX, CO, CL, CR, PE</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-3 py-3 font-bold text-green-700">YaComanda</td>
                  <td className="px-3 py-3 text-center font-semibold text-green-700">$29 USD/mes (0%)</td>
                  <td className="px-3 py-3 text-center">
                    <X className="mx-auto size-4 text-slate-400" />
                  </td>
                  <td className="px-3 py-3 text-center text-xs">Cualquier pais con WhatsApp</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            La diferencia clave: todas las plataformas de delivery cobran un
            porcentaje por cada pedido. Cuanto mas vendes, mas pagas.{" "}
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            cobra una tarifa plana de $29 USD al mes sin importar cuantos
            pedidos recibas. Cero comisiones.
          </p>

          <h2>Los costos ocultos que nadie te menciona</h2>
          <p>
            Mas alla de la comision por pedido, hay costos que muchos
            restaurantes no ven hasta que revisan sus estados de cuenta con
            detalle:
          </p>
          <ul>
            <li>
              <strong>Cancelaciones y reembolsos:</strong> cuando un cliente
              cancela o pide un reembolso, en muchos casos el restaurante asume
              parte o todo el costo de la comida ya preparada. Rappi no siempre
              compensa este gasto.
            </li>
            <li>
              <strong>Tiempos de pago:</strong> Rappi puede tardar entre 7 y 15
              dias habiles en liquidar tus ventas. Para un restaurante con flujo
              de caja ajustado, eso significa financiar la operacion de tu
              bolsillo mientras esperas.
            </li>
            <li>
              <strong>Dependencia del algoritmo:</strong> tu visibilidad en la
              app depende del algoritmo de Rappi. Si tu restaurante no tiene
              buenas calificaciones o no inviertes en Rappi Ads, tu posicion en
              los resultados baja y recibes menos pedidos.
            </li>
            <li>
              <strong>Datos del cliente:</strong> cuando un cliente pide por
              Rappi, Rappi es dueno de esos datos. No tienes acceso al telefono,
              email ni historial de pedidos. No puedes hacer marketing directo
              ni programas de fidelidad con esos clientes.
            </li>
            <li>
              <strong>Competencia directa en la app:</strong> tu restaurante
              aparece al lado de decenas de competidores. El cliente que te
              buscaba puede terminar pidiendo en otro lugar por una promocion
              o mejor posicion en el listado.
            </li>
          </ul>

          <h2>&iquest;Cuando tiene sentido estar en Rappi?</h2>
          <p>
            No estamos diciendo que Rappi sea malo en todos los casos. Tiene
            sentido en estas situaciones:
          </p>
          <ul>
            <li>
              <strong>Restaurante nuevo</strong> que necesita visibilidad y
              clientes de descubrimiento (gente que busca &quot;comida cerca de
              mi&quot; en la app).
            </li>
            <li>
              <strong>Zona con alta demanda</strong> de delivery donde el
              volumen compensa la comision.
            </li>
            <li>
              <strong>No tienes flota propia</strong> y necesitas la logistica de
              Rappi para entregar.
            </li>
          </ul>
          <p>
            Pero para los pedidos de clientes que ya te conocen — que ya
            tienen tu numero o saben tu nombre — pagar 30% a Rappi no tiene
            sentido. Esas ventas ya eran tuyas.
          </p>

          <h2>La alternativa: pedidos directos por WhatsApp</h2>
          <p>
            En Latinoamerica, WhatsApp tiene mas del 90% de penetracion en la
            mayoria de paises. Tus clientes ya te escriben por ahi. La pregunta
            es: &iquest;sigues gestionando esos mensajes manualmente o dejas
            que un sistema automatico se encargue?
          </p>
          <p>
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            es un bot de WhatsApp con inteligencia artificial que atiende los
            pedidos de tus clientes de forma automatica. El cliente escribe por
            WhatsApp como siempre, ve tu carta, elige lo que quiere, confirma y
            paga. Todo sin descargar apps ni abrir paginas web.
          </p>
          <ul>
            <li>
              <strong>Tarifa plana:</strong> $29 USD al mes. Sin comision por
              pedido.
            </li>
            <li>
              <strong>Tus datos:</strong> tu eres dueno del numero de telefono
              y del historial de cada cliente.
            </li>
            <li>
              <strong>Cobro integrado:</strong> se conecta con pasarelas de pago
              locales (Mercado Pago, Nequi, tarjetas).
            </li>
            <li>
              <strong>Pantalla de cocina:</strong> los pedidos llegan
              directamente a cocina, organizados y sin errores.
            </li>
            <li>
              <strong>Automatico 24/7:</strong> atiende incluso cuando tu equipo
              esta ocupado o fuera de horario.
            </li>
          </ul>
          <p>
            Usando el mismo ejemplo de arriba: esos 500 pedidos mensuales de
            $25.000 COP te costarian $29 USD con YaComanda en vez de $4.816.250
            COP con Rappi. La diferencia se queda en tu bolsillo.
          </p>

          <h2>Conclusion</h2>
          <p>
            Rappi cumple una funcion como canal de descubrimiento, pero las
            comisiones del 25-35% (mas costos ocultos) hacen que sea
            insostenible como canal principal de pedidos. Especialmente para
            los clientes que ya te conocen.
          </p>
          <p>
            La estrategia mas inteligente: usa Rappi para captar clientes nuevos,
            pero redirige a tus clientes recurrentes a un canal directo como
            WhatsApp. Con{" "}
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            automatizas ese canal por una fraccion del costo.
          </p>
          <p>
            &iquest;Quieres ver mas alternativas? Lee nuestra{" "}
            <Link
              href="/blog/alternativas-rappi-sin-comisiones"
              className="text-green-600 font-semibold"
            >
              guia de alternativas a Rappi sin comisiones
            </Link>
            .
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Deja de regalar el 30% de cada pedido
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
            &larr; Todos los articulos
          </Link>
        </div>
      </div>
    </article>
    </>
  );
}

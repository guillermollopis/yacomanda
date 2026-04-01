import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Comisiones de PedidosYa para restaurantes: desglose completo 2026 — YaComanda",
  description:
    "Analisis detallado de las comisiones de PedidosYa para restaurantes en Argentina, Uruguay, Chile, Peru y mas. Costos reales, tarifas ocultas y alternativas.",
  keywords: [
    "comisiones pedidosya restaurantes",
    "cuanto cobra pedidosya",
    "pedidosya costos restaurante",
    "porcentaje pedidosya",
    "pedidosya comisiones argentina",
    "pedidosya comisiones uruguay",
    "alternativas pedidosya sin comisiones",
  ],
  openGraph: {
    title: "Comisiones de PedidosYa para restaurantes: desglose completo (2026)",
    description:
      "Todo lo que PedidosYa cobra a restaurantes: comisiones, logistica, IVA y costos ocultos en cada pais.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Comisiones de PedidosYa para restaurantes: desglose completo 2026"
      description="Analisis detallado de las comisiones de PedidosYa para restaurantes en Latinoamerica."
      slug="comisiones-pedidosya-restaurantes"
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
          Comisiones de PedidosYa para restaurantes: desglose completo 2026
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          PedidosYa es una de las plataformas de delivery mas grandes del Cono
          Sur y sigue expandiendose por toda Latinoamerica. Pero si eres
          restaurante, &iquest;sabes exactamente cuanto te cuesta cada pedido
          que entra por PedidosYa? Entre comisiones, logistica, IVA y tarifas
          adicionales, los numeros pueden sorprenderte. Aqui te mostramos el
          desglose real para 2026.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>Como funciona el modelo de comisiones de PedidosYa</h2>
          <p>
            PedidosYa opera bajo un modelo similar al de otras plataformas de
            delivery: cobra un porcentaje sobre cada pedido que se procesa a
            traves de la plataforma. Sin embargo, a diferencia de Rappi o Uber
            Eats, PedidosYa estructura sus costos en varias capas que conviene
            entender por separado.
          </p>

          <h3>Los tres componentes del costo</h3>
          <ul>
            <li>
              <strong>Comision de plataforma:</strong> entre el 20% y el 30%
              del subtotal del pedido. Este porcentaje varia segun el pais, el
              tipo de plan y el volumen del restaurante.
            </li>
            <li>
              <strong>Tarifa logistica:</strong> si usas los repartidores de
              PedidosYa (la mayoria de restaurantes lo hacen), se aplica una
              tarifa adicional por entrega. En algunos paises esta incluida en
              la comision; en otros se cobra por separado y puede ser de $800
              a $2.500 ARS por pedido en Argentina, o su equivalente local.
            </li>
            <li>
              <strong>IVA sobre la comision:</strong> PedidosYa cobra IVA sobre
              el servicio de intermediacion. Dependiendo del pais, esto puede
              sumar entre un 10% y un 22% adicional sobre la comision base.
            </li>
          </ul>
          <p>
            Sumando estas tres capas, el costo real por pedido puede llegar
            facilmente al <strong>30-38%</strong> del valor del pedido.
          </p>

          <h2>Comisiones de PedidosYa por pais</h2>
          <p>
            PedidosYa opera en 8 paises de Latinoamerica. Las comisiones
            varian en cada mercado:
          </p>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-3 py-3 text-left font-semibold">Pais</th>
                  <th className="px-3 py-3 text-center font-semibold">Comision base</th>
                  <th className="px-3 py-3 text-center font-semibold">Con logistica</th>
                  <th className="px-3 py-3 text-center font-semibold">IVA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-3 font-medium">Argentina</td>
                  <td className="px-3 py-3 text-center">20-25%</td>
                  <td className="px-3 py-3 text-center">25-32%</td>
                  <td className="px-3 py-3 text-center">21%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Uruguay</td>
                  <td className="px-3 py-3 text-center">18-25%</td>
                  <td className="px-3 py-3 text-center">25-30%</td>
                  <td className="px-3 py-3 text-center">22%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Chile</td>
                  <td className="px-3 py-3 text-center">20-25%</td>
                  <td className="px-3 py-3 text-center">25-30%</td>
                  <td className="px-3 py-3 text-center">19%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Peru</td>
                  <td className="px-3 py-3 text-center">20-28%</td>
                  <td className="px-3 py-3 text-center">25-30%</td>
                  <td className="px-3 py-3 text-center">18%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Ecuador</td>
                  <td className="px-3 py-3 text-center">18-25%</td>
                  <td className="px-3 py-3 text-center">24-28%</td>
                  <td className="px-3 py-3 text-center">15%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Republica Dominicana</td>
                  <td className="px-3 py-3 text-center">20-25%</td>
                  <td className="px-3 py-3 text-center">25-30%</td>
                  <td className="px-3 py-3 text-center">18%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Bolivia</td>
                  <td className="px-3 py-3 text-center">18-24%</td>
                  <td className="px-3 py-3 text-center">23-28%</td>
                  <td className="px-3 py-3 text-center">13%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Paraguay</td>
                  <td className="px-3 py-3 text-center">18-25%</td>
                  <td className="px-3 py-3 text-center">24-28%</td>
                  <td className="px-3 py-3 text-center">10%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Importante:</strong> estos rangos son aproximados y dependen
            del tipo de contrato, volumen de pedidos y si el restaurante
            negocia condiciones especiales. Los restaurantes nuevos o de bajo
            volumen suelen pagar el extremo alto del rango.
          </p>

          <h2>Ejemplo real: restaurante con 400 pedidos al mes</h2>
          <p>
            Veamos los numeros con un restaurante tipico en Argentina que recibe{" "}
            <strong>400 pedidos mensuales</strong> por PedidosYa con un ticket
            promedio de <strong>$8.500 ARS</strong>.
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
                  <td className="px-3 py-3">Ventas totales (400 x $8.500)</td>
                  <td className="px-3 py-3 text-right font-medium">$3.400.000 ARS</td>
                </tr>
                <tr>
                  <td className="px-3 py-3">Comision PedidosYa (25% promedio)</td>
                  <td className="px-3 py-3 text-right font-medium text-red-600">-$850.000 ARS</td>
                </tr>
                <tr>
                  <td className="px-3 py-3">IVA sobre comision (21%)</td>
                  <td className="px-3 py-3 text-right font-medium text-red-600">-$178.500 ARS</td>
                </tr>
                <tr>
                  <td className="px-3 py-3">Publicidad en PedidosYa</td>
                  <td className="px-3 py-3 text-right font-medium text-red-600">-$120.000 ARS</td>
                </tr>
                <tr>
                  <td className="px-3 py-3">Descuentos PedidosYa Plus asumidos</td>
                  <td className="px-3 py-3 text-right font-medium text-red-600">-$85.000 ARS</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-3 py-3 font-bold">Total que PedidosYa se lleva</td>
                  <td className="px-3 py-3 text-right font-bold text-red-700">-$1.233.500 ARS</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-3 py-3 font-bold">Lo que te queda</td>
                  <td className="px-3 py-3 text-right font-bold">$2.166.500 ARS</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Eso es un <strong>36.3% de tus ventas totales</strong> que se va en
            costos asociados a PedidosYa. De cada $8.500 ARS que pide un
            cliente, solo recibes $5.416 ARS antes de cubrir ingredientes,
            personal y alquiler.
          </p>

          <h2>Costos ocultos de PedidosYa</h2>
          <p>
            Ademas de la comision por pedido, hay varios costos que no aparecen
            en el contrato inicial pero que impactan tu rentabilidad:
          </p>
          <ul>
            <li>
              <strong>PedidosYa Plus:</strong> el programa de suscripcion de
              PedidosYa ofrece envios gratis a los usuarios. Parte del costo
              de esos envios lo asume el restaurante a traves de descuentos
              obligatorios o condiciones del contrato.
            </li>
            <li>
              <strong>Publicidad dentro de la app:</strong> para tener
              visibilidad en PedidosYa necesitas invertir en anuncios dentro de
              la plataforma. Los restaurantes que no pagan publicidad quedan
              relegados en los resultados de busqueda.
            </li>
            <li>
              <strong>Cancelaciones:</strong> cuando un cliente cancela un
              pedido despues de que ya fue preparado, PedidosYa no siempre
              reembolsa el costo de la comida al restaurante. Dependiendo del
              motivo de la cancelacion, puedes perder el 100% del pedido.
            </li>
            <li>
              <strong>Retrasos en pagos:</strong> PedidosYa liquida los pagos
              a los restaurantes en ciclos semanales o quincenales. En paises
              con alta inflacion como Argentina, cada dia de retraso en el
              cobro significa una perdida real de valor.
            </li>
            <li>
              <strong>Ajustes por calificaciones:</strong> si tu restaurante
              tiene calificaciones bajas, PedidosYa puede reducir tu visibilidad
              o incluso pausar tu cuenta temporalmente, afectando directamente
              tus ingresos.
            </li>
            <li>
              <strong>Sin acceso a datos del cliente:</strong> igual que con
              otras plataformas, PedidosYa no comparte los datos de contacto
              de los clientes. No puedes enviar promociones, crear programas de
              fidelidad ni comunicarte directamente con quienes te compran.
            </li>
          </ul>

          <h2>Comparativa: PedidosYa vs Rappi vs Uber Eats</h2>
          <p>
            &iquest;Como se compara PedidosYa con las otras grandes plataformas?
            Aqui tienes un resumen:
          </p>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-3 py-3 text-left font-semibold">Caracteristica</th>
                  <th className="px-3 py-3 text-center font-semibold">PedidosYa</th>
                  <th className="px-3 py-3 text-center font-semibold">Rappi</th>
                  <th className="px-3 py-3 text-center font-semibold">Uber Eats</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-3 font-medium">Comision base</td>
                  <td className="px-3 py-3 text-center">20-30%</td>
                  <td className="px-3 py-3 text-center">25-35%</td>
                  <td className="px-3 py-3 text-center">25-35%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Logistica incluida</td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Publicidad obligatoria</td>
                  <td className="px-3 py-3 text-center text-amber-500 font-medium">Recomendada</td>
                  <td className="px-3 py-3 text-center text-amber-500 font-medium">Recomendada</td>
                  <td className="px-3 py-3 text-center text-amber-500 font-medium">Recomendada</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Datos del cliente</td>
                  <td className="px-3 py-3 text-center">
                    <X className="mx-auto size-4 text-red-500" />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <X className="mx-auto size-4 text-red-500" />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <X className="mx-auto size-4 text-red-500" />
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Pago inmediato</td>
                  <td className="px-3 py-3 text-center">
                    <X className="mx-auto size-4 text-red-500" />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <X className="mx-auto size-4 text-red-500" />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <X className="mx-auto size-4 text-red-500" />
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Presencia principal</td>
                  <td className="px-3 py-3 text-center text-xs">AR, UY, CL, PE, EC</td>
                  <td className="px-3 py-3 text-center text-xs">CO, MX, PE, AR, CL</td>
                  <td className="px-3 py-3 text-center text-xs">MX, CO, CL, PE</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            En resumen: las tres plataformas funcionan de forma muy similar.
            Cobran un porcentaje alto por cada pedido, no comparten datos del
            cliente y requieren inversion publicitaria para tener visibilidad.
            La diferencia principal es la cobertura geografica.
          </p>

          <h2>&iquest;Cuando conviene estar en PedidosYa?</h2>
          <p>
            PedidosYa puede ser util en ciertos escenarios:
          </p>
          <ul>
            <li>
              <strong>Restaurante nuevo en el Cono Sur:</strong> si estas en
              Argentina, Uruguay o Paraguay, PedidosYa es la plataforma
              dominante y te da acceso a una base de usuarios grande.
            </li>
            <li>
              <strong>Necesitas logistica de terceros:</strong> si no tienes
              repartidores propios, la red de riders de PedidosYa resuelve la
              entrega.
            </li>
            <li>
              <strong>Clientes de descubrimiento:</strong> gente que abre la
              app buscando &quot;que comer&quot; y descubre tu restaurante por
              primera vez.
            </li>
          </ul>
          <p>
            Pero para los clientes que ya te conocen y ya tienen tu contacto,
            pagarle a PedidosYa un 25-30% no tiene logica. Esos pedidos puedes
            recibirlos directamente.
          </p>

          <h2>La alternativa: pedidos directos por WhatsApp con YaComanda</h2>
          <p>
            WhatsApp tiene mas del 90% de penetracion en los paises donde opera
            PedidosYa. Tus clientes ya te escriben por ahi para preguntar
            horarios, disponibilidad y precios. &iquest;Por que no convertir
            esos mensajes en pedidos automaticos?
          </p>
          <p>
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            es un bot de WhatsApp con inteligencia artificial disenado
            especificamente para restaurantes. Tus clientes escriben por
            WhatsApp, ven la carta, eligen, confirman y pagan — todo
            automatico, sin que tu equipo tenga que intervenir.
          </p>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-3 py-3 text-left font-semibold">Caracteristica</th>
                  <th className="px-3 py-3 text-center font-semibold">PedidosYa</th>
                  <th className="px-3 py-3 text-center font-semibold">YaComanda</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-3 font-medium">Costo por pedido</td>
                  <td className="px-3 py-3 text-center text-red-600 font-medium">20-30%</td>
                  <td className="px-3 py-3 text-center text-green-600 font-bold">0%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Costo mensual</td>
                  <td className="px-3 py-3 text-center">$0 (pero pagas por pedido)</td>
                  <td className="px-3 py-3 text-center font-semibold text-green-600">$29 USD/mes</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Datos del cliente</td>
                  <td className="px-3 py-3 text-center">
                    <X className="mx-auto size-4 text-red-500" />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Atencion automatica 24/7</td>
                  <td className="px-3 py-3 text-center">
                    <X className="mx-auto size-4 text-red-500" />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Pantalla de cocina</td>
                  <td className="px-3 py-3 text-center">Tablet propia</td>
                  <td className="px-3 py-3 text-center text-green-600 font-medium">Incluida</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Cobro integrado</td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-green-500" />
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Requiere descargar app</td>
                  <td className="px-3 py-3 text-center">
                    <Check className="mx-auto size-4 text-red-500" />
                  </td>
                  <td className="px-3 py-3 text-center">
                    <X className="mx-auto size-4 text-green-500" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Usando el ejemplo de arriba: esos 400 pedidos mensuales de $8.500
            ARS te costarian $29 USD al mes con YaComanda en vez de $1.233.500
            ARS con PedidosYa. La diferencia es enorme.
          </p>

          <h2>Estrategia inteligente: combina canales</h2>
          <p>
            No tienes que elegir solo uno. La estrategia mas rentable es usar
            PedidosYa como canal de captacion (para que gente nueva te
            descubra) y redirigir a tus clientes recurrentes a WhatsApp.
          </p>
          <ul>
            <li>
              <strong>Paso 1:</strong> incluye una tarjeta con tu numero de
              WhatsApp en cada pedido de PedidosYa. Algo como: &quot;La proxima
              vez pedi directo por WhatsApp y te damos 10% de descuento.&quot;
            </li>
            <li>
              <strong>Paso 2:</strong> configura{" "}
              <Link href="/" className="text-green-600 font-semibold">
                YaComanda
              </Link>{" "}
              para que atienda esos pedidos de forma automatica.
            </li>
            <li>
              <strong>Paso 3:</strong> cada cliente que migra de PedidosYa a
              WhatsApp te ahorra entre el 25% y el 35% de comision en cada
              pedido futuro.
            </li>
          </ul>
          <p>
            En 3-6 meses, la mayoria de tus clientes habituales ya piden
            directamente por WhatsApp. PedidosYa queda solo para clientes
            nuevos, que es donde realmente aporta valor.
          </p>

          <h2>Conclusion</h2>
          <p>
            PedidosYa es una herramienta util para conseguir clientes nuevos,
            pero sus comisiones del 20-30% (mas IVA, logistica y costos
            ocultos) hacen que sea caro como canal principal de ventas. Para
            restaurantes que ya tienen una base de clientes, la mayor parte de
            esos pedidos pueden pasar a un canal directo como WhatsApp.
          </p>
          <p>
            Con{" "}
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>
            , automatizas la recepcion de pedidos por WhatsApp por $29 USD al
            mes, sin comisiones, con cobro integrado y pantalla de cocina.
            Tus clientes piden como siempre — por WhatsApp — y tu recibes el
            100% del pedido.
          </p>
          <p>
            &iquest;Quieres ver como se comparan las comisiones de Rappi? Lee
            nuestro{" "}
            <Link
              href="/blog/comisiones-rappi-restaurantes"
              className="text-green-600 font-semibold"
            >
              desglose completo de comisiones de Rappi
            </Link>
            .
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Deja de pagar comisiones por tus clientes habituales
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

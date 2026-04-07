import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Cuanto cobra Glovo a los restaurantes: desglose real 2026 — YaComanda",
  description:
    "Descubre cuanto cobra Glovo a los restaurantes en 2026. Desglosamos comisiones (25-35%), logistica, pagos y costes ocultos. Calcula cuanto pierdes al mes.",
  openGraph: {
    title: "Cuanto cobra Glovo a los restaurantes: desglose real 2026",
    description:
      "Comisiones del 25-35%, logistica, pagos y costes ocultos. Desglose completo de lo que Glovo cobra a tu restaurante y como dejar de pagarlo.",
  },
};

export default function BlogPost() {
  return (
    <>
      <BlogPostingJsonLd
        title="Cuanto cobra Glovo a los restaurantes: desglose real 2026"
        description="Desglosamos las comisiones reales de Glovo en 2026: entre el 25% y el 35% por pedido, mas logistica, pagos y costes ocultos."
        slug="cuanto-cobra-glovo-a-restaurantes"
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
            <span className="rounded-full border border-red-200 bg-red-50 px-3 py-0.5 text-xs font-semibold text-red-600">
              Costes
            </span>
            <span className="text-slate-400">2 abril 2026</span>
            <span className="text-slate-400">8 min lectura</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Cuanto cobra Glovo a los restaurantes: desglose real 2026
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-500">
            Glovo es la plataforma de delivery dominante en Espana. Millones de
            pedidos al mes, presencia en todas las ciudades, y una app que todo
            el mundo tiene en el movil. Pero si tienes un restaurante y trabajas
            con ellos, hay una pregunta que necesitas responder con numeros
            exactos: <strong>cuanto te esta costando realmente</strong>.
          </p>

          <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
            <h2>La estructura de comisiones de Glovo en 2026</h2>
            <p>
              Lo primero que debes saber: la comision de Glovo no es un unico
              porcentaje. Es una suma de varios conceptos que, juntos, pueden
              comerse una parte enorme de tu margen. Vamos a desglosarlos uno a
              uno.
            </p>

            <h3>1. Comision estandar por pedido: 25-35%</h3>
            <p>
              Esta es la comision base que Glovo cobra por cada pedido que se
              procesa a traves de su plataforma. El porcentaje exacto depende de
              varios factores: el volumen de pedidos de tu restaurante, la
              ciudad, si tienes riders propios o usas los de Glovo, y el poder
              de negociacion que tengas.
            </p>
            <p>
              En la practica, la mayoria de restaurantes pequenos y medianos
              estan en la franja del <strong>28-32%</strong>. Solo las grandes
              cadenas consiguen bajar del 25%.
            </p>

            <h3>2. Coste logistico (riders)</h3>
            <p>
              Si usas la flota de riders de Glovo (que es lo habitual), el coste
              logistico esta incluido en la comision. Pero ojo: si la distancia
              de entrega es larga o hay poca demanda de riders en tu zona, Glovo
              puede aplicar recargos adicionales que acaban repercutiendo en tu
              margen o en el precio final al cliente.
            </p>

            <h3>3. Procesamiento de pagos: 1-2%</h3>
            <p>
              Cada transaccion con tarjeta tiene un coste de procesamiento. Glovo
              lo repercute al restaurante con un porcentaje que oscila entre el
              1% y el 2% del valor del pedido. En pedidos pequenos este coste
              parece insignificante, pero sumado al ano es una cifra
              considerable.
            </p>

            <h3>4. Visibilidad y marketing: &quot;opcional&quot; pero casi obligatorio</h3>
            <p>
              Glovo ofrece opciones de publicidad dentro de la app: aparecer mas
              arriba en los resultados, banners destacados, promociones
              patrocinadas. Oficialmente son opcionales. En la practica, si no
              pagas, tu restaurante aparece enterrado debajo de los que si pagan.
            </p>
            <p>
              Los costes de visibilidad pueden ir desde 50€ hasta varios cientos
              de euros al mes, dependiendo de la ciudad y la competencia en tu
              categoria.
            </p>

            <h3>5. Cuotas minimas mensuales</h3>
            <p>
              En algunos contratos, Glovo incluye una cuota minima mensual. Si
              tus comisiones no alcanzan esa cifra, pagas la diferencia
              igualmente. Esto penaliza especialmente a restaurantes con volumen
              bajo o estacional.
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full rounded-lg border border-slate-200 text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">
                      Concepto
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">
                      Coste
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">
                      Notas
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      Comision base
                    </td>
                    <td className="px-4 py-3 font-semibold text-red-600">
                      25-35%
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      Sobre el total del pedido (con IVA)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      Logistica (riders)
                    </td>
                    <td className="px-4 py-3 font-semibold text-red-600">
                      Incluido*
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      *Recargos por distancia posibles
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      Procesamiento de pagos
                    </td>
                    <td className="px-4 py-3 font-semibold text-red-600">
                      1-2%
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      Por cada transaccion con tarjeta
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      Visibilidad/marketing
                    </td>
                    <td className="px-4 py-3 font-semibold text-red-600">
                      50-300€/mes
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      Opcional, pero necesario para competir
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      Cuota minima mensual
                    </td>
                    <td className="px-4 py-3 font-semibold text-red-600">
                      Variable
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      Segun contrato y ciudad
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Ejemplo real: restaurante con 300 pedidos al mes</h2>
            <p>
              Vamos a hacer los numeros con un caso realista. Un restaurante de
              comida mediterranea en una ciudad mediana, con 300 pedidos
              mensuales a traves de Glovo y un ticket medio de 18€.
            </p>

            <div className="not-prose my-8 rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-6">
              <h3 className="text-lg font-bold text-slate-900">
                Los numeros que Glovo no te ensena
              </h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-red-100 pb-2">
                  <span className="text-slate-700">Pedidos mensuales</span>
                  <span className="font-semibold text-slate-900">300</span>
                </div>
                <div className="flex items-center justify-between border-b border-red-100 pb-2">
                  <span className="text-slate-700">Ticket medio</span>
                  <span className="font-semibold text-slate-900">18€</span>
                </div>
                <div className="flex items-center justify-between border-b border-red-100 pb-2">
                  <span className="text-slate-700">
                    Facturacion mensual via Glovo
                  </span>
                  <span className="font-semibold text-slate-900">5.400€</span>
                </div>
                <div className="flex items-center justify-between border-b border-red-100 pb-2">
                  <span className="text-slate-700">
                    Comision Glovo (30%)
                  </span>
                  <span className="font-bold text-red-600">-1.620€</span>
                </div>
                <div className="flex items-center justify-between border-b border-red-100 pb-2">
                  <span className="text-slate-700">Procesamiento pagos (~1.5%)</span>
                  <span className="font-bold text-red-600">-81€</span>
                </div>
                <div className="flex items-center justify-between border-b border-red-100 pb-2">
                  <span className="text-slate-700">
                    Lo que recibes
                  </span>
                  <span className="font-bold text-slate-900">3.699€</span>
                </div>
                <div className="mt-2 flex items-center justify-between rounded-lg bg-red-100 px-3 py-2">
                  <span className="font-semibold text-red-800">
                    Pierdes al ano en comisiones
                  </span>
                  <span className="text-xl font-extrabold text-red-600">
                    20.412€
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Mas de 20.000€ al ano. Eso es el sueldo completo de un empleado
                a jornada completa. Solo en comisiones a Glovo.
              </p>
            </div>

            <p>
              Y esto sin contar el coste de marketing dentro de la app, que
              muchos restaurantes acaban pagando para no desaparecer de los
              resultados. Si sumas 150€/mes de visibilidad, el total anual sube
              a <strong>22.212€</strong>.
            </p>

            <p>
              ¿Quieres ver cuanto pierdes tu con tus propios numeros?{" "}
              <Link href="/calculadora-comisiones">
                Usa nuestra calculadora de comisiones
              </Link>{" "}
              y haz la cuenta en 30 segundos.
            </p>

            <h2>Los costes ocultos que la mayoria de restaurantes ignoran</h2>
            <p>
              Las comisiones son el coste visible. Pero hay otros costes que no
              aparecen en ninguna factura y que, a largo plazo, pueden ser
              incluso mas daninos para tu negocio.
            </p>

            <h3>No eres dueno de tus clientes</h3>
            <p>
              Cuando un cliente pide a traves de Glovo, su telefono, su email y
              su historial de pedidos pertenecen a Glovo, no a ti. No puedes
              enviarle una oferta directa, no puedes avisarle de tu nuevo plato,
              no puedes crear una relacion. Si manana Glovo sube las comisiones
              al 40%, no tienes forma de contactar a tus clientes para ofrecerles
              un canal alternativo.
            </p>

            <h3>Tu competencia esta a un scroll de distancia</h3>
            <p>
              En Glovo, tu restaurante aparece junto a todos tus competidores.
              Incluso peor: los que pagan por visibilidad aparecen por encima de
              ti. Tu paella casera de 14€ compite directamente con la oferta de
              una cadena a 7,99€. Y Glovo no tiene ningun incentivo en que tu
              restaurante gane: ellos cobran comision de todos.
            </p>

            <h3>No puedes fidelizar</h3>
            <p>
              El cliente que pide por Glovo es cliente de Glovo, no tuyo. Si le
              gusta tu comida, la proxima vez abrira Glovo (no tu web) y
              posiblemente pida de otro sitio porque le aparece un descuento.
              No tienes herramientas de fidelizacion reales: no hay programa de
              puntos tuyo, no hay comunicacion directa, no hay nada.
            </p>

            <h3>Inflacion de precios en el menu</h3>
            <p>
              Para compensar las comisiones, la mayoria de restaurantes suben
              los precios en Glovo entre un 20% y un 30% respecto a su carta
              presencial. El cliente lo nota: un plato que en el restaurante
              cuesta 10€ aparece a 13€ en la app. Esto genera desconfianza y, en
              muchos casos, el cliente prefiere no repetir.
            </p>

            <div className="not-prose my-8 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-6">
              <p className="text-sm font-bold text-amber-800">
                Dato clave
              </p>
              <p className="mt-2 text-slate-700">
                Segun datos del sector, el 68% de los clientes de delivery
                estarian dispuestos a pedir directamente al restaurante si
                tuvieran una forma facil de hacerlo. Ya tienes la demanda. Solo
                necesitas el canal.
              </p>
            </div>

            <h2>Que estan haciendo los restaurantes mas listos</h2>
            <p>
              No estamos diciendo que debas abandonar Glovo manana. Las
              plataformas aportan visibilidad, sobre todo a restaurantes nuevos.
              Pero los restaurantes que mejor funcionan en 2026 estan haciendo
              una cosa clara: <strong>construir su propio canal de pedidos
              directos</strong>.
            </p>

            <h3>Pedidos por WhatsApp</h3>
            <p>
              El 95% de tus clientes ya tienen WhatsApp. No necesitan descargar
              ninguna app nueva. Herramientas como{" "}
              <Link href="/">YaComanda</Link> permiten recibir pedidos por
              WhatsApp de forma automatizada: el cliente escribe, un asistente
              con IA toma el pedido, confirma, cobra y lo envia a cocina. Sin
              comisiones por pedido.
            </p>
            <p>
              Mira como funciona en detalle en nuestra guia sobre{" "}
              <Link href="/blog/alternativas-glovo-sin-comisiones">
                alternativas a Glovo sin comisiones
              </Link>
              .
            </p>

            <h3>Codigos QR en el local</h3>
            <p>
              Un QR en la mesa o en el ticket de compra lleva al cliente a tu
              WhatsApp o a tu carta digital. La proxima vez que quiera pedir,
              ya tiene tu contacto guardado. Pedido directo, sin intermediarios,
              sin comisiones.
            </p>

            <h3>Redes sociales y pedido directo</h3>
            <p>
              Tu pagina de Facebook o perfil de Instagram puede enlazar
              directamente a tu WhatsApp de pedidos. Cada publicacion, cada
              historia, cada foto de un plato puede convertirse en un pedido
              directo sin pasar por Glovo.
            </p>

            <h2>La comparativa: Glovo vs. pedido directo</h2>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full rounded-lg border border-slate-200 text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">
                      Concepto
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">
                      Con Glovo
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-900">
                      Pedido directo
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      Comision por pedido
                    </td>
                    <td className="px-4 py-3 font-semibold text-red-600">
                      25-35%
                    </td>
                    <td className="px-4 py-3 font-semibold text-green-600">
                      0%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      Datos del cliente
                    </td>
                    <td className="px-4 py-3 text-red-600">
                      Los tiene Glovo
                    </td>
                    <td className="px-4 py-3 text-green-600">
                      Son tuyos
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      Fidelizacion
                    </td>
                    <td className="px-4 py-3 text-red-600">
                      Imposible
                    </td>
                    <td className="px-4 py-3 text-green-600">
                      Total
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      Competencia junto a ti
                    </td>
                    <td className="px-4 py-3 text-red-600">
                      Si, todos tus competidores
                    </td>
                    <td className="px-4 py-3 text-green-600">
                      No, es tu canal
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      Coste mensual (300 pedidos)
                    </td>
                    <td className="px-4 py-3 font-semibold text-red-600">
                      ~1.700€
                    </td>
                    <td className="px-4 py-3 font-semibold text-green-600">
                      Desde 29€
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      El cliente necesita descargar app
                    </td>
                    <td className="px-4 py-3 text-red-600">
                      Si (app de Glovo)
                    </td>
                    <td className="px-4 py-3 text-green-600">
                      No (ya tiene WhatsApp)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Entonces, ¿merece la pena seguir con Glovo?</h2>
            <p>
              Glovo tiene sentido como canal de captacion: te da visibilidad ante
              clientes que aun no te conocen. Pero no deberia ser tu canal
              principal ni tu unica fuente de pedidos a domicilio.
            </p>
            <p>
              La estrategia que mejor funciona en 2026 es clara:
            </p>
            <ol>
              <li>
                <strong>Usa Glovo para captar</strong> — nuevos clientes que te
                descubren por la app.
              </li>
              <li>
                <strong>Redirige al canal directo</strong> — incluye un flyer
                con cada pedido de Glovo con tu QR de WhatsApp y un incentivo
                (&quot;10% dto en tu proximo pedido directo&quot;).
              </li>
              <li>
                <strong>Fideliza sin intermediarios</strong> — una vez que el
                cliente pide por WhatsApp, tienes su contacto para siempre.
              </li>
            </ol>
            <p>
              Si quieres profundizar en las alternativas, lee nuestro articulo
              completo sobre{" "}
              <Link href="/blog/comisiones-glovo-restaurantes">
                comisiones de Glovo, Uber Eats y Just Eat
              </Link>{" "}
              para comparar las tres plataformas.
            </p>

            <div className="not-prose my-8 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
              <p className="text-sm font-bold text-green-800">
                Resumen rapido
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>
                  Glovo cobra entre el <strong>25% y el 35%</strong> de cada
                  pedido, mas procesamiento de pagos y posibles cuotas extra.
                </li>
                <li>
                  Un restaurante con 300 pedidos/mes pierde mas de{" "}
                  <strong>20.000€ al ano</strong> en comisiones.
                </li>
                <li>
                  No tienes datos de tus clientes ni capacidad de fidelizar.
                </li>
                <li>
                  Los pedidos directos por WhatsApp eliminan las comisiones y te
                  devuelven el control.
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 p-8 text-center text-white">
            <h2 className="text-2xl font-bold">
              ¿Cuanto estas perdiendo con Glovo?
            </h2>
            <p className="mt-2 text-green-100">
              Introduce tus numeros reales y descubre cuanto podrias ahorrar con
              pedidos directos. Sin compromisos, en 30 segundos.
            </p>
            <Link
              href="/calculadora-comisiones"
              className="mt-4 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-green-700 hover:bg-green-50"
            >
              Calcula tu ahorro
            </Link>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-8">
            <Link
              href="/blog"
              className="text-sm font-semibold text-green-600 hover:text-green-500"
            >
              &larr; Volver al blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

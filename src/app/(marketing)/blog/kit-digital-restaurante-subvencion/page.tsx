import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Kit Digital para restaurantes: como conseguir la subvencion en 2026 — YaComanda",
  description:
    "Guia completa sobre el Kit Digital para restaurantes y hosteleria. Requisitos, importes y como solicitar la subvencion para digitalizar tu negocio en 2026.",
  keywords: [
    "kit digital restaurante",
    "subvencion digitalizacion restaurante",
    "kit digital hosteleria 2026",
    "kit digital pymes",
    "ayuda digitalizacion hosteleria",
  ],
  openGraph: {
    title: "Kit Digital para restaurantes: como conseguir la subvencion en 2026",
    description:
      "Todo lo que necesitas saber para solicitar el Kit Digital y digitalizar tu restaurante con coste cero.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Kit Digital para restaurantes: como conseguir la subvencion en 2026"
      description="Guia completa sobre el Kit Digital para restaurantes y hosteleria. Requisitos, importes y como solicitar la subvencion."
      slug="kit-digital-restaurante-subvencion"
      datePublished="2026-03-16"
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
          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-0.5 text-xs font-semibold text-amber-600">
            Kit Digital
          </span>
          <span className="text-slate-400">16 marzo 2026</span>
          <span className="text-slate-400">7 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Kit Digital para restaurantes: como conseguir la subvencion en 2026
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          El gobierno de Espana lleva desde 2022 repartiendo hasta 6.000€ por
          negocio para que pymes y autonomos se digitalicen. Si tienes un
          restaurante y aun no lo has pedido, esta guia te explica todo lo que
          necesitas saber.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>Que es el Kit Digital</h2>
          <p>
            El Kit Digital es un programa de ayudas del Gobierno de Espana,
            gestionado a traves de Red.es y financiado con fondos europeos Next
            Generation EU. Su objetivo es impulsar la digitalizacion de
            pequenas empresas, micropymes y autonomos.
          </p>
          <p>
            En la practica, el programa te da un &ldquo;bono digital&rdquo; que
            puedes gastar en soluciones tecnologicas de un catalogo aprobado.
            No tienes que adelantar dinero: el proveedor cobra directamente la
            subvencion.
          </p>
          <p>
            Desde su lanzamiento, mas de 500.000 negocios en Espana ya han
            solicitado el Kit Digital. En 2026, el programa sigue abierto con
            fondos disponibles, especialmente para los segmentos mas pequenos.
          </p>

          <h2>Quien puede solicitarlo</h2>
          <p>
            Los requisitos son bastante accesibles para cualquier restaurante:
          </p>
          <ul>
            <li>
              <strong>Autonomos</strong> dados de alta en el RETA (la mayoria
              de duenos de bares y restaurantes).
            </li>
            <li>
              <strong>Micropymes y pymes</strong> con menos de 50 empleados y
              facturacion inferior a 10 millones de euros.
            </li>
            <li>
              Estar al corriente de obligaciones tributarias y con la Seguridad
              Social.
            </li>
            <li>
              No tener consideracion de empresa en crisis.
            </li>
            <li>
              Realizar el test de madurez digital en{" "}
              <strong>acelerapyme.es</strong>.
            </li>
          </ul>
          <p>
            Si tienes un restaurante con 1 o 40 empleados, lo mas probable es
            que cumplas todos los requisitos.
          </p>

          <h2>Cuanto dinero puedes conseguir</h2>
          <p>
            El importe depende del tamano de tu empresa, dividido en tres
            segmentos:
          </p>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold">
                    Segmento
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Empleados
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Bono maximo
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 text-slate-900">Segmento I</td>
                  <td className="px-4 py-3 text-slate-500">10-49 empleados</td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    6.000€
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Segmento II</td>
                  <td className="px-4 py-3 text-slate-500">3-9 empleados</td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    6.000€
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Segmento III</td>
                  <td className="px-4 py-3 text-slate-500">
                    0-2 empleados / autonomos
                  </td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    2.000€
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Un restaurante tipico con 5-8 empleados (segmento II) puede
            obtener hasta 6.000€. Incluso si eres autonomo sin empleados,
            tienes 2.000€ disponibles para digitalizar tu negocio.
          </p>

          <h2>Categorias de soluciones disponibles</h2>
          <p>
            El Kit Digital cubre multiples categorias. Las mas relevantes para
            restaurantes son:
          </p>
          <ul>
            <li>
              <strong>Comercio Electronico:</strong> soluciones para vender
              online, recibir pedidos y cobrar por internet. Aqui es donde
              encaja un sistema de pedidos por WhatsApp.
            </li>
            <li>
              <strong>Sitio Web y Presencia en Internet:</strong> creacion de
              pagina web profesional.
            </li>
            <li>
              <strong>Gestion de Procesos:</strong> herramientas de
              facturacion, contabilidad o gestion de inventario.
            </li>
            <li>
              <strong>Comunicaciones Seguras:</strong> VPN, antivirus y
              seguridad digital.
            </li>
            <li>
              <strong>Presencia Avanzada en Internet:</strong> SEO, SEM y
              posicionamiento.
            </li>
          </ul>
          <p>
            La categoria mas interesante para restaurantes es{" "}
            <strong>Comercio Electronico</strong>, que cubre exactamente lo que
            necesitas: un canal de venta digital para recibir pedidos y cobros.
          </p>

          <h2>Como solicitar el Kit Digital paso a paso</h2>
          <ol>
            <li>
              <strong>Registrate en acelerapyme.es</strong> — crea tu cuenta en
              la plataforma del Ministerio. Necesitaras certificado digital o
              Cl@ve.
            </li>
            <li>
              <strong>Completa el test de madurez digital</strong> — un
              cuestionario corto sobre el nivel de digitalizacion de tu
              negocio. Tarda unos 10 minutos.
            </li>
            <li>
              <strong>Solicita el bono digital</strong> — desde la misma
              plataforma, rellena la solicitud. Normalmente se aprueba en
              pocas semanas.
            </li>
            <li>
              <strong>Elige tu solucion y proveedor</strong> — busca en el
              catalogo de agentes digitalizadores la solucion que necesitas.
            </li>
            <li>
              <strong>Firma el acuerdo</strong> — el proveedor se encarga del
              papeleo. Tu no adelantas nada; la subvencion paga directamente
              al proveedor.
            </li>
          </ol>
          <p>
            El proceso completo suele tardar entre 2 y 6 semanas, dependiendo
            de la carga de trabajo de Red.es. Lo importante es solicitarlo
            cuanto antes: los fondos se agotan por orden de llegada.
          </p>

          <h2>Como encaja YaComanda con el Kit Digital</h2>
          <p>
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            es un sistema de pedidos por WhatsApp con inteligencia artificial
            para restaurantes. Encaja en la categoria de{" "}
            <strong>Comercio Electronico</strong> del Kit Digital porque:
          </p>
          <ul>
            <li>
              Es un canal de venta digital que permite a tus clientes hacer
              pedidos y pagar directamente.
            </li>
            <li>
              Incluye catalogo de productos, gestion de pedidos y cobro
              automatizado.
            </li>
            <li>
              Cumple los requisitos tecnicos que exige el programa (plataforma
              web, pasarela de pago, panel de gestion).
            </li>
          </ul>
          <p>
            Esto significa que puedes usar tu bono digital para cubrir el coste
            de YaComanda durante 12 meses. Para un restaurante del segmento II
            (3-9 empleados), la subvencion cubre de sobra la suscripcion anual.
          </p>

          <h2>Errores comunes al solicitar el Kit Digital</h2>
          <ul>
            <li>
              <strong>Esperar demasiado:</strong> los fondos son limitados. Cada
              convocatoria se cierra cuando se agotan.
            </li>
            <li>
              <strong>No tener el certificado digital:</strong> necesitas
              certificado electronico o Cl@ve para hacer el tramite. Sacalo
              antes de empezar.
            </li>
            <li>
              <strong>Elegir una solucion que no uses:</strong> el objetivo es
              digitalizar de verdad, no &ldquo;gastar&rdquo; el bono. Elige
              algo que tu restaurante vaya a usar cada dia.
            </li>
            <li>
              <strong>No comprobar las obligaciones fiscales:</strong> si tienes
              alguna deuda con Hacienda o la Seguridad Social, resolvela antes
              de solicitar.
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Solicita YaComanda gratis con Kit Digital
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Te ayudamos con el tramite. Cubre el 100% del coste con tu bono
            digital.
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

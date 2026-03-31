import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, X, Minus } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Como crear un menu digital gratis para tu restaurante en 2026 — YaComanda",
  description:
    "5 formas de crear un menu digital para tu restaurante: desde PDF con QR hasta menus integrados con pedidos por WhatsApp. Comparativa con pros, contras y costes.",
  keywords: [
    "menu digital restaurante gratis",
    "carta digital restaurante",
    "menu qr restaurante",
    "crear menu digital",
    "menu whatsapp restaurante",
    "carta digital gratis",
    "menu qr gratis restaurante",
  ],
  openGraph: {
    title: "Como crear un menu digital gratis para tu restaurante (2026)",
    description:
      "5 opciones reales para tener un menu digital en tu restaurante. Comparativa honesta con costes y limitaciones.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Como crear un menu digital gratis para tu restaurante en 2026"
      description="5 formas de crear un menu digital para tu restaurante con pros, contras y costes reales."
      slug="menu-digital-gratis-restaurante"
      datePublished="2026-03-31"
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
          <span className="text-slate-400">31 marzo 2026</span>
          <span className="text-slate-400">8 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Como crear un menu digital gratis para tu restaurante en 2026
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          El cliente llega, escanea un QR y ve tu carta en el movil. O
          mejor: te escribe por WhatsApp y un bot le muestra el menu y
          toma su pedido. El menu digital ya no es opcional — es lo que
          tus clientes esperan. Pero, ¿cual es la mejor opcion? Aqui
          tienes 5 formas de hacerlo, con pros, contras y costes reales.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>¿Por que necesitas un menu digital?</h2>
          <p>
            Despues de la pandemia, el 70% de los clientes prefieren ver
            la carta en su propio movil. Pero mas alla de la higiene, un
            menu digital bien hecho:
          </p>
          <ul>
            <li>Se actualiza en segundos (cambio de precio, plato agotado)</li>
            <li>No tiene coste de impresion</li>
            <li>Puede incluir fotos de alta calidad de tus platos</li>
            <li>Si esta bien hecho, puede tomar pedidos directamente</li>
          </ul>

          <h2>1. PDF + codigo QR</h2>
          <p>
            La opcion mas basica: creas un PDF con tu carta, lo subes a
            Google Drive o tu web, y generas un codigo QR que apunta a ese
            enlace. Gratis.
          </p>
          <ul>
            <li><strong>Coste:</strong> $0</li>
            <li><strong>Pros:</strong> rapido de hacer, funciona en cualquier movil</li>
            <li><strong>Contras:</strong> estatico (cada cambio requiere subir un nuevo PDF), sin fotos interactivas, no toma pedidos, la experiencia del cliente es pobre (hacer zoom en un PDF en el movil)</li>
          </ul>
          <p><strong>Ideal para:</strong> solucion temporal mientras implementas algo mejor.</p>

          <h2>2. Google Sites o Canva</h2>
          <p>
            Creas una pagina web simple con tu carta usando Google Sites
            (gratis) o Canva (gratis con limitaciones). Se ve mejor que un
            PDF y puedes anadir fotos.
          </p>
          <ul>
            <li><strong>Coste:</strong> $0</li>
            <li><strong>Pros:</strong> se ve bien en movil, puedes anadir fotos, facil de editar</li>
            <li><strong>Contras:</strong> no toma pedidos, la URL se ve poco profesional (sites.google.com/tu-restaurante), no tiene estructura de carta real (secciones, precios alineados, extras)</li>
          </ul>
          <p><strong>Ideal para:</strong> restaurantes que quieren algo visual sin gastar.</p>

          <h2>3. Plataformas de menu digital</h2>
          <p>
            Herramientas especializadas como GloriaFood, Flavor o
            CartaDirecta que generan un menu interactivo con QR incluido.
          </p>
          <ul>
            <li><strong>Coste:</strong> desde $0 (con marca de agua y limitaciones) hasta $20-50 USD/mes</li>
            <li><strong>Pros:</strong> diseno profesional, secciones organizadas, fotos, alergenos, idiomas</li>
            <li><strong>Contras:</strong> la version gratis suele tener publicidad o branding de la plataforma. Muchas no integran pedidos reales — solo muestran la carta</li>
          </ul>
          <p><strong>Ideal para:</strong> restaurantes que quieren un menu bonito para escanear en mesa.</p>

          <h2>4. Instagram como carta</h2>
          <p>
            Muchos restaurantes usan las stories destacadas de Instagram
            como menu visual. Cada destacado es una categoria (entrantes,
            principales, postres).
          </p>
          <ul>
            <li><strong>Coste:</strong> $0</li>
            <li><strong>Pros:</strong> visual, atractivo, tus seguidores ya lo ven</li>
            <li><strong>Contras:</strong> no es un menu real (sin precios claros, sin estructura), el cliente tiene que navegar stories, no funciona para pedidos, depende de que el cliente tenga Instagram</li>
          </ul>
          <p><strong>Ideal para:</strong> complemento visual, no como menu principal.</p>

          <h2>5. Menu integrado con pedidos por WhatsApp</h2>
          <p>
            La opcion mas completa: un menu digital que no solo muestra la
            carta sino que permite pedir directamente. El cliente ve el
            menu, elige lo que quiere y el pedido llega a cocina — todo por
            WhatsApp.
          </p>
          <ul>
            <li><strong>Coste:</strong> desde $29 USD/mes</li>
            <li>
              <strong>Pros:</strong> el menu ES el sistema de pedidos. Sin
              friccion (el cliente ya tiene WhatsApp). Cobro automatico.
              Pantalla de cocina incluida. Datos de clientes propios.
            </li>
            <li><strong>Contras:</strong> coste mensual, requiere configuracion inicial</li>
          </ul>
          <p>
            <Link href="/" className="text-green-600 font-semibold">
              YaComanda
            </Link>{" "}
            funciona asi. Subes tu carta, conectas WhatsApp, y tus clientes
            pueden pedir directo con un bot de IA que entiende texto, audio
            y hasta fotos. 30 dias gratis para probarlo.
          </p>

          <h2>Comparativa rapida</h2>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-3 py-3 text-left font-semibold">Opcion</th>
                  <th className="px-3 py-3 text-center font-semibold">Coste</th>
                  <th className="px-3 py-3 text-center font-semibold">Toma pedidos</th>
                  <th className="px-3 py-3 text-center font-semibold">Cobra solo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-3 font-medium">PDF + QR</td>
                  <td className="px-3 py-3 text-center">$0</td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Google Sites / Canva</td>
                  <td className="px-3 py-3 text-center">$0</td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Plataforma de menu</td>
                  <td className="px-3 py-3 text-center">$0-50/mes</td>
                  <td className="px-3 py-3 text-center"><Minus className="mx-auto size-4 text-amber-500" /></td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-medium">Instagram</td>
                  <td className="px-3 py-3 text-center">$0</td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                  <td className="px-3 py-3 text-center"><X className="mx-auto size-4 text-red-500" /></td>
                </tr>
                <tr className="bg-green-50">
                  <td className="px-3 py-3 font-bold text-green-700">Menu + WhatsApp bot</td>
                  <td className="px-3 py-3 text-center font-semibold text-green-700">$29/mes</td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-600" /></td>
                  <td className="px-3 py-3 text-center"><Check className="mx-auto size-4 text-green-600" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>La diferencia real: un menu que vende vs un menu que muestra</h2>
          <p>
            Un PDF o una pagina bonita le muestra la carta al cliente. Pero
            despues, el cliente tiene que llamar, escribir un WhatsApp, o ir
            al mostrador. Cada paso extra es una oportunidad de que el
            cliente se distraiga o desista.
          </p>
          <p>
            Un menu integrado con pedidos elimina esa friccion. El cliente
            ve la carta, elige, paga y ya. El pedido llega a cocina. Cero
            pasos manuales. Eso no es solo un menu digital — es un canal
            de venta.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Tu menu digital que tambien toma pedidos
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            30 dias gratis. Sin tarjeta. Sube tu carta en 15 minutos.
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

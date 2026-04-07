import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "App para pedidos de restaurante sin comisiones: 7 opciones en 2026 — YaComanda",
  description:
    "Comparativa de apps y sistemas para recibir pedidos en tu restaurante sin pagar comisiones por pedido. WhatsApp, web propia, QR y mas. Con precios reales.",
  openGraph: {
    title: "App para pedidos de restaurante sin comisiones (2026)",
    description:
      "7 alternativas reales para recibir pedidos sin pagar el 30% a Glovo o Uber Eats.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="App para pedidos de restaurante sin comisiones: 7 opciones en 2026"
      description="Comparativa de apps y sistemas para recibir pedidos en tu restaurante sin pagar comisiones por pedido."
      slug="app-pedidos-restaurante-sin-comisiones"
      datePublished="2026-04-07"
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
          <span className="text-slate-400">7 abril 2026</span>
          <span className="text-slate-400">10 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          App para pedidos de restaurante sin comisiones: 7 opciones reales en 2026
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Glovo se lleva el 30%. Uber Eats el 25%. Y tu margen desaparece pedido a pedido. Si estas buscando una forma de recibir pedidos online <strong>sin pagar comisiones por cada venta</strong>, esta guia es para ti.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">

          <h2>¿Por que buscar alternativas sin comisiones?</h2>
          <p>
            Un restaurante con 200 pedidos al mes y un ticket medio de 20€ paga entre <strong>1.000€ y 1.400€ mensuales en comisiones</strong> a plataformas como Glovo. Eso son entre 12.000€ y 16.800€ al ano que salen directamente de tu bolsillo.
          </p>
          <p>
            Las alternativas sin comisiones funcionan con <strong>tarifa plana</strong>: pagas lo mismo sin importar cuantos pedidos recibas. Cuanto mas vendes, mas ahorras.
          </p>

          <h2>Comparativa rapida</h2>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="pb-3 pr-4 font-bold text-slate-900">Sistema</th>
                  <th className="pb-3 pr-4 font-bold text-slate-900">Canal</th>
                  <th className="pb-3 pr-4 font-bold text-slate-900">Precio</th>
                  <th className="pb-3 font-bold text-slate-900">Comision/pedido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-green-50">
                  <td className="py-3 pr-4 font-semibold text-green-700">YaComanda</td>
                  <td className="py-3 pr-4 text-slate-600">WhatsApp (IA)</td>
                  <td className="py-3 pr-4 text-slate-600">Desde 29€/mes</td>
                  <td className="py-3 font-bold text-green-600">0%</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-700">WooCommerce</td>
                  <td className="py-3 pr-4 text-slate-600">Web propia</td>
                  <td className="py-3 pr-4 text-slate-600">Gratis (+ hosting)</td>
                  <td className="py-3 text-slate-600">0%</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-700">GloriaFood</td>
                  <td className="py-3 pr-4 text-slate-600">Web / App</td>
                  <td className="py-3 pr-4 text-slate-600">Gratis (plan basico)</td>
                  <td className="py-3 text-slate-600">0%</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-700">Flipdish</td>
                  <td className="py-3 pr-4 text-slate-600">Web / App</td>
                  <td className="py-3 pr-4 text-slate-600">Desde 99€/mes</td>
                  <td className="py-3 text-slate-600">0%</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-700">Ordering.co</td>
                  <td className="py-3 pr-4 text-slate-600">Web / App</td>
                  <td className="py-3 pr-4 text-slate-600">Desde 99$/mes</td>
                  <td className="py-3 text-slate-600">0%</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-700">Menu QR manual</td>
                  <td className="py-3 pr-4 text-slate-600">QR + WhatsApp</td>
                  <td className="py-3 pr-4 text-slate-600">Gratis</td>
                  <td className="py-3 text-slate-600">0%</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-700">Google Forms</td>
                  <td className="py-3 pr-4 text-slate-600">Web (formulario)</td>
                  <td className="py-3 pr-4 text-slate-600">Gratis</td>
                  <td className="py-3 text-slate-600">0%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>1. YaComanda — Pedidos por WhatsApp con IA</h2>
          <p>
            <strong>Ideal para:</strong> restaurantes que ya reciben pedidos por WhatsApp y quieren automatizarlo.
          </p>
          <p>
            YaComanda conecta un chatbot de inteligencia artificial al WhatsApp de tu restaurante. Cuando un cliente escribe para pedir, el bot entiende el pedido (texto, audio o fotos), confirma los detalles, cobra automaticamente con tarjeta y envia la comanda a cocina. Tu no tocas el movil.
          </p>
          <ul>
            <li><strong>Ventaja principal:</strong> los clientes piden por el canal que ya usan (WhatsApp), sin descargar apps ni crear cuentas</li>
            <li><strong>Precio:</strong> desde 29€/mes (plan Esencial, 500 pedidos). Prueba gratis 30 dias</li>
            <li><strong>Incluye:</strong> dashboard en tiempo real, analiticas, CRM de clientes, cobro automatico</li>
            <li><strong>Kit Digital:</strong> subvencionable al 100% para pymes en Espana</li>
          </ul>
          <p>
            <Link href="/calculadora-comisiones" className="font-semibold">Calcula cuanto ahorrarias con YaComanda →</Link>
          </p>

          <h2>2. WooCommerce con plugin de pedidos</h2>
          <p>
            <strong>Ideal para:</strong> restaurantes con conocimientos tecnicos o que ya tienen una web con WordPress.
          </p>
          <p>
            WooCommerce es gratuito, pero necesitas un hosting (desde 5-15€/mes), dominio, y configurar todo tu mismo: carta, pasarela de pago, diseno. Hay plugins especificos para restaurantes como RestroPress.
          </p>
          <ul>
            <li><strong>Ventaja:</strong> control total, sin comisiones, personalizable</li>
            <li><strong>Desventaja:</strong> requiere mantenimiento tecnico, actualizaciones, y el cliente tiene que entrar en tu web para pedir (no WhatsApp)</li>
          </ul>

          <h2>3. GloriaFood</h2>
          <p>
            <strong>Ideal para:</strong> restaurantes que quieren un sistema de pedidos web basico sin coste.
          </p>
          <p>
            GloriaFood ofrece un plan gratuito con menu online, pedidos y reservas. Se integra con tu web existente como widget. El plan gratuito incluye lo basico; funciones avanzadas (pago online, marketing) requieren plan de pago.
          </p>
          <ul>
            <li><strong>Ventaja:</strong> plan gratuito real, facil de montar</li>
            <li><strong>Desventaja:</strong> el plan gratuito no incluye pago online. Funciones avanzadas cuestan 29-49€/mes. No tiene canal WhatsApp</li>
          </ul>

          <h2>4. Flipdish</h2>
          <p>
            <strong>Ideal para:</strong> restaurantes medianos y cadenas que quieren una app propia con su marca.
          </p>
          <p>
            Flipdish crea una app y web personalizadas con tu marca. Incluye pedidos online, fidelizacion y marketing. Es una solucion mas completa pero tambien mas cara.
          </p>
          <ul>
            <li><strong>Ventaja:</strong> app con tu marca, sistema completo</li>
            <li><strong>Desventaja:</strong> precio alto (desde 99€/mes), requiere que tus clientes descarguen tu app</li>
          </ul>

          <h2>5. Ordering.co</h2>
          <p>
            <strong>Ideal para:</strong> cadenas y dark kitchens que necesitan multi-tienda y personalizacion total.
          </p>
          <p>
            Plataforma de pedidos white-label con app, web y panel de administracion. Muy personalizable pero orientada a negocios mas grandes.
          </p>
          <ul>
            <li><strong>Ventaja:</strong> multi-tienda, multi-marca, muy configurable</li>
            <li><strong>Desventaja:</strong> precio elevado (desde 99$/mes), curva de aprendizaje</li>
          </ul>

          <h2>6. Menu QR + WhatsApp manual</h2>
          <p>
            <strong>Ideal para:</strong> restaurantes que quieren empezar hoy sin gastar nada.
          </p>
          <p>
            La version mas simple: creas un PDF o imagen con tu carta, generas un QR gratis (con cualquier generador), y los clientes escanean, ven la carta y escriben su pedido por WhatsApp. Tu lo procesas manualmente.
          </p>
          <ul>
            <li><strong>Ventaja:</strong> 100% gratis, funciona hoy</li>
            <li><strong>Desventaja:</strong> manual al 100%. Tu (o tu equipo) tienen que leer cada mensaje, confirmar, calcular precios y cobrar. No escala con volumen</li>
          </ul>

          <h2>7. Google Forms</h2>
          <p>
            <strong>Ideal para:</strong> prueba rapida con pocos pedidos al dia.
          </p>
          <p>
            Crea un formulario con tu carta, comparte el enlace. Los pedidos llegan a un Google Sheet. Gratis y funcional, pero la experiencia del cliente es pobre.
          </p>
          <ul>
            <li><strong>Ventaja:</strong> gratis, se monta en 30 minutos</li>
            <li><strong>Desventaja:</strong> experiencia de pedido muy basica, no hay cobro integrado, no hay confirmacion automatica</li>
          </ul>

          <h2>¿Cual elegir?</h2>

          <p>Depende de tu situacion:</p>

          <ul>
            <li><strong>Si tus clientes ya te escriben por WhatsApp</strong> → <Link href="/">YaComanda</Link>. Automatizas lo que ya haces sin cambiar de canal.</li>
            <li><strong>Si quieres una web de pedidos basica gratis</strong> → GloriaFood. Funcional pero limitada.</li>
            <li><strong>Si tienes un equipo tecnico</strong> → WooCommerce. Control total, pero requiere mantenimiento.</li>
            <li><strong>Si eres una cadena</strong> → Flipdish o Ordering.co. Mas potentes, mas caras.</li>
            <li><strong>Si quieres probar hoy mismo sin gastar nada</strong> → Menu QR manual. Pero prepara el movil.</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            Pagar el 30% de cada pedido a una plataforma de delivery no es sostenible para la mayoria de restaurantes. Las alternativas existen y cada vez son mejores. Lo importante es elegir la que se adapte a tu negocio y a tus clientes.
          </p>
          <p>
            Si tus clientes usan WhatsApp (y en Espana y Latinoamerica, lo usan), automatizar ese canal con IA es probablemente la forma mas rapida y natural de empezar a recibir pedidos directos.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <p className="text-lg font-bold text-slate-900">
            ¿Quieres probar pedidos por WhatsApp sin comisiones?
          </p>
          <p className="mt-2 text-sm text-slate-500">
            30 dias gratis. Sin tarjeta de credito. Configuracion en 15 minutos.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/sign-up">
              <Button className="rounded-xl bg-green-500 px-8 text-white hover:bg-green-400">
                Empieza gratis <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/calculadora-comisiones">
              <Button variant="outline" className="rounded-xl">
                Calcula tu ahorro
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-green-600"
          >
            <ArrowLeft className="size-4" />
            Volver al blog
          </Link>
        </div>
      </div>
    </article>
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "Pedidos online para tu restaurante sin necesitar una app propia — YaComanda",
  description:
    "Descubre como recibir pedidos online en tu restaurante sin desarrollar una app propia. Alternativas reales ordenadas por coste y efectividad.",
  keywords: [
    "pedidos online restaurante",
    "pedidos online sin app",
    "restaurante sin app propia",
    "sistema pedidos restaurante",
    "recibir pedidos online restaurante",
  ],
  openGraph: {
    title: "Pedidos online para tu restaurante sin necesitar una app propia",
    description:
      "5 formas de recibir pedidos online en tu restaurante sin gastar miles de euros en una app. Comparativa con costes reales.",
  },
};

export default function Post() {
  return (
    <>
    <BlogPostingJsonLd
      title="Pedidos online para tu restaurante sin necesitar una app propia"
      description="Descubre como recibir pedidos online en tu restaurante sin desarrollar una app propia. Alternativas reales ordenadas por coste y efectividad."
      slug="pedidos-online-restaurante-sin-app"
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
          <span className="text-slate-400">9 min lectura</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Pedidos online para tu restaurante sin necesitar una app propia
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-slate-500">
          Desarrollar una app propia para tu restaurante cuesta entre 10.000€
          y 50.000€. Y despues de gastar ese dinero, casi nadie se la
          descarga. Hay formas mucho mejores, mas baratas y mas efectivas de
          recibir pedidos online. En esta guia te las explicamos todas.
        </p>

        <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
          <h2>El problema de las apps propias para restaurantes</h2>
          <p>
            La idea suena bien: tu propia app con tu marca, tu carta, tu
            sistema de fidelizacion. El cliente se la descarga, hace pedidos
            directamente y te ahorras las comisiones de Glovo o Uber Eats.
            En la practica, es un desastre para el 99% de restaurantes.
          </p>

          <h3>Los numeros no mienten</h3>
          <ul>
            <li>
              <strong>Coste de desarrollo:</strong> una app basica con
              pedidos, pagos y notificaciones push cuesta entre 10.000€ y
              20.000€. Si quieres algo decente con panel de gestion, programa
              de fidelizacion y versiones iOS + Android, facilmente llegas a
              30.000-50.000€.
            </li>
            <li>
              <strong>Mantenimiento anual:</strong> actualizaciones de iOS y
              Android, correccion de bugs, hosting de servidores. Calcula
              3.000-8.000€ al ano minimo.
            </li>
            <li>
              <strong>Descargas:</strong> la app media de un restaurante
              local tiene menos de 500 descargas. Muchas no llegan ni a 100.
            </li>
            <li>
              <strong>Retencion:</strong> el 80% de los usuarios que se
              descargan una app de restaurante la desinstalan en los
              primeros 30 dias. No la vuelven a abrir.
            </li>
            <li>
              <strong>Competencia en la store:</strong> tu app compite con
              millones de apps por atencion. Nadie busca &ldquo;Pizzeria
              Lopez app&rdquo; en Google Play.
            </li>
          </ul>
          <p>
            <strong>Resultado:</strong> inviertes decenas de miles de euros
            en una app que usan 50 clientes y que tienes que mantener
            indefinidamente. No tiene sentido para un restaurante local o
            incluso una cadena pequena.
          </p>

          <h2>La realidad: tus clientes no quieren otra app</h2>
          <p>
            El usuario medio tiene 80 apps instaladas en su movil pero solo
            usa 9 al dia. Las apps de restaurantes no estan entre esas 9. Tu
            cliente ya tiene WhatsApp, Instagram, Google Maps y el navegador.
            No necesita (ni quiere) descargar una app mas para pedirte una
            pizza.
          </p>
          <p>
            La friccion de descargar una app es enorme: buscar en la store,
            esperar la descarga, registrarse con email y contrasena, dar
            permisos de notificaciones... La mayoria de clientes abandonan
            antes de hacer su primer pedido.
          </p>

          <h2>5 alternativas para recibir pedidos online sin app propia</h2>
          <p>
            Estas son las opciones reales ordenadas de menos a mas
            efectividad. Todas son mejores que desarrollar una app.
          </p>

          <h3>1. WhatsApp manual (gratis)</h3>
          <p>
            La opcion mas basica: el cliente te escribe por WhatsApp y tu le
            respondes manualmente. Pide, tu confirmas, le dices el precio y
            el te paga en efectivo al recoger o con Bizum.
          </p>
          <ul>
            <li><strong>Coste:</strong> 0€</li>
            <li><strong>Pros:</strong> gratis, facil de empezar, sin tecnologia</li>
            <li>
              <strong>Contras:</strong> no escala. Cuando tienes 15-20
              pedidos al dia, una persona tiene que dedicar 2-3 horas solo a
              contestar mensajes. Hay errores de transcripcion, no puedes
              atender fuera de horario y no cobras automaticamente.
            </li>
            <li><strong>Mejor para:</strong> restaurantes que reciben menos de 5 pedidos al dia</li>
          </ul>

          <h3>2. Instagram y Facebook (gratis, pero limitado)</h3>
          <p>
            Algunos restaurantes reciben pedidos por DMs de Instagram o
            mensajes de Facebook. Tambien puedes usar la funcion de &ldquo;pedir
            comida&rdquo; que Meta ofrece en algunas regiones.
          </p>
          <ul>
            <li><strong>Coste:</strong> 0€</li>
            <li><strong>Pros:</strong> tus clientes ya estan ahi, puedes combinar con contenido visual</li>
            <li>
              <strong>Contras:</strong> no hay sistema de pago integrado,
              los mensajes se pierden entre notificaciones, no puedes
              gestionar un volumen medio de pedidos. La funcion de pedidos de
              Meta es muy limitada en Espana y requiere integracion con
              terceros.
            </li>
            <li><strong>Mejor para:</strong> pedidos puntuales o encargos especiales, no flujo diario</li>
          </ul>

          <h3>3. Google (ficha de negocio + pedidos)</h3>
          <p>
            Google Business Profile permite anadir un boton de
            &ldquo;Pedir&rdquo; en tu ficha de Google Maps. El cliente te
            busca, ve tu restaurante y puede hacer un pedido directamente.
            Requiere integracion con un partner de pedidos.
          </p>
          <ul>
            <li><strong>Coste:</strong> 0€ por la ficha (el partner puede cobrar comision)</li>
            <li><strong>Pros:</strong> buena visibilidad SEO, el cliente te encuentra buscando en Google</li>
            <li>
              <strong>Contras:</strong> depende de un tercero para el
              procesamiento, las opciones de partners en Espana son
              limitadas, no controlas la experiencia completa. Si el partner
              cobra comision, vuelves al mismo problema de Glovo.
            </li>
            <li><strong>Mejor para:</strong> complementar otros canales, no como canal principal</li>
          </ul>

          <h3>4. Pagina web con pedidos (coste medio)</h3>
          <p>
            Crear una pagina web con sistema de pedidos integrado. Puede ser
            desde un WordPress con plugin de pedidos hasta plataformas
            especializadas como GloriaFood o Flavor.
          </p>
          <ul>
            <li><strong>Coste:</strong> 0-100€/mes dependiendo de la plataforma</li>
            <li><strong>Pros:</strong> control total de la marca, carta actualizable, cobros online</li>
            <li>
              <strong>Contras:</strong> necesitas llevar trafico a la web
              (SEO, publicidad, redes sociales). El cliente tiene que salir
              de WhatsApp, abrir el navegador, navegar por la web, hacer el
              pedido y pagar. La tasa de abandono en cada paso es alta.
              Ademas, no tienes el numero del cliente para comunicarte
              despues.
            </li>
            <li><strong>Mejor para:</strong> restaurantes con presencia web fuerte y trafico organico</li>
          </ul>

          <h3>5. Bot de WhatsApp con IA (la mejor opcion)</h3>
          <p>
            Un bot con inteligencia artificial conectado a tu WhatsApp
            Business. El cliente te escribe como siempre (texto, audio, foto)
            y el bot interpreta el pedido, lo confirma, cobra y envia la
            comanda a cocina. Todo automatico, 24/7.
          </p>
          <ul>
            <li><strong>Coste:</strong> 39-79€/mes</li>
            <li><strong>Pros:</strong> automatico, funciona 24/7, cobra solo, el cliente no descarga nada, captura datos del cliente, cero errores</li>
            <li><strong>Contras:</strong> coste mensual (que se amortiza con 2-3 pedidos extra al mes)</li>
            <li><strong>Mejor para:</strong> cualquier restaurante que reciba mas de 5 pedidos al dia por WhatsApp</li>
          </ul>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold">
                    Alternativa
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Coste
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Automatizacion
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Cobros
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    24/7
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 text-slate-900">WhatsApp manual</td>
                  <td className="px-4 py-3 text-slate-500">0€</td>
                  <td className="px-4 py-3 text-slate-500">Ninguna</td>
                  <td className="px-4 py-3 text-slate-500">Bizum manual</td>
                  <td className="px-4 py-3 text-slate-500">No</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Instagram/Facebook</td>
                  <td className="px-4 py-3 text-slate-500">0€</td>
                  <td className="px-4 py-3 text-slate-500">Ninguna</td>
                  <td className="px-4 py-3 text-slate-500">No</td>
                  <td className="px-4 py-3 text-slate-500">No</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Google Business</td>
                  <td className="px-4 py-3 text-slate-500">0€ + comision partner</td>
                  <td className="px-4 py-3 text-slate-500">Parcial</td>
                  <td className="px-4 py-3 text-slate-500">Via partner</td>
                  <td className="px-4 py-3 text-slate-500">Si</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Web con pedidos</td>
                  <td className="px-4 py-3 text-slate-500">0-100€/mes</td>
                  <td className="px-4 py-3 text-slate-500">Si</td>
                  <td className="px-4 py-3 text-slate-500">Si</td>
                  <td className="px-4 py-3 text-slate-500">Si</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-slate-900">WhatsApp bot con IA</td>
                  <td className="px-4 py-3 text-slate-500">39-79€/mes</td>
                  <td className="px-4 py-3 text-slate-500">Total</td>
                  <td className="px-4 py-3 text-slate-500">Si (tarjeta + Bizum)</td>
                  <td className="px-4 py-3 text-slate-500">Si</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>App propia vs bot de WhatsApp: la comparativa definitiva</h2>
          <p>
            Para que quede claro por que un bot de WhatsApp gana a una app
            propia, aqui va la comparativa directa:
          </p>

          <div className="not-prose my-8 overflow-x-auto">
            <table className="w-full rounded-lg border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold">
                    Aspecto
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    App propia
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Bot WhatsApp con IA
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 text-slate-900">Coste inicial</td>
                  <td className="px-4 py-3 text-slate-500">10.000-50.000€</td>
                  <td className="px-4 py-3 text-slate-500">0€</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Coste mensual</td>
                  <td className="px-4 py-3 text-slate-500">250-700€ (hosting + mantenimiento)</td>
                  <td className="px-4 py-3 text-slate-500">39-79€</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Tiempo de lanzamiento</td>
                  <td className="px-4 py-3 text-slate-500">3-6 meses</td>
                  <td className="px-4 py-3 text-slate-500">1 hora</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Descarga necesaria</td>
                  <td className="px-4 py-3 text-slate-500">Si (friccion alta)</td>
                  <td className="px-4 py-3 text-slate-500">No (WhatsApp ya instalado)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Usuarios activos reales</td>
                  <td className="px-4 py-3 text-slate-500">50-200 (optimista)</td>
                  <td className="px-4 py-3 text-slate-500">Todos tus clientes de WhatsApp</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Tasa de retencion</td>
                  <td className="px-4 py-3 text-slate-500">20% a los 30 dias</td>
                  <td className="px-4 py-3 text-slate-500">No aplica (no se desinstala)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-slate-900">Notificaciones</td>
                  <td className="px-4 py-3 text-slate-500">Bloqueadas por el 60% de usuarios</td>
                  <td className="px-4 py-3 text-slate-500">100% entregadas (es WhatsApp)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Por que WhatsApp gana a cualquier app de restaurante</h2>
          <p>
            La ventaja de WhatsApp no es solo que es gratis o que ya esta
            instalado. Es que cambia completamente la dinamica de la relacion
            con el cliente:
          </p>
          <ul>
            <li>
              <strong>No hay barrera de entrada:</strong> el cliente no tiene
              que registrarse, crear cuenta, recordar contrasena ni descargar
              nada. Abre WhatsApp y te escribe. Ya esta.
            </li>
            <li>
              <strong>Las notificaciones funcionan de verdad:</strong> un
              mensaje de WhatsApp tiene una tasa de apertura del 98%. Una
              notificacion push de una app de restaurante tiene menos del
              10%. Cuando quieras enviar una promocion, la diferencia es
              brutal.
            </li>
            <li>
              <strong>Todos saben usarlo:</strong> tu abuela sabe usar
              WhatsApp. Probablemente no sabe instalar una app nueva y
              registrarse. WhatsApp elimina la barrera tecnologica.
            </li>
            <li>
              <strong>El historial se queda:</strong> la conversacion
              permanece en el chat del cliente. Cuando quiera volver a pedir,
              abre la conversacion y escribe. No necesita buscar tu app
              entre las 80 que tiene instaladas.
            </li>
            <li>
              <strong>Funciona en cualquier movil:</strong> WhatsApp
              funciona en Android basicos, iPhones antiguos, y hasta en
              WhatsApp Web. Tu app necesita estar actualizada para cada
              version de iOS y Android, lo que genera costes de
              mantenimiento constantes.
            </li>
            <li>
              <strong>Canal bidireccional:</strong> con WhatsApp no solo
              recibes pedidos. Puedes enviar confirmaciones, estado del
              pedido, promociones personalizadas y encuestas de
              satisfaccion. Todo en el mismo canal que el cliente ya usa
              todos los dias.
            </li>
          </ul>

          <div className="not-prose my-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="space-y-3 text-sm">
              <div className="w-fit rounded-2xl rounded-tl-md bg-white px-4 py-2.5 shadow-sm">
                &ldquo;Hola! Quiero pedir para llevar: una pizza cuatro
                quesos familiar y dos cocas zero. Paso en 20 min.&rdquo;
              </div>
              <div className="ml-auto w-fit rounded-2xl rounded-br-md bg-green-500 px-4 py-2.5 text-white">
                Hola! Tu pedido: 1x Pizza Cuatro Quesos Familiar (14,90€),
                2x Coca-Cola Zero (2,50€ c/u). Total: 19,90€. Recogida en
                20 min. Paga aqui para confirmar: [enlace de pago]
              </div>
            </div>
          </div>

          <h2>Como empezar a recibir pedidos online sin app</h2>
          <p>
            Si ya tienes un numero de WhatsApp Business (o incluso uno
            personal que usas para el restaurante), puedes empezar hoy
            mismo:
          </p>
          <ol>
            <li>
              <strong>Paso 1:</strong> decide si vas a gestionar pedidos
              manualmente o automatizarlos con un bot. Si recibes menos de 5
              pedidos al dia, puedes empezar manual. Si recibes mas, un bot
              te ahorrara horas.
            </li>
            <li>
              <strong>Paso 2:</strong> si eliges automatizar, registrate en{" "}
              <Link href="/" className="text-green-600 font-semibold">
                YaComanda
              </Link>{" "}
              (o la plataforma que prefieras). Sube tu carta y configura
              horarios y metodos de pago.
            </li>
            <li>
              <strong>Paso 3:</strong> conecta tu numero de WhatsApp
              Business con la API oficial. El proceso tarda unos 10 minutos
              y no pierdes tu numero ni tus contactos.
            </li>
            <li>
              <strong>Paso 4:</strong> haz pedidos de prueba para verificar
              que todo funciona: interpretacion de pedidos, precios, cobros y
              que la comanda llega a cocina.
            </li>
            <li>
              <strong>Paso 5:</strong> comparte tu numero. Pon un QR en el
              local, anadelo a tu ficha de Google, ponlo en redes sociales y
              en tu web. Cuanto mas visible sea, mas pedidos recibiras.
            </li>
          </ol>

          <h2>Conclusion: no gastes en una app, usa lo que tus clientes ya tienen</h2>
          <p>
            Desarrollar una app propia para tu restaurante es tirar dinero
            para la inmensa mayoria de negocios de hosteleria. Tus clientes
            ya tienen WhatsApp, ya lo usan a diario y ya te escriben por
            ahi para pedir. La solucion no es crear una app nueva sino
            optimizar el canal que ya funciona.
          </p>
          <p>
            Un bot de WhatsApp con IA te permite recibir pedidos online las
            24 horas, cobrar automaticamente, enviar comandas a cocina y
            capturar datos de clientes. Todo sin que el cliente descargue
            nada. Y por una fraccion del coste de una app.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900">
            Prueba YaComanda gratis 30 dias
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Recibe pedidos online por WhatsApp sin app, sin comisiones y sin
            permanencia. Activo en 15 minutos.
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

import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostingJsonLd } from "@/components/marketing/json-ld";

export const metadata: Metadata = {
  title:
    "10 estrategias para atraer clientes a tu restaurante en 2026 (que realmente funcionan) — YaComanda",
  description:
    "Descubre 10 estrategias de marketing para restaurantes que funcionan en 2026. Google Business, WhatsApp, SEO local, reviews y mas. Guia practica sin relleno.",
  keywords: [
    "como atraer clientes restaurante",
    "marketing restaurante",
    "ideas para restaurante",
    "estrategias restaurante 2026",
    "atraer clientes restaurante 2026",
    "marketing digital restaurante",
    "como conseguir clientes restaurante",
    "promocionar restaurante",
  ],
  openGraph: {
    title:
      "10 estrategias para atraer clientes a tu restaurante en 2026",
    description:
      "Estrategias de marketing que realmente funcionan para restaurantes. Google Business, WhatsApp, SEO local, reviews y mas.",
  },
};

export default function Post() {
  return (
    <>
      <BlogPostingJsonLd
        title="10 estrategias para atraer clientes a tu restaurante en 2026 (que realmente funcionan)"
        description="Descubre 10 estrategias de marketing para restaurantes que funcionan en 2026. Google Business, WhatsApp, SEO local, reviews y mas. Guia practica sin relleno."
        slug="como-atraer-clientes-restaurante"
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
            <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-0.5 text-xs font-semibold text-purple-600">
              Marketing
            </span>
            <span className="text-slate-400">2 abril 2026</span>
            <span className="text-slate-400">12 min lectura</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            10 estrategias para atraer clientes a tu restaurante en 2026
            (que realmente funcionan)
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-500">
            &quot;Publica en redes&quot;, &quot;haz descuentos&quot;,
            &quot;pon musica bonita&quot;. Si buscas como atraer clientes a
            tu restaurante, el 90% de los consejos que encuentras son
            genericos, vagos o directamente inservibles. Aqui no vas a
            encontrar eso. Estas son 10 estrategias concretas que
            funcionan en 2026, con pasos claros para implementarlas hoy y
            el impacto real que puedes esperar. Sin teoria, sin relleno.
          </p>

          <div className="prose prose-slate mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline">
            {/* -------- 1 -------- */}
            <h2>1. Optimiza tu perfil de Google Business (gratis y alto impacto)</h2>

            <p>
              Tu perfil de Google Business (antes Google My Business) es
              probablemente la herramienta de marketing mas poderosa que
              tienes — y es gratis. Cuando alguien busca &quot;restaurante
              cerca de mi&quot; o &quot;donde comer en [tu ciudad]&quot;,
              Google muestra 3 resultados locales antes que cualquier
              pagina web. Si no estas ahi, no existes.
            </p>

            <p><strong>¿Por que funciona en 2026?</strong></p>
            <p>
              Google sigue premiando los perfiles completos y activos. Con
              las busquedas por voz en aumento (&quot;Ok Google, restaurante
              mexicano cerca&quot;), tu perfil es lo primero que el
              asistente lee.
            </p>

            <p><strong>Como empezar hoy:</strong></p>
            <ol>
              <li>
                <strong>Reclama y verifica tu perfil</strong> en{" "}
                <a href="https://business.google.com" target="_blank" rel="noopener noreferrer">
                  business.google.com
                </a>
                . Si ya lo tienes, revisalo.
              </li>
              <li>
                <strong>Completa todo:</strong> horarios actualizados (incluyendo
                festivos), categoria principal + secundarias, telefono,
                web, enlace a tu menu digital, atributos (terraza, wifi,
                accesibilidad).
              </li>
              <li>
                <strong>Sube fotos reales</strong> de tus platos, el local por
                dentro y por fuera. Minimo 10. Los perfiles con mas de 10
                fotos reciben un 35% mas de clics.
              </li>
              <li>
                <strong>Publica una vez por semana:</strong> menu del dia, plato
                nuevo, evento especial. Google favorece los perfiles
                activos.
              </li>
              <li>
                <strong>Anade un link de pedidos</strong> a tu{" "}
                <Link href="/blog/menu-digital-gratis-restaurante">
                  menu digital
                </Link>{" "}
                o a tu WhatsApp de pedidos.
              </li>
            </ol>

            <p>
              <strong>Impacto esperado:</strong> un perfil bien optimizado
              puede aumentar tus visitas desde Google entre un 30-70% en
              las primeras 4 semanas. Es lo primero que deberias hacer.
            </p>

            {/* -------- 2 -------- */}
            <h2>2. WhatsApp como canal de ventas (no solo de mensajes)</h2>

            <p>
              La mayoria de restaurantes usan WhatsApp para responder
              preguntas. Eso esta bien, pero se quedan a medio camino.
              WhatsApp puede ser tu canal de ventas principal: el cliente
              ve el menu, elige, pide y paga — todo sin salir de la
              conversacion.
            </p>

            <p><strong>¿Por que funciona en 2026?</strong></p>
            <p>
              En Latinoamerica y Espana, WhatsApp es la app que mas se usa.
              No necesitas que el cliente descargue nada. Ya la tiene. Ya
              la abre 25 veces al dia. Y el 90% de los mensajes se leen en
              menos de 3 minutos.
            </p>

            <p><strong>Como empezar hoy:</strong></p>
            <ol>
              <li>
                Instala <strong>WhatsApp Business</strong> con un numero
                exclusivo para el restaurante.
              </li>
              <li>
                Configura tu catalogo con fotos, precios y descripciones
                de tus platos principales.
              </li>
              <li>
                Crea un mensaje de bienvenida automatico que incluya un
                link a tu{" "}
                <Link href="/blog/menu-digital-gratis-restaurante">
                  menu digital
                </Link>
                .
              </li>
              <li>
                Para el siguiente nivel, conecta un{" "}
                <Link href="/blog/como-vender-comida-por-whatsapp">
                  bot de pedidos por WhatsApp
                </Link>{" "}
                que automatice todo el proceso: menu, carrito, cobro y
                comanda a cocina.
              </li>
            </ol>

            <p>
              <strong>Impacto esperado:</strong> los restaurantes que
              activan WhatsApp como canal de pedidos suelen ver un
              incremento del 15-25% en pedidos directos en el primer mes.
              Si automatizas con un bot, puedes recibir pedidos 24/7 sin
              que nadie tenga que responder.
            </p>

            {/* -------- 3 -------- */}
            <h2>3. Menus QR que capturan clientes recurrentes</h2>

            <p>
              El menu con codigo QR ya no es novedad. Pero la mayoria de
              restaurantes lo usan mal: ponen un PDF que tarda en cargar y
              que el cliente cierra sin hacer nada. El verdadero poder del
              menu QR es que cada persona que lo escanea puede convertirse
              en un cliente recurrente.
            </p>

            <p><strong>¿Por que funciona en 2026?</strong></p>
            <p>
              Los clientes ya saben escanear QR. La barrera desaparecio. Lo
              que importa ahora es que ese menu sea una puerta de entrada:
              a tus pedidos online, a tu WhatsApp, a tu lista de
              promociones.
            </p>

            <p><strong>Como empezar hoy:</strong></p>
            <ol>
              <li>
                Crea un{" "}
                <Link href="/blog/menu-digital-gratis-restaurante">
                  menu digital gratuito
                </Link>{" "}
                (no un PDF, un menu web interactivo).
              </li>
              <li>
                Incluye un boton de &quot;Pedir por WhatsApp&quot; o
                &quot;Hacer pedido&quot; directamente en el menu.
              </li>
              <li>
                Anade un CTA sutil: &quot;Recibe ofertas exclusivas por
                WhatsApp&quot; con un link para unirse a tu lista de
                difusion.
              </li>
              <li>
                Imprime los QR en las mesas, en el mostrador, en la
                factura y en la bolsa del delivery.
              </li>
            </ol>

            <p>
              <strong>Impacto esperado:</strong> un menu QR bien hecho con
              CTA de WhatsApp puede capturar un 5-10% de los clientes que
              lo escanean como contactos recurrentes. Son clientes a los
              que luego puedes enviar promociones directas.
            </p>

            {/* -------- 4 -------- */}
            <h2>
              4. Contenido de cocina en Instagram Reels y TikTok
              (behind-the-scenes)
            </h2>

            <p>
              No necesitas ser influencer ni tener una camara profesional.
              Los videos que mejor funcionan para restaurantes son los mas
              simples: un plato siendo preparado, la cocina en plena hora
              punta, el antes y el despues de una receta. Contenido real,
              sin guion, sin filtros.
            </p>

            <p><strong>¿Por que funciona en 2026?</strong></p>
            <p>
              El algoritmo de TikTok e Instagram Reels sigue premiando el
              contenido autentico sobre el producido. Un video de 15
              segundos del fuego salteando verduras puede tener mas alcance
              que un anuncio pagado de 500 euros. Y es gratis.
            </p>

            <p><strong>Como empezar hoy:</strong></p>
            <ol>
              <li>
                Graba <strong>3 videos cortos</strong> (15-30 segundos)
                esta semana: preparacion de un plato estrella, el equipo de
                cocina trabajando, el emplatado final.
              </li>
              <li>
                Usa tendencias de audio (canciones populares) para aumentar
                el alcance. No necesitas hablar.
              </li>
              <li>
                Publica consistentemente: 3-5 videos por semana es lo
                ideal. La consistencia importa mas que la calidad de
                produccion.
              </li>
              <li>
                Pon en tu bio el link a tu menu digital o a tu WhatsApp de
                pedidos para convertir viewers en clientes.
              </li>
            </ol>

            <p>
              <strong>Impacto esperado:</strong> el contenido organico
              tarda en construir traccion (4-8 semanas), pero cuando lo
              hace, genera un flujo constante de clientes nuevos. Algunos
              restaurantes reportan que Reels/TikTok les genera el 20-30%
              de sus clientes nuevos.
            </p>

            {/* -------- 5 -------- */}
            <h2>
              5. SEO local: aparecer cuando buscan &quot;restaurante cerca
              de mi&quot;
            </h2>

            <p>
              El SEO local va mas alla de Google Business. Se trata de que
              tu restaurante aparezca en todas las busquedas relevantes de
              tu zona: &quot;donde comer en [barrio]&quot;, &quot;mejor
              pizza en [ciudad]&quot;, &quot;restaurante con terraza
              [zona]&quot;.
            </p>

            <p><strong>¿Por que funciona en 2026?</strong></p>
            <p>
              El 46% de todas las busquedas en Google tienen intencion
              local. Y el 76% de las personas que buscan algo local en su
              movil visitan un negocio en las siguientes 24 horas. Si no
              apareces en esas busquedas, le estas regalando clientes a tu
              competencia.
            </p>

            <p><strong>Como empezar hoy:</strong></p>
            <ol>
              <li>
                <strong>Tu web necesita paginas locales:</strong> incluye el
                nombre de tu ciudad, barrio y zona en los titulos y textos
                de tu pagina web.
              </li>
              <li>
                <strong>Registrate en directorios locales:</strong>{" "}
                TripAdvisor, Yelp, TheFork, directorios de tu ciudad. Cada
                enlace que apunta a tu web mejora tu posicion.
              </li>
              <li>
                <strong>Crea contenido local:</strong> si tienes un blog,
                escribe sobre eventos de tu zona, colaboraciones con otros
                negocios locales, temas relevantes para tu comunidad.
              </li>
              <li>
                <strong>Asegurate de tener un menu online:</strong> Google
                indexa tu{" "}
                <Link href="/blog/menu-digital-gratis-restaurante">
                  menu digital
                </Link>{" "}
                y lo muestra en los resultados de busqueda. Un PDF no se
                indexa.
              </li>
            </ol>

            <p>
              <strong>Impacto esperado:</strong> el SEO local es un juego a
              medio plazo (2-6 meses), pero una vez que posicionas, el
              trafico es constante y gratuito. Es la estrategia con mejor
              retorno a largo plazo.
            </p>

            {/* -------- 6 -------- */}
            <h2>6. Fidelizacion por WhatsApp: mensajes directos a clientes anteriores</h2>

            <p>
              Adquirir un cliente nuevo cuesta 5 veces mas que retener uno
              existente. Si ya tienes clientes que te han comprado, tienes
              algo valiosisimo: su numero de WhatsApp. Usalo — con
              respeto.
            </p>

            <p><strong>¿Por que funciona en 2026?</strong></p>
            <p>
              Las listas de difusion de WhatsApp tienen tasas de apertura
              del 90%+. Comparalo con el email (20%) o las redes sociales
              (2-5% de alcance organico). No hay canal mas efectivo para
              llegar a tus clientes existentes.
            </p>

            <p><strong>Como empezar hoy:</strong></p>
            <ol>
              <li>
                <strong>Crea una lista de difusion</strong> en WhatsApp
                Business con tus clientes frecuentes (necesitas que ellos
                te tengan guardado en contactos).
              </li>
              <li>
                <strong>Envia 1 mensaje por semana</strong> maximo: menu
                del dia, plato nuevo, promocion especial. Menos es mas.
              </li>
              <li>
                <strong>Segmenta:</strong> una lista para clientes de
                delivery, otra para clientes de salon, otra para
                corporativos. No envies lo mismo a todos.
              </li>
              <li>
                <strong>Ofrece exclusividad:</strong> &quot;Solo para
                clientes WhatsApp: postre gratis con tu pedido esta
                semana&quot;. Haz que estar en tu lista tenga valor.
              </li>
              <li>
                Para escalar, usa{" "}
                <Link href="/blog/como-vender-comida-por-whatsapp">
                  automatizacion con bot de WhatsApp
                </Link>{" "}
                para enviar promociones automaticas basadas en el
                comportamiento del cliente.
              </li>
            </ol>

            <p>
              <strong>Impacto esperado:</strong> una estrategia de
              fidelizacion por WhatsApp bien ejecutada puede aumentar la
              frecuencia de compra de clientes existentes en un 20-40%.
              Son ventas que no te cuestan nada en publicidad.
            </p>

            {/* -------- 7 -------- */}
            <h2>7. Estrategia de resenas en Google Maps (pedir en el momento justo)</h2>

            <p>
              Las resenas son el boca a boca digital. Un restaurante con
              4.5 estrellas y 200 resenas va a ganarle siempre a uno con
              4.8 y 12 resenas. El volumen importa. Y la mayoria de
              restaurantes no piden resenas — o las piden mal.
            </p>

            <p><strong>¿Por que funciona en 2026?</strong></p>
            <p>
              Google usa las resenas como factor clave de ranking local.
              Mas resenas recientes = mejor posicion. Ademas, el 88% de
              los consumidores confian en las resenas online tanto como en
              recomendaciones personales.
            </p>

            <p><strong>Como empezar hoy:</strong></p>
            <ol>
              <li>
                <strong>Crea un link directo</strong> a tu seccion de
                resenas de Google (busca &quot;Google review link
                generator&quot;) y guardalo en tu movil.
              </li>
              <li>
                <strong>Pide resenas en el momento de maxima
                satisfaccion:</strong> justo cuando el cliente dice que le
                encanto el plato, cuando deja propina, cuando elogia algo.
                Ese es el momento.
              </li>
              <li>
                <strong>Imprime el QR de resenas</strong> en la cuenta, en
                un cartelito de mesa o en la bolsa del delivery. Hazlo
                facil.
              </li>
              <li>
                <strong>Responde TODAS las resenas</strong> — las buenas y
                las malas. Un &quot;gracias, nos alegra que te haya
                gustado&quot; o una respuesta empatica a una queja muestra
                que te importa.
              </li>
              <li>
                <strong>Nunca compres resenas falsas.</strong> Google las
                detecta y puede penalizar tu perfil. No vale la pena.
              </li>
            </ol>

            <p>
              <strong>Impacto esperado:</strong> pasar de 50 a 150 resenas
              puede duplicar las visitas a tu perfil de Google Business.
              Con una estrategia consistente, puedes conseguir 10-20
              resenas nuevas por semana.
            </p>

            {/* -------- 8 -------- */}
            <h2>8. Colaboraciones con micro-influencers locales</h2>

            <p>
              Olvidate de los influencers con 500K seguidores que cobran
              miles de euros. Los micro-influencers locales (1.000-10.000
              seguidores) son mucho mas efectivos para restaurantes. Su
              audiencia es local, confian en ellos y el coste es
              accesible.
            </p>

            <p><strong>¿Por que funciona en 2026?</strong></p>
            <p>
              Los micro-influencers tienen tasas de engagement 3-4x mayores
              que los grandes influencers. Y su audiencia esta en tu
              ciudad. Cuando un foodie local con 3.000 seguidores publica
              que tu hamburguesa es increible, esos 3.000 estan a 15
              minutos de tu local.
            </p>

            <p><strong>Como empezar hoy:</strong></p>
            <ol>
              <li>
                <strong>Busca foodie bloggers locales</strong> en Instagram
                y TikTok: busca hashtags como #dondecomer[tuciudad],
                #foodie[tuciudad], #restaurantes[tuciudad].
              </li>
              <li>
                <strong>Invitalos a comer gratis</strong> — sin
                obligacion de publicar (pero la mayoria lo hara). Una cena
                para 2 es una inversion de 30-60 euros con potencial de
                llegar a miles de personas.
              </li>
              <li>
                <strong>Crea una experiencia especial</strong> para ellos:
                un plato que no esta en el menu, una visita a la cocina,
                una presentacion unica. Dales algo que contar.
              </li>
              <li>
                <strong>Pideles que etiqueten tu perfil</strong> y que
                mencionen que pueden pedir por WhatsApp o por tu web.
                Convierte la visibilidad en pedidos.
              </li>
            </ol>

            <p>
              <strong>Impacto esperado:</strong> una buena colaboracion con
              un micro-influencer puede generar 20-50 clientes nuevos en
              una semana. A un coste por cliente de 1-3 euros, es mas
              barato que cualquier anuncio pagado.
            </p>

            {/* -------- 9 -------- */}
            <h2>9. Lista de contactos para promociones y menus limitados</h2>

            <p>
              Tu lista de contactos (email o WhatsApp) es el unico activo
              de marketing que realmente te pertenece. Instagram puede
              cambiar su algoritmo. Google puede mover tu posicion. Pero
              tu lista de clientes es tuya.
            </p>

            <p><strong>¿Por que funciona en 2026?</strong></p>
            <p>
              Los menus limitados y las ofertas exclusivas crean urgencia.
              &quot;Solo este viernes: paella para 2 a 18 euros, reserva
              por WhatsApp&quot;. Cuando envias eso a 500 contactos con
              90% de apertura, vas a llenar mesas.
            </p>

            <p><strong>Como empezar hoy:</strong></p>
            <ol>
              <li>
                <strong>Empieza a recopilar contactos:</strong> un QR en la
                mesa que diga &quot;Unete a nuestro club y recibe un
                descuento en tu proximo pedido&quot;.
              </li>
              <li>
                <strong>Ofrece algo a cambio:</strong> 10% en el primer
                pedido por WhatsApp, un postre gratis, una bebida de
                cortesia. El incentivo importa.
              </li>
              <li>
                <strong>Crea escasez real:</strong> menus de edicion
                limitada solo disponibles para tu lista. &quot;Menu
                japones fusion — solo 30 unidades este sabado. Responde
                para reservar&quot;.
              </li>
              <li>
                <strong>Se consistente pero no abusivo:</strong> 1 mensaje
                por semana es el punto ideal. Si envias mas, la gente se
                sale. Si envias menos, se olvidan de ti.
              </li>
            </ol>

            <p>
              <strong>Impacto esperado:</strong> una lista de 500 contactos
              activos puede generar 50-100 pedidos por promocion enviada.
              Es tu canal mas rentable a medio plazo.
            </p>

            {/* -------- 10 -------- */}
            <h2>10. Elimina tu dependencia de plataformas de delivery</h2>

            <p>
              Glovo, Uber Eats, Rappi, PedidosYa... Las plataformas de
              delivery te cobran entre un 25-35% de comision por cada
              pedido. Eso significa que en un pedido de 20 euros, te quedas
              con 13-15. Si tu margen de comida es del 65%, estas
              trabajando casi gratis — o a perdida.
            </p>

            <p><strong>¿Por que funciona en 2026?</strong></p>
            <p>
              Los clientes que piden por plataformas no son tus clientes —
              son clientes de la plataforma. Si manana suben las
              comisiones o cambian el algoritmo, pierdes esas ventas. En
              cambio, cada cliente que migras a tu{" "}
              <Link href="/blog/delivery-propio-restaurante-sin-intermediarios">
                canal de delivery propio
              </Link>{" "}
              es tuyo para siempre.
            </p>

            <p><strong>Como empezar hoy:</strong></p>
            <ol>
              <li>
                <strong>No desaparezcas de las plataformas</strong> de
                golpe. Usalas como canal de descubrimiento, pero redirige
                clientes a tu canal propio.
              </li>
              <li>
                <strong>Incluye un flyer en cada pedido de delivery</strong>{" "}
                que diga: &quot;Pidenos directo por WhatsApp y recibe un
                10% de descuento&quot;. Pon el QR.
              </li>
              <li>
                <strong>Monta tu canal de pedidos propio</strong> con{" "}
                <Link href="/">YaComanda</Link>: menu digital + pedidos
                por WhatsApp + cobro integrado. Sin comisiones por
                pedido.
              </li>
              <li>
                <strong>
                  <Link href="/calculadora-comisiones">
                    Calcula cuanto estas pagando en comisiones
                  </Link>
                </strong>{" "}
                cada mes. Cuando ves el numero, la decision de montar tu
                canal propio es obvia.
              </li>
            </ol>

            <p>
              <strong>Impacto esperado:</strong> migrar un 30-50% de tus
              pedidos de plataformas a tu canal propio puede aumentar tu
              margen neto entre un 15-25%. En un restaurante que factura
              5.000 euros/mes en delivery, eso son 750-1.250 euros mas de
              ganancia cada mes.
            </p>

            {/* -------- Resumen -------- */}
            <h2>Tu plan de accion: por donde empezar</h2>

            <p>
              No intentes implementar las 10 estrategias a la vez. Elige 2
              o 3 y hazlas bien. Aqui te dejo un orden basado en impacto
              vs. esfuerzo:
            </p>

            <ol>
              <li>
                <strong>Semana 1:</strong> optimiza tu Google Business
                Profile y crea tu{" "}
                <Link href="/blog/menu-digital-gratis-restaurante">
                  menu digital
                </Link>
                . Impacto inmediato, esfuerzo minimo.
              </li>
              <li>
                <strong>Semana 2:</strong> activa WhatsApp Business como
                canal de pedidos. Pon tu numero en todas partes. Empieza a
                capturar contactos.
              </li>
              <li>
                <strong>Semana 3-4:</strong> implementa tu estrategia de
                resenas en Google Maps. Pide resenas a cada cliente
                satisfecho.
              </li>
              <li>
                <strong>Mes 2:</strong> empieza a publicar Reels/TikToks.
                Busca micro-influencers locales. Lanza tu primera
                promocion a tu lista de WhatsApp.
              </li>
              <li>
                <strong>Mes 3:</strong>{" "}
                <Link href="/blog/delivery-propio-restaurante-sin-intermediarios">
                  monta tu canal de delivery propio
                </Link>{" "}
                y empieza a migrar clientes de las plataformas. Automatiza
                pedidos con un bot.
              </li>
            </ol>

            <p>
              La clave no es hacer todo perfecto. Es empezar hoy con lo
              que puedes hacer y ser consistente. Los restaurantes que
              ganan en 2026 no son los que tienen mas presupuesto — son
              los que usan estos canales de forma inteligente y
              constante.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 p-8 text-center text-white">
            <h2 className="text-2xl font-bold">
              ¿Cuanto estas perdiendo en comisiones de delivery?
            </h2>
            <p className="mt-2 text-green-100">
              Descubre cuanto puedes ahorrar con tu propio canal de
              pedidos. La calculadora es gratuita y toma 30 segundos.
            </p>
            <Link
              href="/calculadora-comisiones"
              className="mt-4 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-green-700 hover:bg-green-50"
            >
              Calcula tu ahorro
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900">
              Monta tu canal de pedidos propio en 15 minutos
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Menu digital + pedidos por WhatsApp + cobro integrado. Sin
              comisiones por pedido. 30 dias gratis.
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

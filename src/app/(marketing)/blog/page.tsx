import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — YaComanda | Pedidos por WhatsApp para restaurantes",
  description:
    "Consejos, guias y noticias sobre pedidos por WhatsApp, alternativas a Glovo, Kit Digital y digitalizacion para restaurantes en Espana.",
  openGraph: {
    title: "Blog — YaComanda",
    description:
      "Guias practicas para restaurantes que quieren recibir pedidos por WhatsApp sin comisiones.",
  },
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tag: string;
  tagColor: string;
}

const posts: BlogPost[] = [
  {
    slug: "app-pedidos-restaurante-sin-comisiones",
    title:
      "App para pedidos de restaurante sin comisiones: 7 opciones en 2026",
    description:
      "Comparativa de apps y sistemas para recibir pedidos en tu restaurante sin pagar comisiones. WhatsApp, web propia, QR y mas. Con precios reales.",
    date: "7 abril 2026",
    readTime: "10 min",
    tag: "Comparativa",
    tagColor: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    slug: "cuanto-cobra-glovo-a-restaurantes",
    title:
      "Cuanto cobra Glovo a los restaurantes: desglose real 2026",
    description:
      "Desglose completo de comisiones, costes ocultos y lo que Glovo realmente se lleva de cada pedido. Con ejemplos reales y calculadora de ahorro.",
    date: "2 abril 2026",
    readTime: "8 min",
    tag: "Costes",
    tagColor: "bg-red-50 text-red-600 border-red-200",
  },
  {
    slug: "como-atraer-clientes-restaurante",
    title:
      "10 estrategias para atraer clientes a tu restaurante en 2026 (que realmente funcionan)",
    description:
      "Estrategias probadas de marketing para restaurantes: desde Google Business hasta WhatsApp como canal de ventas. Sin teoria, solo lo que funciona.",
    date: "2 abril 2026",
    readTime: "12 min",
    tag: "Marketing",
    tagColor: "bg-purple-50 text-purple-600 border-purple-200",
  },
  {
    slug: "uber-eats-vs-delivery-propio",
    title:
      "Uber Eats vs delivery propio: que le conviene mas a tu restaurante en 2026",
    description:
      "Comparativa detallada con numeros reales. Cuanto pierdes con Uber Eats vs cuanto ahorras con un canal de pedidos propio por WhatsApp.",
    date: "2 abril 2026",
    readTime: "10 min",
    tag: "Comparativa",
    tagColor: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    slug: "sistema-pedidos-restaurante-2026",
    title:
      "Los mejores sistemas de pedidos para restaurantes en 2026: comparativa completa",
    description:
      "Comparativa de 8 sistemas de pedidos para restaurantes: desde marketplaces como Glovo hasta bots de WhatsApp con IA. Precios, pros, contras y cual elegir segun tu negocio.",
    date: "1 abril 2026",
    readTime: "11 min",
    tag: "Comparativa",
    tagColor: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    slug: "comisiones-rappi-restaurantes",
    title:
      "Comisiones de Rappi para restaurantes: cuanto pagas realmente en 2026",
    description:
      "Desglose completo de las comisiones que Rappi cobra a restaurantes en Colombia, Mexico, Peru, Argentina, Chile y Ecuador. Costes ocultos y alternativas.",
    date: "1 abril 2026",
    readTime: "9 min",
    tag: "Costes",
    tagColor: "bg-red-50 text-red-600 border-red-200",
  },
  {
    slug: "comisiones-pedidosya-restaurantes",
    title:
      "Comisiones de PedidosYa para restaurantes: desglose completo 2026",
    description:
      "Cuanto cobra PedidosYa a los restaurantes en Argentina, Chile, Peru, Ecuador y mas paises. Comisiones reales, costes ocultos y como ahorrar.",
    date: "1 abril 2026",
    readTime: "9 min",
    tag: "Costes",
    tagColor: "bg-red-50 text-red-600 border-red-200",
  },
  {
    slug: "pedidos-whatsapp-restaurante-ecuador",
    title:
      "Como recibir pedidos por WhatsApp en tu restaurante en Ecuador",
    description:
      "Guia completa para restaurantes ecuatorianos que quieren automatizar pedidos por WhatsApp. Desde lo manual hasta bots con IA. Pagos con Deuna, PayPhone y transferencia.",
    date: "1 abril 2026",
    readTime: "8 min",
    tag: "Guia",
    tagColor: "bg-green-50 text-green-600 border-green-200",
  },
  {
    slug: "como-vender-comida-por-whatsapp",
    title:
      "Como vender comida por WhatsApp: guia completa para restaurantes en 2026",
    description:
      "Aprende a vender comida por WhatsApp paso a paso. 3 niveles: manual, WhatsApp Business y bot automatizado. Pagos, consejos y errores comunes.",
    date: "1 abril 2026",
    readTime: "10 min",
    tag: "Guia",
    tagColor: "bg-green-50 text-green-600 border-green-200",
  },
  {
    slug: "delivery-propio-restaurante-sin-intermediarios",
    title:
      "Como montar tu propio delivery sin depender de Glovo, Rappi ni Uber Eats",
    description:
      "Guia paso a paso para crear tu canal de delivery propio. Ahorra el 25-35% en comisiones y recupera el control de tus clientes. 4 opciones comparadas.",
    date: "1 abril 2026",
    readTime: "10 min",
    tag: "Guia",
    tagColor: "bg-green-50 text-green-600 border-green-200",
  },
  {
    slug: "chatbot-ia-restaurante",
    title:
      "Chatbot con IA para restaurantes: que es, como funciona y los mejores en 2026",
    description:
      "Guia completa sobre chatbots con inteligencia artificial para restaurantes. Diferencias con bots de reglas, mejores soluciones, precios y como implementarlo en tu negocio.",
    date: "1 abril 2026",
    readTime: "10 min",
    tag: "Tecnologia",
    tagColor: "bg-violet-50 text-violet-600 border-violet-200",
  },
  {
    slug: "pedidos-online-restaurante-sin-app",
    title:
      "Pedidos online para tu restaurante sin necesitar una app propia",
    description:
      "Descubre como recibir pedidos online en tu restaurante sin desarrollar una app propia. 5 alternativas reales ordenadas por coste y efectividad.",
    date: "1 abril 2026",
    readTime: "9 min",
    tag: "Guia",
    tagColor: "bg-green-50 text-green-600 border-green-200",
  },
  {
    slug: "whatsapp-business-api-restaurantes",
    title:
      "WhatsApp Business API para restaurantes: que es, como funciona y cuanto cuesta",
    description:
      "Guia completa sobre la WhatsApp Business API para restaurantes. Diferencias con WhatsApp Business, costes reales, casos de uso y por que conviene usar una plataforma en vez de integrarlo tu mismo.",
    date: "31 marzo 2026",
    readTime: "9 min",
    tag: "Tecnologia",
    tagColor: "bg-violet-50 text-violet-600 border-violet-200",
  },
  {
    slug: "alternativas-uber-eats-sin-comisiones",
    title:
      "5 alternativas a Uber Eats sin comisiones para restaurantes en 2026",
    description:
      "Comparativa de las mejores alternativas a Uber Eats para restaurantes. Precios reales, pros y contras de cada opcion para dejar de pagar el 30% en comisiones.",
    date: "31 marzo 2026",
    readTime: "8 min",
    tag: "Comparativa",
    tagColor: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    slug: "menu-digital-gratis-restaurante",
    title:
      "Como crear un menu digital gratis para tu restaurante en 2026",
    description:
      "5 formas de crear un menu digital para tu restaurante: desde PDF con QR hasta menus integrados con pedidos por WhatsApp. Comparativa con pros, contras y costes.",
    date: "31 marzo 2026",
    readTime: "8 min",
    tag: "Guia",
    tagColor: "bg-green-50 text-green-600 border-green-200",
  },
  {
    slug: "pedidos-whatsapp-restaurante-argentina",
    title:
      "Como recibir pedidos por WhatsApp en tu restaurante en Argentina",
    description:
      "Guia completa para restaurantes argentinos que quieren automatizar pedidos por WhatsApp. Desde lo manual hasta bots con IA que cobran con Mercado Pago.",
    date: "31 marzo 2026",
    readTime: "7 min",
    tag: "Guia",
    tagColor: "bg-green-50 text-green-600 border-green-200",
  },
  {
    slug: "pedidos-whatsapp-restaurante-peru",
    title:
      "Como recibir pedidos por WhatsApp en tu restaurante en Peru",
    description:
      "Guia completa para restaurantes peruanos que quieren automatizar pedidos por WhatsApp. Desde lo manual hasta bots con IA que cobran con Yape y Plin.",
    date: "31 marzo 2026",
    readTime: "7 min",
    tag: "Guia",
    tagColor: "bg-green-50 text-green-600 border-green-200",
  },
  {
    slug: "pedidos-whatsapp-restaurante-chile",
    title:
      "Como recibir pedidos por WhatsApp en tu restaurante en Chile",
    description:
      "Guia completa para restaurantes chilenos que quieren automatizar pedidos por WhatsApp. Desde lo manual hasta bots con IA que cobran con Mercado Pago y Webpay.",
    date: "31 marzo 2026",
    readTime: "7 min",
    tag: "Guia",
    tagColor: "bg-green-50 text-green-600 border-green-200",
  },
  {
    slug: "como-digitalizar-restaurante-latinoamerica",
    title:
      "Como digitalizar tu restaurante en Latinoamerica sin gastar una fortuna",
    description:
      "Guia practica de digitalizacion para restaurantes en LATAM. Pedidos online, WhatsApp, pagos digitales y herramientas de bajo costo para empezar hoy.",
    date: "30 marzo 2026",
    readTime: "9 min",
    tag: "Digitalizacion",
    tagColor: "bg-purple-50 text-purple-600 border-purple-200",
  },
  {
    slug: "pedidos-whatsapp-restaurante-colombia",
    title:
      "Como recibir pedidos por WhatsApp en tu restaurante en Colombia",
    description:
      "Guia completa para restaurantes colombianos que quieren automatizar pedidos por WhatsApp. Desde lo manual hasta bots con IA que cobran con Nequi y Daviplata.",
    date: "30 marzo 2026",
    readTime: "7 min",
    tag: "Guia",
    tagColor: "bg-green-50 text-green-600 border-green-200",
  },
  {
    slug: "pedidos-whatsapp-restaurante-mexico",
    title:
      "Como recibir pedidos por WhatsApp en tu restaurante en Mexico",
    description:
      "Guia completa para restaurantes mexicanos que quieren automatizar pedidos por WhatsApp. Desde la opcion manual hasta bots con IA que cobran con Mercado Pago.",
    date: "30 marzo 2026",
    readTime: "7 min",
    tag: "Guia",
    tagColor: "bg-green-50 text-green-600 border-green-200",
  },
  {
    slug: "alternativas-rappi-sin-comisiones",
    title:
      "5 alternativas a Rappi sin comisiones para restaurantes en 2026",
    description:
      "Comparativa de las mejores alternativas a Rappi para restaurantes en Colombia, Mexico y Latinoamerica. Precios reales, pros y contras de cada opcion.",
    date: "30 marzo 2026",
    readTime: "8 min",
    tag: "Comparativa",
    tagColor: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    slug: "kit-digital-restaurante-subvencion",
    title:
      "Kit Digital para restaurantes: como conseguir la subvencion en 2026",
    description:
      "Guia completa sobre el Kit Digital para hosteleria. Requisitos, importes por segmento y como solicitar el bono digital para digitalizar tu restaurante.",
    date: "16 marzo 2026",
    readTime: "7 min",
    tag: "Kit Digital",
    tagColor: "bg-amber-50 text-amber-600 border-amber-200",
  },
  {
    slug: "bot-whatsapp-restaurante",
    title:
      "Bot de WhatsApp para restaurantes: que es y como funciona",
    description:
      "Descubre como funciona un bot de WhatsApp para restaurantes, las diferencias entre bots con reglas y con IA, y que buscar para elegir el mejor.",
    date: "16 marzo 2026",
    readTime: "7 min",
    tag: "Tecnologia",
    tagColor: "bg-violet-50 text-violet-600 border-violet-200",
  },
  {
    slug: "comisiones-glovo-restaurantes",
    title:
      "Comisiones de Glovo, Uber Eats y Just Eat: cuanto paga realmente tu restaurante",
    description:
      "Desglosamos las comisiones reales que cobran las principales plataformas de delivery en Espana y las alternativas para dejar de perder margen.",
    date: "9 marzo 2026",
    readTime: "6 min",
    tag: "Costes",
    tagColor: "bg-red-50 text-red-600 border-red-200",
  },
  {
    slug: "recibir-pedidos-whatsapp-restaurante",
    title:
      "Como recibir pedidos por WhatsApp en tu restaurante: guia completa 2026",
    description:
      "Guia paso a paso para automatizar los pedidos que ya recibes por WhatsApp. Desde la opcion manual hasta bots con IA que cobran solos.",
    date: "9 marzo 2026",
    readTime: "7 min",
    tag: "Guia",
    tagColor: "bg-green-50 text-green-600 border-green-200",
  },
  {
    slug: "alternativas-glovo-sin-comisiones",
    title:
      "5 alternativas a Glovo sin comisiones para restaurantes en 2026",
    description:
      "Comparativa honesta de las mejores opciones para recibir pedidos sin pagar el 30% a plataformas de delivery. Pros, contras y precios reales.",
    date: "9 marzo 2026",
    readTime: "8 min",
    tag: "Comparativa",
    tagColor: "bg-blue-50 text-blue-600 border-blue-200",
  },
];

export default function BlogPage() {
  return (
    <section className="px-4 pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-slate-500">
          Guias practicas para restaurantes que quieren vender mas y pagar
          menos en comisiones.
        </p>

        <div className="mt-12 space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span
                  className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${post.tagColor}`}
                >
                  {post.tag}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Calendar className="size-3.5" />
                  {post.date}
                </span>
                <span className="text-slate-400">{post.readTime} lectura</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-green-600">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {post.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-600 group-hover:gap-2 transition-all">
                Leer articulo
                <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

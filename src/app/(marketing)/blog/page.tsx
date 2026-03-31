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

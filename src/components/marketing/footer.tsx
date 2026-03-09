import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="relative bg-slate-950">
      {/* Gradient top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="flex size-8 items-center justify-center rounded-lg bg-green-500 text-sm font-black text-white shadow-md shadow-green-500/30">
                Ya
              </span>
              Comanda
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Automatiza pedidos por WhatsApp con IA.
              Sin comisiones. Sin intermediarios.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Producto</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/#como-funciona" className="text-slate-500 transition-colors hover:text-green-400">
                  Como funciona
                </Link>
              </li>
              <li>
                <Link href="/#funcionalidades" className="text-slate-500 transition-colors hover:text-green-400">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-500 transition-colors hover:text-green-400">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-500 transition-colors hover:text-green-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="text-slate-500 transition-colors hover:text-green-400">
                  Empezar gratis
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/privacidad" className="text-slate-500 transition-colors hover:text-green-400">
                  Politica de privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-slate-500 transition-colors hover:text-green-400">
                  Terminos de servicio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="mailto:hola@yacomanda.com"
                  className="text-slate-500 transition-colors hover:text-green-400"
                >
                  hola@yacomanda.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/34636873210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 transition-colors hover:text-green-400"
                >
                  WhatsApp: +34 636 873 210
                </a>
              </li>
              <li>
                <Link href="/contacto" className="text-slate-500 transition-colors hover:text-green-400">
                  Pagina de contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-600">
          <p>&copy; 2026 PROTFORGE SL. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

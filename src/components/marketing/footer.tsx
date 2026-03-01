import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-[oklch(0.13_0.03_260)] text-[oklch(0.75_0.01_260)]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-black text-primary-foreground">
                Ya
              </span>
              Comanda
            </Link>
            <p className="mt-3 text-sm">
              Automatiza pedidos por WhatsApp con IA. Sin comisiones. Sin intermediarios.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h3 className="font-semibold text-white">Producto</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/#como-funciona" className="transition-colors hover:text-white">
                  Como funciona
                </Link>
              </li>
              <li>
                <Link href="/#funcionalidades" className="transition-colors hover:text-white">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition-colors hover:text-white">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="transition-colors hover:text-white">
                  Empezar gratis
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/privacidad" className="transition-colors hover:text-white">
                  Politica de privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="transition-colors hover:text-white">
                  Terminos de servicio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-white">Contacto</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hola@yacomanda.com"
                  className="transition-colors hover:text-white"
                >
                  hola@yacomanda.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/34636873210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp: +34 636 873 210
                </a>
              </li>
              <li>
                <Link href="/contacto" className="transition-colors hover:text-white">
                  Pagina de contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center gap-2 text-center text-sm">
            <p className="font-semibold text-white">
              PROTFORGE SL — CIF B75512434
            </p>
            <p>Avenida de Aragon 29, puerta 5, 46010 Valencia, Espana</p>
            <p>&copy; 2026 PROTFORGE SL. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function MarketingFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Producto */}
          <div>
            <h3 className="font-semibold">Producto</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-foreground">
                  Empezar gratis
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacidad" className="hover:text-foreground">
                  Politica de privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-foreground">
                  Terminos de servicio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold">Contacto</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:guillermollopis@protforge.com"
                  className="hover:text-foreground"
                >
                  guillermollopis@protforge.com
                </a>
              </li>
              <li>
                <a href="tel:+34636873210" className="hover:text-foreground">
                  +34 636 873 210
                </a>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-foreground">
                  Pagina de contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">
            PROTFORGE SL — CIF B75512434
          </p>
          <p>Avenida de Aragon 29, puerta 5, 46010 Valencia, Espana</p>
          <p>&copy; 2026 PROTFORGE SL. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

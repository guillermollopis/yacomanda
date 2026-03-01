"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#funcionalidades", label: "Funcionalidades" },
  { href: "/pricing", label: "Precios" },
  { href: "/contacto", label: "Contacto" },
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-black text-primary-foreground">
            Ya
          </span>
          <span>Comanda</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">
              Iniciar sesion
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-primary/80 shadow-md shadow-primary/20 transition-shadow hover:shadow-lg hover:shadow-primary/30"
            >
              Empezar gratis
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="size-5" />
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="w-64 p-0">
            <SheetHeader className="border-b px-6 py-4">
              <SheetTitle className="flex items-center gap-2 text-xl font-bold">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-black text-primary-foreground">
                  Ya
                </span>
                Comanda
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                <Link href="/sign-in" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full">
                    Iniciar sesion
                  </Button>
                </Link>
                <Link href="/sign-up" onClick={() => setOpen(false)}>
                  <Button className="w-full">Empezar gratis</Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

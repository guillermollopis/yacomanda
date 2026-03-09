"use client";

import { useState, useEffect } from "react";
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
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-bold text-white">
          <span className="flex size-8 items-center justify-center rounded-lg bg-green-500 text-sm font-black text-white shadow-md shadow-green-500/30">
            Ya
          </span>
          <span>Comanda</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/sign-in">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10">
              Iniciar sesion
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              size="sm"
              className="rounded-lg bg-green-500 font-semibold text-white shadow-md shadow-green-500/25 hover:bg-green-400"
            >
              Empezar gratis
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="text-white md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="size-5" />
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="w-72 border-slate-800 bg-slate-950 p-0">
            <SheetHeader className="border-b border-slate-800 px-6 py-4">
              <SheetTitle className="flex items-center gap-2 text-lg font-bold text-white">
                <span className="flex size-7 items-center justify-center rounded-lg bg-green-500 text-xs font-black text-white">
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
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t border-slate-800 pt-4">
                <Link href="/sign-in" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full text-slate-300 hover:bg-slate-800 hover:text-white">
                    Iniciar sesion
                  </Button>
                </Link>
                <Link href="/sign-up" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-green-500 text-white hover:bg-green-400">
                    Empezar gratis
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

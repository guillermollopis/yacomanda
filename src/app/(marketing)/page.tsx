import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <span className="text-xl font-bold">YaComanda</span>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Precios
            </Link>
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">Iniciar sesion</Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Empezar gratis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight">
          Automatiza los pedidos de tu restaurante por WhatsApp
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          YaComanda usa inteligencia artificial para recibir pedidos, gestionar tu carta
          y cobrar a tus clientes — todo desde WhatsApp.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/sign-up">
            <Button size="lg">Empezar gratis</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg">Ver precios</Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} YaComanda. Todos los derechos reservados.
      </footer>
    </div>
  );
}

"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <AlertTriangle className="size-12 text-destructive" />
      <h2 className="text-xl font-semibold">Algo ha ido mal</h2>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        Se ha producido un error inesperado. Puedes intentar de nuevo o volver
        al panel de control.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Reintentar</Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Volver al panel</Link>
        </Button>
      </div>
    </div>
  );
}

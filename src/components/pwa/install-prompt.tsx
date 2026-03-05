"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, X, Share, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISSED_KEY = "yacomanda-install-dismissed";
const DISMISSED_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function wasDismissedRecently(): boolean {
  if (typeof window === "undefined") return false;
  const dismissed = localStorage.getItem(DISMISSED_KEY);
  if (!dismissed) return false;
  return Date.now() - parseInt(dismissed, 10) < DISMISSED_DURATION_MS;
}

function isIOSSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && (navigator as { standalone?: boolean }).standalone === true)
  );
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIosPrompt, setShowIosPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(true); // start hidden

  useEffect(() => {
    // Already installed as PWA — don't show anything
    if (isStandalone()) return;

    // Was dismissed recently — don't nag
    if (wasDismissedRecently()) return;

    // Chrome/Edge: listen for the beforeinstallprompt event
    function handleBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setDismissed(false);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // iOS Safari: show manual instructions
    if (isIOSSafari()) {
      setShowIosPrompt(true);
      setDismissed(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setDismissed(true);
    }
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
  }, []);

  if (dismissed || (!deferredPrompt && !showIosPrompt)) return null;

  // iOS Safari — manual instructions
  if (showIosPrompt) {
    return (
      <div className="relative rounded-lg border border-primary/20 bg-primary/5 p-4">
        <button
          onClick={handleDismiss}
          className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>
        <div className="flex items-start gap-3 pr-6">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Smartphone className="size-5 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              Instala YaComanda en tu iPhone
            </p>
            <p className="text-xs text-muted-foreground">
              Pulsa{" "}
              <Share className="inline size-3.5 align-text-bottom text-blue-500" />{" "}
              <span className="font-medium">Compartir</span> y luego{" "}
              <span className="font-medium">
                &quot;Añadir a pantalla de inicio&quot;
              </span>{" "}
              para acceder como una app nativa.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Chrome/Edge — native install prompt
  return (
    <div className="relative rounded-lg border border-primary/20 bg-primary/5 p-4">
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground hover:text-foreground"
      >
        <X className="size-4" />
      </button>
      <div className="flex items-center gap-3 pr-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Download className="size-5 text-primary" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium">Instala YaComanda</p>
          <p className="text-xs text-muted-foreground">
            Accede a tu panel con un toque, recibe notificaciones y funciona sin
            conexión.
          </p>
        </div>
        <Button size="sm" onClick={handleInstall} className="shrink-0">
          <Download className="mr-1.5 size-3.5" />
          Instalar
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Loader2,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

type SignupState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "connected"; phoneNumber: string }
  | { status: "error"; message: string };

export function EmbeddedSignup({
  onConnected,
}: {
  onConnected?: (phoneNumber: string) => void;
}) {
  const [state, setState] = useState<SignupState>({ status: "idle" });
  const popupRef = useRef<Window | null>(null);

  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const configId = process.env.NEXT_PUBLIC_FACEBOOK_CONFIG_ID;

  const connectMutation = trpc.settings.connectWhatsApp.useMutation({
    onSuccess: (data) => {
      setState({ status: "connected", phoneNumber: data.phoneNumber });
      toast.success("WhatsApp conectado correctamente");
      onConnected?.(data.phoneNumber);
    },
    onError: (err) => {
      setState({ status: "error", message: err.message });
      toast.error("Error al conectar WhatsApp: " + err.message);
    },
  });

  // Listen for the OAuth callback postMessage from the popup
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const data = event.data;
      if (data?.type !== "FB_OAUTH_CALLBACK") return;

      // Close the popup if still open
      popupRef.current?.close();
      popupRef.current = null;

      if (data.error) {
        if (data.error === "access_denied") {
          setState({ status: "idle" });
        } else {
          setState({
            status: "error",
            message: data.errorDescription || data.error,
          });
        }
        return;
      }

      if (data.code) {
        setState({ status: "loading" });
        const redirectUri = `${window.location.origin}/api/auth/facebook/callback`;
        connectMutation.mutate({ code: data.code, redirectUri });
      } else {
        setState({ status: "idle" });
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Poll to detect if user closed the popup without completing
  useEffect(() => {
    if (state.status !== "loading" || !popupRef.current) return;

    const interval = setInterval(() => {
      if (popupRef.current?.closed) {
        popupRef.current = null;
        clearInterval(interval);
        // Only reset if we haven't received the callback yet
        setState((prev) =>
          prev.status === "loading" && !connectMutation.isPending
            ? { status: "idle" }
            : prev
        );
      }
    }, 500);

    return () => clearInterval(interval);
  }, [state.status, connectMutation.isPending]);

  function handleLogin() {
    if (!appId || !configId) return;

    setState({ status: "loading" });

    const redirectUri = `${window.location.origin}/api/auth/facebook/callback`;

    const params = new URLSearchParams({
      client_id: appId,
      redirect_uri: redirectUri,
      config_id: configId,
      response_type: "code",
      override_default_response_type: "true",
      scope:
        "whatsapp_business_management,whatsapp_business_messaging,business_management",
    });

    const oauthUrl = `https://www.facebook.com/v22.0/dialog/oauth?${params.toString()}`;

    // Open popup centered on screen
    const width = 700;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      oauthUrl,
      "fb_wa_signup",
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
    );

    if (!popup) {
      setState({
        status: "error",
        message:
          "No se pudo abrir la ventana de Facebook. Desactiva el bloqueador de ventanas emergentes e inténtalo de nuevo.",
      });
      return;
    }

    popupRef.current = popup;
  }

  if (!appId || !configId) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <div className="flex items-start gap-3">
          <MessageSquare className="mt-0.5 size-5 text-yellow-600 shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-yellow-900">
              Configuracion pendiente
            </p>
            <p className="text-sm text-yellow-700">
              La conexion automatica de WhatsApp no esta disponible aun.
              Contacta con{" "}
              <a href="mailto:hola@yacomanda.com" className="underline">
                hola@yacomanda.com
              </a>{" "}
              para que te ayudemos a conectar tu numero.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state.status === "connected") {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
        <CheckCircle2 className="size-5 text-green-600 shrink-0" />
        <div>
          <p className="text-sm font-medium text-green-900">
            WhatsApp conectado
          </p>
          <p className="text-sm text-green-700">{state.phoneNumber}</p>
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="space-y-3">
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 size-5 text-red-600 shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-red-900">
              Error de conexion
            </p>
            <p className="text-sm text-red-700">{state.message}</p>
          </div>
        </div>
        <Button
          onClick={() => setState({ status: "idle" })}
          variant="outline"
          size="sm"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleLogin}
        disabled={state.status === "loading"}
        size="lg"
        className="gap-2"
      >
        {state.status === "loading" ? (
          connectMutation.isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Conectando cuenta...
            </>
          ) : (
            <>
              <Loader2 className="size-4 animate-spin" />
              Esperando Facebook...
            </>
          )
        ) : (
          <>
            <MessageSquare className="size-4" />
            Conectar WhatsApp
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground">
        Necesitarás tu cuenta de Facebook para verificar tu número de WhatsApp.
        El proceso tarda unos 2 minutos.
      </p>
    </div>
  );
}

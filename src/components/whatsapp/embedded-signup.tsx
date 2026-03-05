"use client";

import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, MessageSquare, AlertCircle } from "lucide-react";

declare global {
  interface Window {
    FB?: {
      init(params: {
        appId: string;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }): void;
      login(
        callback: (response: {
          authResponse?: { code?: string };
          status: string;
        }) => void,
        params: Record<string, unknown>
      ): void;
    };
    fbAsyncInit?: () => void;
  }
}

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
  const [sdkReady, setSdkReady] = useState(false);
  const signupDataRef = useRef<{ wabaId: string; phoneNumberId: string } | null>(null);
  const pendingCodeRef = useRef<string | null>(null);

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

  const connectMutationRef = useRef(connectMutation);
  connectMutationRef.current = connectMutation;

  // Try to submit if we have both code and signup data
  function trySubmit() {
    const code = pendingCodeRef.current;
    const signupData = signupDataRef.current;
    if (code && signupData) {
      pendingCodeRef.current = null;
      connectMutationRef.current.mutate({
        code,
        wabaId: signupData.wabaId,
        phoneNumberId: signupData.phoneNumberId,
      });
    }
  }

  // Listen for WA_EMBEDDED_SIGNUP session info event (v3)
  useEffect(() => {
    if (!appId || !configId) return;

    function handleMessage(event: MessageEvent) {
      // Accept messages from any facebook domain
      if (
        typeof event.origin === "string" &&
        !event.origin.includes("facebook.com")
      ) {
        return;
      }

      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (data.type === "WA_EMBEDDED_SIGNUP") {
          const { phone_number_id, waba_id } = data.data ?? {};
          if (phone_number_id && waba_id) {
            signupDataRef.current = {
              wabaId: waba_id,
              phoneNumberId: phone_number_id,
            };
            // If we already have the code, submit now
            trySubmit();
          }
        }
      } catch {
        // Not a JSON message we care about
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [appId, configId]);

  // Load Facebook SDK
  useEffect(() => {
    if (!appId || !configId) return;

    // If SDK already loaded
    if (window.FB) {
      setSdkReady(true);
      return;
    }

    window.fbAsyncInit = () => {
      window.FB!.init({
        appId,
        cookie: true,
        xfbml: true,
        version: "v22.0",
      });
      setSdkReady(true);
    };

    // Load SDK script if not already present
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, [appId, configId]);

  function handleLogin() {
    if (!window.FB || !configId) return;

    setState({ status: "loading" });
    signupDataRef.current = null;
    pendingCodeRef.current = null;

    window.FB.login(
      (response) => {
        if (response.authResponse?.code) {
          pendingCodeRef.current = response.authResponse.code;

          if (signupDataRef.current) {
            // Signup data already arrived via message event
            trySubmit();
          } else {
            // Wait up to 5 seconds for the message event
            let attempts = 0;
            const interval = setInterval(() => {
              attempts++;
              if (signupDataRef.current) {
                clearInterval(interval);
                trySubmit();
              } else if (attempts >= 25) {
                clearInterval(interval);
                setState({
                  status: "error",
                  message:
                    "No se recibió la información de WhatsApp. Inténtalo de nuevo.",
                });
              }
            }, 200);
          }
        } else {
          setState({ status: "idle" });
        }
      },
      {
        config_id: configId,
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: "",
          sessionInfoVersion: "3",
        },
      }
    );
  }

  if (!appId || !configId) {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <div className="flex items-start gap-3">
          <MessageSquare className="mt-0.5 size-5 text-yellow-600 shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-yellow-900">
              Configuración pendiente
            </p>
            <p className="text-sm text-yellow-700">
              La conexión automática de WhatsApp no está disponible aún.
              Contacta con{" "}
              <a
                href="mailto:hola@yacomanda.com"
                className="underline"
              >
                hola@yacomanda.com
              </a>{" "}
              para que te ayudemos a conectar tu número.
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
              Error de conexión
            </p>
            <p className="text-sm text-red-700">{state.message}</p>
          </div>
        </div>
        <Button
          onClick={() => {
            setState({ status: "idle" });
          }}
          variant="outline"
          size="sm"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleLogin}
      disabled={!sdkReady || state.status === "loading"}
      size="lg"
      className="gap-2"
    >
      {state.status === "loading" ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Conectando...
        </>
      ) : (
        <>
          <MessageSquare className="size-4" />
          Conectar WhatsApp
        </>
      )}
    </Button>
  );
}

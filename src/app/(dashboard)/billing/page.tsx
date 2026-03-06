"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/lib/trpc/react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Check, Sparkles } from "lucide-react";

const PLAN_LABELS: Record<string, string> = {
  trial: "Prueba gratuita",
  esencial: "Esencial",
  profesional: "Profesional",
  negocio: "Negocio",
};

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  trial: { label: "Periodo de prueba", className: "bg-blue-100 text-blue-800 border-blue-200" },
  active: { label: "Activa", className: "bg-green-100 text-green-800 border-green-200" },
  past_due: { label: "Pago pendiente", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  cancelled: { label: "Cancelada", className: "bg-red-100 text-red-800 border-red-200" },
};

const PLANS = [
  {
    id: "esencial" as const,
    name: "Esencial",
    price: "29",
    orders: "500",
    features: ["Bot IA WhatsApp", "Panel de gestión", "Cobro Bizum + tarjeta", "Gestión de carta"],
  },
  {
    id: "profesional" as const,
    name: "Profesional",
    price: "79",
    orders: "2.000",
    popular: true,
    features: ["Todo de Esencial", "Analíticas avanzadas", "Soporte prioritario", "Gestión de equipo", "Exportación de datos"],
  },
  {
    id: "negocio" as const,
    name: "Negocio",
    price: "199",
    orders: "Ilimitados",
    features: ["Todo de Profesional", "Multi-local", "Account manager", "API personalizada"],
  },
];

export default function BillingPage() {
  const { data, isLoading } = trpc.settings.getBillingStatus.useQuery();

  const portalMutation = trpc.settings.createPortalLink.useMutation({
    onSuccess: (res) => {
      window.location.href = res.url;
    },
    onError: (err) => toast.error(err.message),
  });

  const checkoutMutation = trpc.settings.createCheckoutLink.useMutation({
    onSuccess: (res) => {
      window.location.href = res.url;
    },
    onError: (err) => toast.error(err.message),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Facturación</h1>
          <p className="text-sm text-muted-foreground">Gestiona tu suscripción y facturas.</p>
        </div>
        <Skeleton className="h-40 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
      </div>
    );
  }

  const plan = data?.plan ?? "trial";
  const status = data?.subscriptionStatus ?? "trial";
  const usedOrders = data?.monthlyOrderCount ?? 0;
  const limitOrders = data?.monthlyOrderLimit ?? 500;
  const usagePercent = Math.min((usedOrders / limitOrders) * 100, 100);
  const statusConfig = STATUS_LABELS[status] ?? STATUS_LABELS.trial;
  const canUpgrade = plan === "trial" || status !== "active";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Facturación</h1>
        <p className="text-sm text-muted-foreground">
          Gestiona tu suscripción y facturas.
        </p>
      </div>

      {/* Current plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Plan actual</CardTitle>
              <CardDescription>
                {PLAN_LABELS[plan] ?? plan}
              </CardDescription>
            </div>
            <Badge variant="outline" className={statusConfig.className}>
              {statusConfig.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {data?.trialEndsAt && status === "trial" && (
            <p className="text-sm text-muted-foreground">
              Tu periodo de prueba termina el{" "}
              {new Date(data.trialEndsAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          {data?.stripeCustomerId && (
            <Button
              disabled={portalMutation.isPending}
              onClick={() => portalMutation.mutate()}
            >
              {portalMutation.isPending ? "Redirigiendo..." : "Gestionar suscripción"}
              <ExternalLink className="ml-2 size-4" />
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Uso mensual</CardTitle>
          <CardDescription>
            Pedidos procesados este mes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>{usedOrders} pedidos</span>
            <span className="text-muted-foreground">
              de {limitOrders} incluidos
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all ${
                usagePercent > 90
                  ? "bg-red-500"
                  : usagePercent > 70
                    ? "bg-yellow-500"
                    : "bg-primary"
              }`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          {usagePercent > 90 && (
            <p className="text-xs text-red-600">
              Estás cerca del límite de tu plan. Considera actualizar para no
              interrumpir el servicio.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Upgrade plans */}
      {canUpgrade && (
        <>
          <div>
            <h2 className="text-lg font-semibold">Elige tu plan</h2>
            <p className="text-sm text-muted-foreground">
              Todos los planes incluyen 14 días de prueba gratis.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {PLANS.map((p) => {
              const isCurrent = p.id === plan;
              return (
                <Card
                  key={p.id}
                  className={p.popular ? "border-primary shadow-md" : ""}
                >
                  {p.popular && (
                    <div className="bg-primary px-4 py-1 text-center text-xs font-medium text-white rounded-t-lg">
                      Más popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{p.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{p.price}&euro;</span>
                      <span className="text-sm text-muted-foreground">/mes</span>
                    </div>
                    <CardDescription>{p.orders} pedidos/mes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <Check className="size-4 text-green-600 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={p.popular ? "default" : "outline"}
                      disabled={isCurrent || checkoutMutation.isPending}
                      onClick={() => checkoutMutation.mutate({ plan: p.id })}
                    >
                      {isCurrent
                        ? "Plan actual"
                        : checkoutMutation.isPending
                          ? "Redirigiendo..."
                          : "Elegir plan"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

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
import { CreditCard, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";

export default function PaymentSettingsPage() {
  const { data: status, isLoading } = trpc.settings.getPaymentStatus.useQuery();

  const connectMutation = trpc.settings.createConnectLink.useMutation({
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CreditCard className="size-5" />
            <div>
              <CardTitle>Stripe Connect</CardTitle>
              <CardDescription>
                Conecta tu cuenta de Stripe para recibir pagos de tus clientes.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-10 w-36 rounded-md" />
            </div>
          ) : status?.connected ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {status.chargesEnabled ? (
                    <CheckCircle2 className="size-4 text-green-600" />
                  ) : (
                    <AlertCircle className="size-4 text-yellow-600" />
                  )}
                  <span className="text-sm">
                    Cobros: {status.chargesEnabled ? "Activos" : "Pendientes"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {status.payoutsEnabled ? (
                    <CheckCircle2 className="size-4 text-green-600" />
                  ) : (
                    <AlertCircle className="size-4 text-yellow-600" />
                  )}
                  <span className="text-sm">
                    Pagos: {status.payoutsEnabled ? "Activos" : "Pendientes"}
                  </span>
                </div>
              </div>

              {!status.detailsSubmitted && (
                <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
                  Tu cuenta de Stripe necesita completar la verificación.
                  <Button
                    variant="link"
                    className="ml-1 h-auto p-0 text-yellow-800 underline"
                    disabled={connectMutation.isPending}
                    onClick={() => connectMutation.mutate()}
                  >
                    Completar verificación
                    <ExternalLink className="ml-1 size-3" />
                  </Button>
                </div>
              )}

              {status.chargesEnabled && status.payoutsEnabled && (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Cuenta verificada y activa
                </Badge>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Aún no has conectado una cuenta de Stripe. Conéctala para
                empezar a cobrar a tus clientes directamente.
              </p>
              <Button
                disabled={connectMutation.isPending}
                onClick={() => connectMutation.mutate()}
              >
                {connectMutation.isPending
                  ? "Redirigiendo..."
                  : "Conectar Stripe"}
                <ExternalLink className="ml-2 size-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

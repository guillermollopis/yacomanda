"use client";

import { trpc } from "@/lib/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, CreditCard, Clock, Store } from "lucide-react";

export default function PendingSetupPage() {
  const { data, isLoading, error } = trpc.admin.pendingSetup.useQuery();

  if (error?.data?.code === "FORBIDDEN") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Acceso denegado.</p>
      </div>
    );
  }

  if (isLoading) {
    return <p className="text-muted-foreground">Cargando...</p>;
  }

  const businesses = data ?? [];
  const needsWA = businesses.filter((b) => b.needsWhatsApp).length;
  const needsStripe = businesses.filter((b) => b.needsStripe).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configuraciones pendientes</h1>
        <p className="text-sm text-muted-foreground">
          Negocios que completaron el onboarding y necesitan configuración
          manual.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100">
                <Store className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{businesses.length}</p>
                <p className="text-xs text-muted-foreground">Total pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-green-100">
                <MessageSquare className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{needsWA}</p>
                <p className="text-xs text-muted-foreground">Necesitan WhatsApp</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-purple-100">
                <CreditCard className="size-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{needsStripe}</p>
                <p className="text-xs text-muted-foreground">Necesitan Stripe</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business list */}
      {businesses.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No hay configuraciones pendientes. Todo al dia.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {businesses.map((biz) => (
            <Card key={biz.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{biz.name}</CardTitle>
                    <CardDescription>
                      {biz.type} — {biz.city} — {biz.phone}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    {biz.createdAt
                      ? new Date(biz.createdAt).toLocaleDateString("es-ES")
                      : "—"}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap items-center gap-2">
                  {biz.needsWhatsApp && (
                    <Badge
                      variant="outline"
                      className="border-green-200 bg-green-50 text-green-700"
                    >
                      <MessageSquare className="mr-1 size-3" />
                      WhatsApp pendiente
                    </Badge>
                  )}
                  {biz.needsStripe && (
                    <Badge
                      variant="outline"
                      className="border-purple-200 bg-purple-50 text-purple-700"
                    >
                      <CreditCard className="mr-1 size-3" />
                      Stripe pendiente
                    </Badge>
                  )}
                  {biz.owner && (
                    <span className="text-xs text-muted-foreground">
                      Propietario: {biz.owner.name} ({biz.owner.email})
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

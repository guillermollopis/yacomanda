"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { trpc } from "@/lib/trpc/react";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrderNotifications } from "@/hooks/use-order-notifications";
import {
  ShoppingCart,
  DollarSign,
  Receipt,
  Clock,
  AlertTriangle,
  Bell,
  RefreshCw,
} from "lucide-react";

export default function DashboardPage() {
  const { data, isLoading, error, refetch } = trpc.analytics.todaySummary.useQuery(undefined, {
    refetchInterval: 10_000,
  });

  const { notify, requestPermission, permission } = useOrderNotifications();
  const prevPendingRef = useRef<number | null>(null);

  // Update browser tab title with pending count
  useEffect(() => {
    const pending = data?.pendingCount ?? 0;
    document.title = pending > 0
      ? `(${pending}) Panel de Control — YaComanda`
      : "Panel de Control — YaComanda";
    return () => { document.title = "YaComanda"; };
  }, [data?.pendingCount]);

  // Notify on new pending orders
  useEffect(() => {
    if (data == null) return;
    const current = data.pendingCount ?? 0;
    if (prevPendingRef.current !== null && current > prevPendingRef.current) {
      notify("Nuevo pedido", `Tienes ${current} pedido${current > 1 ? "s" : ""} pendiente${current > 1 ? "s" : ""}`);
    }
    prevPendingRef.current = current;
  }, [data?.pendingCount, notify]);

  const { data: billing } = trpc.settings.getBillingStatus.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  const { data: settings } = trpc.settings.getBusinessSettings.useQuery(undefined, {
    staleTime: 10 * 60 * 1000,
  });

  const isNewBusiness = data && data.totalOrders === 0 && !data.recentOrders?.length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Panel de Control</h1>
          <p className="text-sm text-muted-foreground">Resumen de hoy para tu negocio.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Panel de Control</h1>
        </div>
        <Card className="border-red-200">
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <AlertTriangle className="size-8 text-red-500" />
            <p className="font-medium text-red-700">Error al cargar los datos</p>
            <p className="text-sm text-muted-foreground text-center">
              No se pudo conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.
            </p>
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="mr-2 size-4" />
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const usagePercent =
    billing && billing.monthlyOrderLimit
      ? Math.round(
          ((billing.monthlyOrderCount ?? 0) / billing.monthlyOrderLimit) * 100
        )
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Panel de Control</h1>
        <p className="text-sm text-muted-foreground">
          Resumen de hoy para tu negocio.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Pedidos hoy"
          value={data?.totalOrders ?? 0}
          icon={ShoppingCart}
          accent="green"
          comparison={
            data
              ? {
                  current: data.totalOrders,
                  previous: data.yesterdayOrders,
                }
              : undefined
          }
        />
        <KpiCard
          title="Ingresos hoy"
          value={formatCurrency(data?.revenue ?? "0")}
          icon={DollarSign}
          accent="amber"
          comparison={
            data
              ? {
                  current: parseFloat(data.revenue),
                  previous: parseFloat(data.yesterdayRevenue),
                }
              : undefined
          }
        />
        <KpiCard
          title="Ticket medio"
          value={formatCurrency(data?.avgTicket ?? "0")}
          icon={Receipt}
          accent="blue"
        />
        <KpiCard
          title="Pendientes"
          value={data?.pendingCount ?? 0}
          description="Pedidos esperando acción"
          icon={Clock}
          accent="pink"
        />
      </div>

      {/* Setup guide for new businesses */}
      {isNewBusiness && (
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="text-green-800">Primeros pasos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                done: true,
                text: "Crear cuenta y configurar negocio",
              },
              {
                done: !!settings?.waPhoneId,
                text: "Conectar WhatsApp Business",
                href: "/settings/whatsapp",
              },
              {
                done: !!settings?.botActive,
                text: "Activar el bot de pedidos",
                href: "/settings/whatsapp",
              },
              {
                done: false,
                text: "Recibir tu primer pedido",
              },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    step.done
                      ? "bg-green-500 text-white"
                      : "border-2 border-green-300 text-green-500"
                  }`}
                >
                  {step.done ? "✓" : i + 1}
                </div>
                {step.href ? (
                  <Link
                    href={step.href}
                    className={`text-sm ${step.done ? "text-green-700 line-through" : "text-green-800 font-medium underline"}`}
                  >
                    {step.text}
                  </Link>
                ) : (
                  <span
                    className={`text-sm ${step.done ? "text-green-700 line-through" : "text-green-800"}`}
                  >
                    {step.text}
                  </span>
                )}
              </div>
            ))}
            {!settings?.waPhoneId && (
              <p className="mt-3 text-xs text-green-600">
                La conexion de WhatsApp Business suele tardar 24-48h. Recibirás un email cuando esté lista.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Notification permission banner */}
      {permission === "default" && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="flex items-center justify-between gap-4 pt-4">
            <div className="flex items-center gap-3">
              <Bell className="size-5 shrink-0 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">
                  Activar notificaciones
                </p>
                <p className="text-sm text-blue-700">
                  Recibe alertas de sonido cuando lleguen nuevos pedidos.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0 border-blue-300 text-blue-700 hover:bg-blue-100"
              onClick={requestPermission}
            >
              Activar
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Pending orders alert */}
      {(data?.pendingCount ?? 0) > 3 && (
        <Card className="border-orange-300 bg-orange-50">
          <CardContent className="flex items-center gap-3 pt-4">
            <Clock className="size-5 text-orange-600" />
            <div>
              <p className="font-medium text-orange-800">
                {data!.pendingCount} pedidos pendientes
              </p>
              <p className="text-sm text-orange-700">
                Hay pedidos acumulados esperando ser gestionados.{" "}
                <Link href="/orders" className="underline font-medium">
                  Ver pedidos
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage limit alert */}
      {usagePercent > 90 && billing && (
        <Card className="border-red-300 bg-red-50">
          <CardContent className="flex items-center gap-3 pt-4">
            <AlertTriangle className="size-5 text-red-600" />
            <div>
              <p className="font-medium text-red-800">
                {usagePercent}% del límite de pedidos usado
              </p>
              <p className="text-sm text-red-700">
                Has usado {billing.monthlyOrderCount} de{" "}
                {billing.monthlyOrderLimit} pedidos este mes.{" "}
                <Link href="/billing" className="underline font-medium">
                  Ampliar plan
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Escalated alert */}
      {(data?.escalatedConversations ?? 0) > 0 && (
        <Card className="border-yellow-300 bg-yellow-50">
          <CardContent className="flex items-center gap-3 pt-4">
            <AlertTriangle className="size-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">
                {data!.escalatedConversations} conversación(es) escalada(s)
              </p>
              <p className="text-sm text-yellow-700">
                Hay clientes esperando atención humana.{" "}
                <Link
                  href="/conversations"
                  className="underline font-medium"
                >
                  Ver conversaciones
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent orders */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          {!data?.recentOrders?.length ? (
            <div className="py-8 text-center">
              <ShoppingCart className="mx-auto size-10 text-muted-foreground/50" />
              <p className="mt-3 text-sm text-muted-foreground">
                Aún no hay pedidos hoy.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Los pedidos de tus clientes por WhatsApp aparecerán aquí.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="hidden sm:table-cell">Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Link
                        href={`/orders/${order.id}`}
                        className="font-medium hover:underline"
                      >
                        #{order.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell>{formatCurrency(order.total)}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

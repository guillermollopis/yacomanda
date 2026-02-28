"use client";

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
import { KpiCard } from "@/components/dashboard/kpi-card";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { trpc } from "@/lib/trpc/react";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ShoppingCart,
  DollarSign,
  Receipt,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  const { data, isLoading } = trpc.analytics.todaySummary.useQuery(undefined, {
    refetchInterval: 30_000,
  });

  const { data: billing } = trpc.settings.getBillingStatus.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

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
        />
        <KpiCard
          title="Pendientes"
          value={data?.pendingCount ?? 0}
          description="Pedidos esperando acción"
          icon={Clock}
        />
      </div>

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
      {usagePercent > 90 && (
        <Card className="border-red-300 bg-red-50">
          <CardContent className="flex items-center gap-3 pt-4">
            <AlertTriangle className="size-5 text-red-600" />
            <div>
              <p className="font-medium text-red-800">
                {usagePercent}% del límite de pedidos usado
              </p>
              <p className="text-sm text-red-700">
                Has usado {billing!.monthlyOrderCount} de{" "}
                {billing!.monthlyOrderLimit} pedidos este mes.{" "}
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
            <p className="text-sm text-muted-foreground">
              Aún no hay pedidos.
            </p>
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

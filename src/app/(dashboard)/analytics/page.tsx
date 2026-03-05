"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/react";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PIE_COLORS = ["#22c55e", "#f59e0b"];

export default function AnalyticsPage() {
  const [from, setFrom] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split("T")[0];
  });
  const [to, setTo] = useState(() => new Date().toISOString().split("T")[0]);

  const dateRange = { from: new Date(from), to: new Date(to + "T23:59:59") };

  const { data: ordersByDay, isLoading: l1, error: e1, refetch: r1 } =
    trpc.analytics.ordersByDay.useQuery(dateRange);
  const { data: revenueByDay, isLoading: l2, error: e2, refetch: r2 } =
    trpc.analytics.revenueByDay.useQuery(dateRange);
  const { data: topProducts, isLoading: l3, error: e3, refetch: r3 } =
    trpc.analytics.topProducts.useQuery(dateRange);
  const { data: peakHours, isLoading: l4, error: e4, refetch: r4 } =
    trpc.analytics.peakHours.useQuery(dateRange);
  const { data: customerBreakdown, isLoading: l5, error: e5, refetch: r5 } =
    trpc.analytics.customerBreakdown.useQuery(dateRange);

  const isLoading = l1 || l2 || l3 || l4 || l5;
  const hasError = e1 || e2 || e3 || e4 || e5;

  function refetchAll() {
    r1(); r2(); r3(); r4(); r5();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Estadísticas</h1>
          <p className="text-sm text-muted-foreground">
            Analiza el rendimiento de tu negocio.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <label className="text-xs text-muted-foreground">Desde</label>
            <Input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-36"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Hasta</label>
            <Input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-36"
            />
          </div>
        </div>
      </div>

      {hasError ? (
        <div className="rounded-lg border border-red-200 p-8 text-center">
          <AlertTriangle className="mx-auto size-8 text-red-500" />
          <p className="mt-3 font-medium text-red-700">Error al cargar las estadísticas</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Comprueba tu conexión e inténtalo de nuevo.
          </p>
          <Button variant="outline" className="mt-4" onClick={refetchAll}>
            <RefreshCw className="mr-2 size-4" />
            Reintentar
          </Button>
        </div>
      ) : isLoading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[250px] rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Orders per day — Line */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Pedidos por día</CardTitle>
            </CardHeader>
            <CardContent>
              {!ordersByDay?.length ? (
                <EmptyChart />
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={ordersByDay}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={shortDate}
                      className="text-xs"
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <Tooltip
                      labelFormatter={(d) => formatDate(d as string)}
                      formatter={(v) => [v, "Pedidos"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="var(--color-primary)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Revenue per day — Bar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Ingresos por día</CardTitle>
            </CardHeader>
            <CardContent>
              {!revenueByDay?.length ? (
                <EmptyChart />
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={revenueByDay}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={shortDate}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      labelFormatter={(d) => formatDate(d as string)}
                      formatter={(v) => [
                        formatCurrency(Number(v)),
                        "Ingresos",
                      ]}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="var(--color-primary)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Top products — Horizontal bar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                Productos más vendidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!topProducts?.length ? (
                <EmptyChart />
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={topProducts} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={120}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip
                      formatter={(v) => [v, "Uds."]}
                    />
                    <Bar
                      dataKey="totalQuantity"
                      fill="var(--color-primary)"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Peak hours — Bar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Horas punta</CardTitle>
            </CardHeader>
            <CardContent>
              {!peakHours?.length ? (
                <EmptyChart />
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={padHours(peakHours)}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                      dataKey="hour"
                      tickFormatter={(h: number) => `${h}h`}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <Tooltip
                      labelFormatter={(h) => `${h}:00 - ${h}:59`}
                      formatter={(v) => [v, "Pedidos"]}
                    />
                    <Bar
                      dataKey="count"
                      fill="var(--color-primary)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* New vs recurring — Pie */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                Clientes nuevos vs recurrentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!customerBreakdown || customerBreakdown.total === 0 ? (
                <EmptyChart />
              ) : (
                <div className="flex items-center justify-center gap-8">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Nuevos", value: customerBreakdown.new },
                          {
                            name: "Recurrentes",
                            value: customerBreakdown.recurring,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {PIE_COLORS.map((color, i) => (
                          <Cell key={i} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-green-500" />
                      <span>
                        Nuevos: {customerBreakdown.new}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-amber-500" />
                      <span>
                        Recurrentes: {customerBreakdown.recurring}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Total: {customerBreakdown.total} clientes
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// --- Helpers ---

function EmptyChart() {
  return (
    <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
      Sin datos para el rango seleccionado.
    </div>
  );
}

function shortDate(dateStr: string) {
  const [, m, d] = dateStr.split("-");
  return `${d}/${m}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
  });
}

function padHours(
  data: { hour: number; count: number }[]
): { hour: number; count: number }[] {
  const map = new Map(data.map((d) => [d.hour, d.count]));
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    count: map.get(i) ?? 0,
  }));
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { keepPreviousData } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc/react";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Users, X, MessageSquare } from "lucide-react";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const limit = 20;

  // Debounce search
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );
  function handleSearch(value: string) {
    setSearch(value);
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setDebouncedSearch(value);
        setPage(0);
      }, 300)
    );
  }

  const { data, isLoading } = trpc.customers.list.useQuery(
    {
      search: debouncedSearch || undefined,
      limit,
      offset: page * limit,
    },
    { placeholderData: keepPreviousData }
  );

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Clientes</h1>
        <p className="text-sm text-muted-foreground">
          {data ? `${data.total} cliente(s) registrados` : "\u00A0"}
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar por nombre o teléfono..."
          className="pl-9"
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-0 p-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 border-b px-6 py-3">
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="hidden sm:block h-4 w-28" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          ) : !data?.items.length ? (
            <div className="flex flex-col items-center justify-center gap-2 py-12">
              <Users className="size-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {debouncedSearch
                  ? "No se encontraron clientes."
                  : "Aún no hay clientes."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Teléfono
                  </TableHead>
                  <TableHead className="text-right">Pedidos</TableHead>
                  <TableHead className="hidden md:table-cell text-right">
                    Total gastado
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Último pedido
                  </TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedId(customer.id)}
                  >
                    <TableCell className="font-medium">
                      {customer.name || "Sin nombre"}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {customer.phone}
                    </TableCell>
                    <TableCell className="text-right">
                      {customer.totalOrders ?? 0}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-right">
                      {formatCurrency(customer.totalSpent ?? "0")}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                      {customer.lastOrderAt
                        ? new Date(customer.lastOrderAt).toLocaleDateString(
                            "es-ES",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            }
                          )
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(customer.id);
                        }}
                      >
                        <Search className="size-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Página {page + 1} de {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      {/* Customer detail sheet */}
      <CustomerDetailSheet
        customerId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}

// --- Customer Detail Sheet ---

function CustomerDetailSheet({
  customerId,
  onClose,
}: {
  customerId: string | null;
  onClose: () => void;
}) {
  const { data, isLoading } = trpc.customers.get.useQuery(
    { id: customerId! },
    { enabled: !!customerId }
  );

  return (
    <Sheet open={!!customerId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{data?.name || "Cliente"}</SheetTitle>
          <SheetDescription>{data?.phone}</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="space-y-4 p-4">
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-48 rounded-lg" />
          </div>
        ) : data ? (
          <div className="space-y-6 p-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <StatCard
                label="Pedidos"
                value={String(data.totalOrders ?? 0)}
              />
              <StatCard
                label="Total gastado"
                value={formatCurrency(data.totalSpent ?? "0")}
              />
              <StatCard
                label="Desde"
                value={
                  data.createdAt
                    ? new Date(data.createdAt).toLocaleDateString("es-ES", {
                        month: "short",
                        year: "2-digit",
                      })
                    : "—"
                }
              />
            </div>

            {/* Notes */}
            {data.notes && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Notas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {data.notes}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Conversations */}
            {data.conversations.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <MessageSquare className="size-4" />
                    Conversaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {data.conversations.map((conv) => (
                    <Link
                      key={conv.id}
                      href="/conversations"
                      className="flex items-center justify-between rounded-md border p-2 text-sm transition-colors hover:bg-accent/50"
                    >
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            conv.status === "escalated"
                              ? "destructive"
                              : conv.status === "active"
                                ? "default"
                                : "secondary"
                          }
                          className="text-[10px]"
                        >
                          {conv.status === "active"
                            ? "Activa"
                            : conv.status === "escalated"
                              ? "Escalada"
                              : "Cerrada"}
                        </Badge>
                        <span className="text-muted-foreground">
                          {conv.messageCount} msgs
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {conv.lastMessageAt
                          ? new Date(
                              conv.lastMessageAt
                            ).toLocaleDateString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                            })
                          : ""}
                      </span>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recent orders */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Historial de pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                {!data.recentOrders.length ? (
                  <p className="text-sm text-muted-foreground">
                    Sin pedidos aún.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {data.recentOrders.map((order) => (
                      <Link
                        key={order.id}
                        href={`/orders/${order.id}`}
                        className="flex items-center justify-between rounded-md border p-2 text-sm transition-colors hover:bg-accent/50"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            #{order.orderNumber}
                          </span>
                          <OrderStatusBadge status={order.status} />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">
                            {formatCurrency(order.total)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {order.createdAt
                              ? new Date(
                                  order.createdAt
                                ).toLocaleDateString("es-ES", {
                                  day: "2-digit",
                                  month: "2-digit",
                                })
                              : ""}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3 text-center">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

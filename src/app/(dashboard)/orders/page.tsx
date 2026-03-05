"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useOrderNotifications } from "@/hooks/use-order-notifications";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { trpc } from "@/lib/trpc/react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import {
  Check,
  ChefHat,
  PackageCheck,
  CircleCheck,
  XCircle,
  LayoutGrid,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

const STATUS_FILTERS = [
  { value: "all", label: "Todos" },
  { value: "pending_confirmation", label: "Esperando cliente" },
  { value: "pending", label: "Pendientes" },
  { value: "confirmed", label: "Confirmados" },
  { value: "preparing", label: "Preparando" },
  { value: "ready", label: "Listos" },
  { value: "completed", label: "Completados" },
  { value: "cancelled", label: "Cancelados" },
];

const NEXT_ACTION: Record<
  string,
  { status: string; label: string; icon: React.ComponentType<{ className?: string }> } | null
> = {
  pending_confirmation: { status: "pending", label: "Forzar", icon: Check },
  pending: { status: "confirmed", label: "Confirmar", icon: Check },
  confirmed: { status: "preparing", label: "Preparar", icon: ChefHat },
  paid: { status: "preparing", label: "Preparar", icon: ChefHat },
  preparing: { status: "ready", label: "Listo", icon: PackageCheck },
  ready: { status: "completed", label: "Completar", icon: CircleCheck },
};

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
  const limit = 20;

  const { data, isLoading, error, refetch } = trpc.orders.list.useQuery(
    {
      status: statusFilter === "all" ? undefined : statusFilter,
      limit,
      offset: page * limit,
    },
    { refetchInterval: 10_000 }
  );

  const { notify } = useOrderNotifications();
  const prevTotalRef = useRef<number | null>(null);

  useEffect(() => {
    if (data == null) return;
    const current = data.total;
    if (prevTotalRef.current !== null && current > prevTotalRef.current && statusFilter === "all") {
      notify("Nuevo pedido", "Se ha recibido un nuevo pedido");
    }
    prevTotalRef.current = current;
  }, [data?.total, notify, statusFilter]);

  const utils = trpc.useUtils();
  const updateStatus = trpc.orders.updateStatus.useMutation({
    onSuccess: () => {
      utils.orders.list.invalidate();
      toast.success("Estado actualizado");
    },
    onError: (err) => toast.error(err.message),
  });

  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pedidos</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona los pedidos de tus clientes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/orders/cocina">
            <Button variant="outline" size="sm">
              <LayoutGrid className="size-4 mr-1" />
              Vista cocina
            </Button>
          </Link>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v);
            setPage(0);
          }}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_FILTERS.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 p-8 text-center">
          <AlertTriangle className="mx-auto size-8 text-red-500" />
          <p className="mt-3 font-medium text-red-700">Error al cargar los pedidos</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Comprueba tu conexión e inténtalo de nuevo.
          </p>
          <Button variant="outline" className="mt-4" onClick={() => refetch()}>
            <RefreshCw className="mr-2 size-4" />
            Reintentar
          </Button>
        </div>
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-md" />
          ))}
        </div>
      ) : !data?.items.length ? (
        <div className="flex flex-col items-center gap-2 py-12">
          <PackageCheck className="size-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            {statusFilter === "all"
              ? "Aún no hay pedidos. Los pedidos de WhatsApp aparecerán aquí."
              : "No hay pedidos con este filtro."}
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((order) => {
                  const action = NEXT_ACTION[order.status ?? "pending"];
                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Link
                          href={`/orders/${order.id}`}
                          className="font-medium hover:underline"
                        >
                          #{order.orderNumber}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div>
                          <span className="font-medium">
                            {order.customerName ?? "—"}
                          </span>
                          {order.customerPhone && (
                            <p className="text-xs text-muted-foreground">
                              {order.customerPhone}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(order.total)}</TableCell>
                      <TableCell>
                        <OrderStatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="capitalize">
                        {order.deliveryType === "delivery"
                          ? "Envío"
                          : "Recogida"}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {action && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={updateStatus.isPending}
                              onClick={() =>
                                updateStatus.mutate({
                                  id: order.id,
                                  status: action.status,
                                })
                              }
                            >
                              <action.icon className="mr-1 size-3.5" />
                              {action.label}
                            </Button>
                          )}
                          {order.status !== "completed" &&
                            order.status !== "cancelled" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={updateStatus.isPending}
                                onClick={() => setCancelOrderId(order.id)}
                              >
                                <XCircle className="size-3.5 text-destructive" />
                              </Button>
                            )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {data.total} pedidos en total
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
        </>
      )}

      <AlertDialog
        open={!!cancelOrderId}
        onOpenChange={(open) => !open && setCancelOrderId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar este pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              El pedido se marcará como cancelado. Esta acción no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Volver</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={() => {
                if (cancelOrderId)
                  updateStatus.mutate({ id: cancelOrderId, status: "cancelled" });
                setCancelOrderId(null);
              }}
            >
              Cancelar pedido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

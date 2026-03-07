"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Separator } from "@/components/ui/separator";
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
  ArrowLeft,
  Check,
  ChefHat,
  PackageCheck,
  CircleCheck,
  XCircle,
  User,
  Phone,
  MapPin,
  Clock,
  CreditCard,
  Banknote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type OrderItem = {
  name: string;
  quantity: number;
  unitPrice: string | number;
  total: string | number;
  variant?: string;
  notes?: string;
};

const NEXT_ACTION: Record<
  string,
  { status: string; label: string; icon: React.ComponentType<{ className?: string }> } | null
> = {
  pending_confirmation: { status: "pending", label: "Forzar confirmación", icon: Check },
  pending: { status: "confirmed", label: "Confirmar pedido", icon: Check },
  confirmed: { status: "preparing", label: "Empezar a preparar", icon: ChefHat },
  paid: { status: "preparing", label: "Empezar a preparar", icon: ChefHat },
  preparing: { status: "ready", label: "Marcar como listo", icon: PackageCheck },
  ready: { status: "completed", label: "Completar pedido", icon: CircleCheck },
};

export function OrderDetail({ id }: { id: string }) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const { data: order, isLoading } = trpc.orders.get.useQuery({ id });
  const utils = trpc.useUtils();

  const updateStatus = trpc.orders.updateStatus.useMutation({
    onSuccess: () => {
      utils.orders.get.invalidate({ id });
      utils.orders.list.invalidate();
      toast.success("Estado actualizado");
    },
    onError: (err) => toast.error(err.message),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-20" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-64 md:col-span-2 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/orders">
            <ArrowLeft className="mr-1 size-4" />
            Volver a pedidos
          </Link>
        </Button>
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <XCircle className="size-8 text-muted-foreground" />
            <p className="font-medium">Pedido no encontrado</p>
            <p className="text-sm text-muted-foreground text-center">
              Este pedido no existe o ha sido eliminado.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const action = NEXT_ACTION[order.status ?? "pending"];
  const items = (order.items as OrderItem[]) ?? [];
  const isTerminal = order.status === "completed" || order.status === "cancelled";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/orders">
            <ArrowLeft className="mr-1 size-4" />
            Volver
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            Pedido #{order.orderNumber}
          </h1>
          <p className="text-sm text-muted-foreground">
            {order.createdAt
              ? new Date(order.createdAt).toLocaleString("es-ES")
              : "—"}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Items */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Cant.</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="font-medium">{item.name}</span>
                      {item.variant && (
                        <p className="text-xs text-muted-foreground">
                          {item.variant}
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-xs text-muted-foreground italic">
                          {item.notes}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.unitPrice)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Separator className="my-4" />
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA</span>
                <span>{formatCurrency(order.tax ?? "0")}</span>
              </div>
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Customer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="size-4 text-muted-foreground" />
                <span>{order.customerName ?? "Desconocido"}</span>
              </div>
              {order.customerPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-muted-foreground" />
                  <span>{order.customerPhone}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {order.paymentPaidAt ? (
                <div className="flex items-center gap-2">
                  <CreditCard className="size-4 text-green-600" />
                  <span className="font-medium text-green-700">Pagado con tarjeta</span>
                  <Badge variant="outline" className="ml-auto bg-green-50 text-green-700 border-green-200 text-xs">
                    Pagado
                  </Badge>
                </div>
              ) : order.paymentUrl ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="size-4 text-amber-600" />
                    <span className="text-amber-700">Pendiente de pago</span>
                    <Badge variant="outline" className="ml-auto bg-amber-50 text-amber-700 border-amber-200 text-xs">
                      Pendiente
                    </Badge>
                  </div>
                  <a
                    href={order.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary underline"
                  >
                    Ver enlace de pago
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Banknote className="size-4 text-muted-foreground" />
                  <span>Pago en local</span>
                </div>
              )}
              {order.paymentPaidAt && (
                <p className="text-xs text-muted-foreground">
                  {new Date(order.paymentPaidAt).toLocaleString("es-ES")}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Delivery */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-muted-foreground" />
                <span>
                  {order.deliveryType === "delivery" ? "Envío a domicilio" : "Recogida en local"}
                </span>
              </div>
              {order.deliveryAddress && (
                <p className="text-muted-foreground pl-6">
                  {order.deliveryAddress}
                </p>
              )}
              {order.deliveryTime && (
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-muted-foreground" />
                  <span>
                    {new Date(order.deliveryTime).toLocaleString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              )}
              {order.notes && (
                <div>
                  <CardDescription>Notas</CardDescription>
                  <p className="text-muted-foreground">{order.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          {!isTerminal && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {action && (
                  <Button
                    className="w-full"
                    disabled={updateStatus.isPending}
                    onClick={() =>
                      updateStatus.mutate({ id, status: action.status })
                    }
                  >
                    <action.icon className="mr-2 size-4" />
                    {action.label}
                  </Button>
                )}
                <Button
                  variant="destructive"
                  className="w-full"
                  disabled={updateStatus.isPending}
                  onClick={() => setShowCancelDialog(true)}
                >
                  <XCircle className="mr-2 size-4" />
                  Cancelar pedido
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar este pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              El pedido #{order.orderNumber} se marcará como cancelado. Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Volver</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={() => updateStatus.mutate({ id, status: "cancelled" })}
            >
              Cancelar pedido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

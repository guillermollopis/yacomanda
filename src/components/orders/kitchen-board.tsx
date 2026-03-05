"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/react";
import { useOrderNotifications } from "@/hooks/use-order-notifications";
import { KdsColumn } from "./kds-column";
import { KdsOrderCard } from "./kds-order-card";
import { toast } from "sonner";
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
import { ArrowLeft, Maximize2, Minimize2, Bell, AlertTriangle, RefreshCw } from "lucide-react";

type LiveOrder = {
  id: string;
  orderNumber: number | null;
  items: unknown;
  total: string | null;
  status: string | null;
  deliveryType: string | null;
  notes: string | null;
  createdAt: Date | string | null;
  customerName: string | null;
  customerPhone: string | null;
};

// Column bucket definitions
const NEW_STATUSES = ["pending_confirmation", "pending"];
const PREPARING_STATUSES = ["confirmed", "payment_sent", "paid", "preparing"];
const READY_STATUSES = ["ready"];

export function KitchenBoard() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
  const seenIdsRef = useRef<Set<string>>(new Set());
  const initialLoadRef = useRef(true);

  const { notifyRepeating, stopRepeating, requestPermission, permission } =
    useOrderNotifications();

  const { data: allOrders, isLoading, error, refetch } = trpc.orders.liveBoard.useQuery(
    undefined,
    { refetchInterval: 5_000 }
  );

  const utils = trpc.useUtils();
  const updateStatus = trpc.orders.updateStatus.useMutation({
    onSuccess: () => {
      utils.orders.liveBoard.invalidate();
      toast.success("Estado actualizado");
    },
    onError: (err) => toast.error(err.message),
  });

  // Split orders into column buckets
  const { nuevos, preparando, listos, newIds } = useMemo(() => {
    const items = allOrders ?? [];
    const n: LiveOrder[] = [];
    const p: LiveOrder[] = [];
    const r: LiveOrder[] = [];

    for (const order of items) {
      const s = order.status ?? "pending";
      if (NEW_STATUSES.includes(s)) n.push(order);
      else if (PREPARING_STATUSES.includes(s)) p.push(order);
      else if (READY_STATUSES.includes(s)) r.push(order);
    }

    // Detect genuinely new cards
    const currentNewIds = new Set(n.map((o) => o.id));

    return { nuevos: n, preparando: p, listos: r, newIds: currentNewIds };
  }, [allOrders]);

  // Track new cards for flash animation
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!allOrders) return;

    if (initialLoadRef.current) {
      // First load — mark all as seen, no flash
      seenIdsRef.current = new Set(newIds);
      initialLoadRef.current = false;
      return;
    }

    const fresh = new Set<string>();
    for (const id of newIds) {
      if (!seenIdsRef.current.has(id)) {
        fresh.add(id);
      }
    }

    if (fresh.size > 0) {
      setFlashIds(fresh);
      // Clear flash after animation completes (~1.8s for 3 cycles at 0.6s)
      setTimeout(() => setFlashIds(new Set()), 2000);
    }

    seenIdsRef.current = new Set(newIds);
  }, [newIds, allOrders]);

  // Repeating alarm for new orders
  useEffect(() => {
    if (nuevos.length > 0) {
      notifyRepeating(nuevos.length);
    } else {
      stopRepeating();
    }
  }, [nuevos.length, notifyRepeating, stopRepeating]);

  // Update tab title
  useEffect(() => {
    const total = (allOrders ?? []).length;
    document.title = total > 0 ? `(${total}) Cocina — YaComanda` : "Cocina — YaComanda";
    return () => {
      document.title = "YaComanda";
    };
  }, [allOrders]);

  // Escape key exits fullscreen
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFullscreen]);

  const handleAdvance = useCallback(
    (id: string, status: string) => {
      updateStatus.mutate({ id, status });
    },
    [updateStatus]
  );

  const handleCancel = useCallback((id: string) => {
    setCancelOrderId(id);
  }, []);

  const totalOrders = (allOrders ?? []).length;

  const board = (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-background flex flex-col" : "flex flex-col h-full"}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
        <div className="flex items-center gap-3">
          {!isFullscreen && (
            <Link href="/orders">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="size-4 mr-1" />
                Pedidos
              </Button>
            </Link>
          )}
          <h1 className="text-xl font-bold">
            Cocina{" "}
            {totalOrders > 0 && (
              <span className="text-muted-foreground font-normal">
                ({totalOrders})
              </span>
            )}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {permission !== "granted" && (
            <Button variant="outline" size="sm" onClick={requestPermission}>
              <Bell className="size-4 mr-1" />
              Activar sonido
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen((f) => !f)}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="size-4 mr-1" />
                Salir
              </>
            ) : (
              <>
                <Maximize2 className="size-4 mr-1" />
                Pantalla completa
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Columns */}
      {error ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <AlertTriangle className="size-8 text-red-500" />
          <p className="font-medium text-red-700">Error al cargar los pedidos</p>
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="mr-2 size-4" />
            Reintentar
          </Button>
        </div>
      ) : isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Cargando pedidos...</p>
        </div>
      ) : totalOrders === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <p className="text-lg font-medium">Sin pedidos activos</p>
          <p className="text-sm">Los nuevos pedidos aparecerán aquí automáticamente.</p>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 overflow-auto">
          <KdsColumn title="Nuevos" count={nuevos.length} color="amber">
            {nuevos.map((order) => (
              <KdsOrderCard
                key={order.id}
                order={order}
                isNew={flashIds.has(order.id)}
                onAdvance={handleAdvance}
                onCancel={handleCancel}
                isPending={updateStatus.isPending}
              />
            ))}
          </KdsColumn>

          <KdsColumn title="Preparando" count={preparando.length} color="blue">
            {preparando.map((order) => (
              <KdsOrderCard
                key={order.id}
                order={order}
                isNew={false}
                onAdvance={handleAdvance}
                onCancel={handleCancel}
                isPending={updateStatus.isPending}
              />
            ))}
          </KdsColumn>

          <KdsColumn title="Listos" count={listos.length} color="green">
            {listos.map((order) => (
              <KdsOrderCard
                key={order.id}
                order={order}
                isNew={false}
                onAdvance={handleAdvance}
                onCancel={handleCancel}
                isPending={updateStatus.isPending}
              />
            ))}
          </KdsColumn>
        </div>
      )}

      {/* Cancel dialog */}
      <AlertDialog
        open={!!cancelOrderId}
        onOpenChange={(open) => !open && setCancelOrderId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar este pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              El pedido se marcará como cancelado y desaparecerá del tablero.
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

  return board;
}

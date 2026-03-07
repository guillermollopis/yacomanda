"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useElapsedTime } from "@/hooks/use-elapsed-time";
import { Truck, Store, XCircle } from "lucide-react";

type OrderItem = {
  name: string;
  quantity: number;
  variant?: string;
};

type KdsOrder = {
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

const ADVANCE_ACTION: Record<string, { status: string; label: string }> = {
  pending_confirmation: { status: "pending", label: "Confirmar" },
  pending: { status: "confirmed", label: "Confirmar" },
  confirmed: { status: "preparing", label: "Preparar" },
  paid: { status: "preparing", label: "Preparar" },
  preparing: { status: "ready", label: "Listo" },
  ready: { status: "completed", label: "Completar" },
};

const COLUMN_BUTTON_STYLE: Record<string, string> = {
  pending_confirmation: "bg-amber-500 hover:bg-amber-600 text-white",
  pending: "bg-amber-500 hover:bg-amber-600 text-white",
  confirmed: "bg-blue-500 hover:bg-blue-600 text-white",
  paid: "bg-blue-500 hover:bg-blue-600 text-white",
  preparing: "bg-green-500 hover:bg-green-600 text-white",
  ready: "bg-green-600 hover:bg-green-700 text-white",
};

export function KdsOrderCard({
  order,
  isNew,
  onAdvance,
  onCancel,
  isPending,
}: {
  order: KdsOrder;
  isNew: boolean;
  onAdvance: (id: string, status: string) => void;
  onCancel: (id: string) => void;
  isPending: boolean;
}) {
  const { label: elapsed, urgency } = useElapsedTime(order.createdAt);
  const action = ADVANCE_ACTION[order.status ?? "pending"];
  const items = (Array.isArray(order.items) ? order.items : []) as OrderItem[];

  const urgencyClass =
    urgency === "red"
      ? "text-red-600 bg-red-50 border-red-200 animate-pulse"
      : urgency === "amber"
        ? "text-amber-600 bg-amber-50 border-amber-200"
        : "text-muted-foreground bg-muted";

  return (
    <Card
      className={`p-3 space-y-2 ${isNew ? "animate-flash-new" : ""}`}
    >
      {/* Header: order number + delivery icon + elapsed */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">#{order.orderNumber}</span>
          {order.deliveryType === "delivery" ? (
            <Truck className="size-4 text-muted-foreground" />
          ) : (
            <Store className="size-4 text-muted-foreground" />
          )}
        </div>
        <Badge variant="outline" className={`text-xs ${urgencyClass}`}>
          {elapsed}
        </Badge>
      </div>

      {/* Customer name */}
      {order.customerName && (
        <p className="text-sm font-medium truncate">{order.customerName}</p>
      )}

      {/* Items list */}
      <ul className="space-y-0.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm">
            <span className="font-semibold">{item.quantity}×</span>{" "}
            {item.name}
            {item.variant && (
              <span className="text-muted-foreground ml-1">({item.variant})</span>
            )}
          </li>
        ))}
      </ul>

      {/* Notes */}
      {order.notes && (
        <p className="text-xs text-muted-foreground italic border-l-2 border-amber-400 pl-2">
          {order.notes}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        {action && (
          <Button
            className={`flex-1 h-11 text-base font-semibold ${COLUMN_BUTTON_STYLE[order.status ?? "pending"] ?? ""}`}
            disabled={isPending}
            onClick={() => onAdvance(order.id, action.status)}
          >
            {action.label}
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11 shrink-0"
          disabled={isPending}
          onClick={() => onCancel(order.id)}
        >
          <XCircle className="size-5 text-destructive" />
        </Button>
      </div>
    </Card>
  );
}

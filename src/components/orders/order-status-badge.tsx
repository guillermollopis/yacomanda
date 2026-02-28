"use client";

import { Badge } from "@/components/ui/badge";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Pendiente",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  confirmed: {
    label: "Confirmado",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  payment_sent: {
    label: "Pago enviado",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  paid: {
    label: "Pagado",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  preparing: {
    label: "Preparando",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  ready: {
    label: "Listo",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  completed: {
    label: "Completado",
    className: "bg-gray-100 text-gray-600 border-gray-200",
  },
  cancelled: {
    label: "Cancelado",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export function OrderStatusBadge({ status }: { status: string | null }) {
  const config = STATUS_CONFIG[status ?? "pending"] ?? STATUS_CONFIG.pending;

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}

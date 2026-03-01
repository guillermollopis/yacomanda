"use client";

import { Badge } from "@/components/ui/badge";

const STATUS_CONFIG: Record<string, { label: string; className: string; dot: string }> = {
  pending: {
    label: "Pendiente",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    dot: "bg-yellow-500",
  },
  confirmed: {
    label: "Confirmado",
    className: "bg-blue-100 text-blue-800 border-blue-200",
    dot: "bg-blue-500",
  },
  payment_sent: {
    label: "Pago enviado",
    className: "bg-blue-100 text-blue-800 border-blue-200",
    dot: "bg-blue-500",
  },
  paid: {
    label: "Pagado",
    className: "bg-orange-100 text-orange-800 border-orange-200",
    dot: "bg-orange-500",
  },
  preparing: {
    label: "Preparando",
    className: "bg-orange-100 text-orange-800 border-orange-200",
    dot: "bg-orange-500 animate-pulse",
  },
  ready: {
    label: "Listo",
    className: "bg-green-100 text-green-800 border-green-200",
    dot: "bg-green-500",
  },
  completed: {
    label: "Completado",
    className: "bg-gray-100 text-gray-600 border-gray-200",
    dot: "bg-gray-400",
  },
  cancelled: {
    label: "Cancelado",
    className: "bg-red-100 text-red-800 border-red-200",
    dot: "bg-red-500",
  },
};

export function OrderStatusBadge({ status }: { status: string | null }) {
  const config = STATUS_CONFIG[status ?? "pending"] ?? STATUS_CONFIG.pending;

  return (
    <Badge variant="outline" className={`gap-1.5 ${config.className}`}>
      <span className={`size-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </Badge>
  );
}

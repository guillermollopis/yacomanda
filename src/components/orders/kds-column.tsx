"use client";

import { Badge } from "@/components/ui/badge";

export function KdsColumn({
  title,
  count,
  color,
  children,
}: {
  title: string;
  count: number;
  color: "amber" | "blue" | "green";
  children: React.ReactNode;
}) {
  const colorClasses = {
    amber: "bg-amber-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
  };

  const headerBorder = {
    amber: "border-b-amber-500",
    blue: "border-b-blue-500",
    green: "border-b-green-500",
  };

  return (
    <div className="flex flex-col min-h-0">
      {/* Sticky header */}
      <div
        className={`sticky top-0 z-10 flex items-center justify-between px-3 py-2 bg-muted/80 backdrop-blur-sm rounded-t-lg border-b-2 ${headerBorder[color]}`}
      >
        <h2 className="font-semibold text-sm">{title}</h2>
        <Badge className={`${colorClasses[color]} text-white text-xs`}>
          {count}
        </Badge>
      </div>

      {/* Scrollable card area */}
      <div className="flex-1 overflow-y-auto space-y-3 p-2 min-h-[120px]">
        {count === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            Sin pedidos
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

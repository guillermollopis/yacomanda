"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function KpiCard({
  title,
  value,
  description,
  icon: Icon,
  comparison,
}: {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  comparison?: { current: number; previous: number };
}) {
  const trend = comparison
    ? comparison.previous === 0
      ? comparison.current > 0
        ? 100
        : 0
      : Math.round(
          ((comparison.current - comparison.previous) / comparison.previous) *
            100
        )
    : null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend !== null && trend !== 0 ? (
          <p className="flex items-center gap-1 text-xs">
            {trend > 0 ? (
              <TrendingUp className="size-3 text-green-600" />
            ) : (
              <TrendingDown className="size-3 text-red-600" />
            )}
            <span className={trend > 0 ? "text-green-600" : "text-red-600"}>
              {trend > 0 ? "+" : ""}
              {trend}%
            </span>
            <span className="text-muted-foreground">vs ayer</span>
          </p>
        ) : description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

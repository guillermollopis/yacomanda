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
  accent = "green",
}: {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  comparison?: { current: number; previous: number };
  accent?: "green" | "amber" | "blue" | "pink";
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

  const accentColors = {
    green: "bg-primary/10 text-primary",
    amber: "bg-amber-100 text-amber-600",
    blue: "bg-blue-100 text-blue-600",
    pink: "bg-pink-100 text-pink-600",
  };

  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`flex size-8 items-center justify-center rounded-lg ${accentColors[accent]}`}>
          <Icon className="size-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend !== null && trend !== 0 ? (
          <div className="mt-1 flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium ${
                trend > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {trend > 0 ? (
                <TrendingUp className="size-3" />
              ) : (
                <TrendingDown className="size-3" />
              )}
              {trend > 0 ? "+" : ""}
              {trend}%
            </span>
            <span className="text-xs text-muted-foreground">vs ayer</span>
          </div>
        ) : description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

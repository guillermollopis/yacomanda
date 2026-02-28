"use client";

import { UserButton } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { MobileSidebar } from "./mobile-sidebar";
import { trpc } from "@/lib/trpc/react";

const isClerkConfigured =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("REPLACE_ME");

const planColors: Record<string, string> = {
  esencial: "bg-blue-100 text-blue-700",
  profesional: "bg-purple-100 text-purple-700",
  premium: "bg-amber-100 text-amber-700",
};

export function DashboardHeader() {
  const { data } = trpc.settings.getBusinessHeader.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  return (
    <header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        {data && (
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold max-w-[180px] md:max-w-[280px]">
              {data.name}
            </span>
            <Badge
              variant="secondary"
              className={planColors[data.plan ?? "esencial"] ?? planColors.esencial}
            >
              {data.plan ?? "esencial"}
            </Badge>
          </div>
        )}
      </div>
      {isClerkConfigured ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <span className="text-sm text-muted-foreground">Auth no configurado</span>
      )}
    </header>
  );
}

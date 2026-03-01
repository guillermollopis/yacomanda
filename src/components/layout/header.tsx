"use client";

import { UserButton } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { MobileSidebar } from "./mobile-sidebar";
import { trpc } from "@/lib/trpc/react";

const isClerkConfigured =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("REPLACE_ME");

const planColors: Record<string, string> = {
  esencial: "bg-primary/10 text-primary",
  profesional: "bg-purple-100 text-purple-700",
  premium: "bg-amber-100 text-amber-700",
};

export function DashboardHeader() {
  const { data } = trpc.settings.getBusinessHeader.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
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

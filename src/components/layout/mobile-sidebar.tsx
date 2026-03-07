"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { navItems, adminNavItems } from "./nav-items";
import { trpc } from "@/lib/trpc/react";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: isAdmin } = trpc.admin.isAdmin.useQuery(undefined, {
    staleTime: 10 * 60 * 1000,
  });
  const { data: billing } = trpc.settings.getBillingStatus.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  const allItems = isAdmin ? [...navItems, ...adminNavItems] : navItems;
  const showUpgrade =
    billing && billing.subscriptionStatus !== "active" && billing.plan !== "negocio";

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
      >
        <Menu className="size-5" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 border-slate-800 bg-[#0c1222] p-0 text-slate-300">
          <SheetHeader className="border-b border-slate-800 px-6 py-4">
            <SheetTitle className="flex items-center gap-2 text-xl font-bold text-white">
              <span className="flex size-7 items-center justify-center rounded-lg bg-green-500 text-xs font-black text-white">
                Ya
              </span>
              Comanda
            </SheetTitle>
          </SheetHeader>
          <nav className="flex-1 space-y-1 p-4">
            {allItems.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  )}
                >
                  <item.icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
            {billing && (
              <div className="mt-4 rounded-lg bg-white/5 px-3 py-2.5">
                <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                  <span>{billing.monthlyOrderCount ?? 0} pedidos</span>
                  <span>de {billing.monthlyOrderLimit ?? 50}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all ${
                      ((billing.monthlyOrderCount ?? 0) / (billing.monthlyOrderLimit ?? 50)) * 100 > 90
                        ? "bg-red-500"
                        : ((billing.monthlyOrderCount ?? 0) / (billing.monthlyOrderLimit ?? 50)) * 100 > 70
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min(((billing.monthlyOrderCount ?? 0) / (billing.monthlyOrderLimit ?? 50)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
            {showUpgrade && (
              <Link
                href="/billing"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-2.5 text-sm font-medium text-white"
              >
                <Sparkles className="size-4 shrink-0" />
                Actualizar plan
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}

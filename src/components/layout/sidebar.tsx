"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems, adminNavItems } from "./nav-items";
import { trpc } from "@/lib/trpc/react";
import { Sparkles } from "lucide-react";

export function Sidebar() {
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
    <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold text-white">
          <span className="flex size-7 items-center justify-center rounded-lg bg-green-500 text-xs font-black text-white shadow-md shadow-green-500/30">
            Ya
          </span>
          Comanda
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {allItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              {isActive && (
                <span className="absolute -left-4 h-5 w-1 rounded-r-full bg-green-500" />
              )}
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      {showUpgrade && (
        <div className="p-4">
          <Link
            href="/billing"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-green-900/30 transition-transform hover:scale-[1.02]"
          >
            <Sparkles className="size-4 shrink-0" />
            <div>
              <div>Actualizar plan</div>
              <div className="text-[11px] font-normal text-green-100">
                Desde 29&euro;/mes
              </div>
            </div>
          </Link>
        </div>
      )}
    </aside>
  );
}

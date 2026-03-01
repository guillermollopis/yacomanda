"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems, adminNavItems } from "./nav-items";
import { trpc } from "@/lib/trpc/react";

export function Sidebar() {
  const pathname = usePathname();
  const { data: isAdmin } = trpc.admin.isAdmin.useQuery(undefined, {
    staleTime: 10 * 60 * 1000,
  });

  const allItems = isAdmin ? [...navItems, ...adminNavItems] : navItems;

  return (
    <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold text-white">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-black text-primary-foreground">
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
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              {isActive && (
                <span className="absolute left-0 h-6 w-0.5 rounded-r-full bg-primary" />
              )}
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

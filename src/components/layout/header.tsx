"use client";

import { UserButton } from "@clerk/nextjs";

const isClerkConfigured =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("REPLACE_ME");

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div />
      {isClerkConfigured ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <span className="text-sm text-muted-foreground">Auth no configurado</span>
      )}
    </header>
  );
}

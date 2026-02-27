import { Sidebar } from "@/components/layout/sidebar";
import { DashboardHeader } from "@/components/layout/header";
import { TRPCReactProvider } from "@/lib/trpc/react";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TRPCReactProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </TRPCReactProvider>
  );
}

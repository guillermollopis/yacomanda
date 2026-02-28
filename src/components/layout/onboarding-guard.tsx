"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc/react";

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, isLoading } = trpc.onboarding.getStatus.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!isLoading && data && !data.onboardingCompleted) {
      router.replace("/onboarding");
    }
  }, [data, isLoading, router]);

  // While loading or if not completed, show nothing (redirect will fire)
  if (isLoading) return null;
  if (data && !data.onboardingCompleted) return null;

  return <>{children}</>;
}

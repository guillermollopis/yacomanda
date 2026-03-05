"use client";

import { useState, useEffect } from "react";
import { KDS_URGENCY } from "@/config/constants";

type Urgency = "normal" | "amber" | "red";

export function useElapsedTime(createdAt: string | Date | null) {
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (!createdAt) return;

    const calculate = () => {
      const diff = Date.now() - new Date(createdAt).getTime();
      setMinutes(Math.floor(diff / 60_000));
    };

    calculate();
    const interval = setInterval(calculate, 30_000);
    return () => clearInterval(interval);
  }, [createdAt]);

  let urgency: Urgency = "normal";
  if (minutes >= KDS_URGENCY.RED_MINUTES) urgency = "red";
  else if (minutes >= KDS_URGENCY.AMBER_MINUTES) urgency = "amber";

  const label = minutes < 1 ? "<1 min" : `${minutes} min`;

  return { minutes, label, urgency };
}

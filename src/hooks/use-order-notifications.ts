"use client";

import { useCallback, useEffect, useRef, useState } from "react";

let audioRef: HTMLAudioElement | null = null;

function getAudio() {
  if (typeof window === "undefined") return null;
  if (!audioRef) {
    audioRef = new Audio("/sounds/new-order.mp3");
    audioRef.volume = 0.7;
  }
  return audioRef;
}

export function useOrderNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, []);

  const notify = useCallback(
    (title: string, body: string) => {
      // Play sound regardless of notification permission
      const audio = getAudio();
      audio?.play().catch(() => {});

      // Show browser notification if permitted
      if (permission === "granted") {
        try {
          new Notification(title, {
            body,
            icon: "/favicon.ico",
            tag: "yacomanda-order",
          });
        } catch {
          // Notification constructor may fail in some contexts
        }
      }
    },
    [permission]
  );

  return {
    notify,
    requestPermission,
    permission,
    enabled: permission === "granted",
  };
}

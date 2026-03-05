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
  const repeatingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
    return () => {
      if (repeatingRef.current) clearInterval(repeatingRef.current);
    };
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, []);

  const playSound = useCallback(() => {
    const audio = getAudio();
    audio?.play().catch(() => {});
  }, []);

  const notify = useCallback(
    (title: string, body: string) => {
      playSound();

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
    [permission, playSound]
  );

  const notifyRepeating = useCallback(
    (newCount: number) => {
      // Clear existing interval
      if (repeatingRef.current) {
        clearInterval(repeatingRef.current);
        repeatingRef.current = null;
      }

      if (newCount <= 0) return;

      // Play immediately
      playSound();

      // Repeat every 30s while new orders exist
      repeatingRef.current = setInterval(() => {
        playSound();
      }, 30_000);
    },
    [playSound]
  );

  const stopRepeating = useCallback(() => {
    if (repeatingRef.current) {
      clearInterval(repeatingRef.current);
      repeatingRef.current = null;
    }
  }, []);

  return {
    notify,
    notifyRepeating,
    stopRepeating,
    requestPermission,
    permission,
    enabled: permission === "granted",
  };
}

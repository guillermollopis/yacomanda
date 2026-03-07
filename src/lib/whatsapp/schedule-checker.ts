/**
 * Business hours checking using Intl.DateTimeFormat for timezone awareness.
 *
 * Schedule format (stored in `kitchenSchedule` jsonb):
 * {
 *   "monday":    { "open": "09:00", "close": "22:00" },
 *   "tuesday":   { "open": "09:00", "close": "22:00" },
 *   ...
 * }
 * Missing day = closed that day.
 * NOTE: Empty object {} is intercepted by message-processor as "all days closed"
 * before reaching isBusinessOpen(). If it does reach here, treat as open (legacy).
 */

const DAY_NAMES = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

interface DaySchedule {
  open: string; // "HH:MM"
  close: string; // "HH:MM"
}

type WeekSchedule = Record<string, DaySchedule>;

function getCurrentTimeInZone(timezone: string) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  let weekday = "";
  let hour = "";
  let minute = "";

  for (const part of parts) {
    if (part.type === "weekday") weekday = part.value.toLowerCase();
    if (part.type === "hour") hour = part.value;
    if (part.type === "minute") minute = part.value;
  }

  // Handle "24" edge case from some locales
  if (hour === "24") hour = "00";

  return {
    dayName: weekday,
    time: `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`,
    dayIndex: DAY_NAMES.indexOf(weekday as (typeof DAY_NAMES)[number]),
  };
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function isBusinessOpen(
  schedule: WeekSchedule,
  timezone: string
): { open: boolean; nextOpenTime?: string } {
  // Empty schedule = always open
  if (Object.keys(schedule).length === 0) {
    return { open: true };
  }

  const { dayName, time, dayIndex } = getCurrentTimeInZone(timezone);
  const todaySchedule = schedule[dayName];

  if (todaySchedule) {
    const nowMinutes = timeToMinutes(time);
    const openMinutes = timeToMinutes(todaySchedule.open);
    const closeMinutes = timeToMinutes(todaySchedule.close);

    if (nowMinutes >= openMinutes && nowMinutes < closeMinutes) {
      return { open: true };
    }

    // If before opening today, return today's open time
    if (nowMinutes < openMinutes) {
      return { open: false, nextOpenTime: todaySchedule.open };
    }
  }

  // Find next open day
  for (let offset = 1; offset <= 7; offset++) {
    const nextIndex = (dayIndex + offset) % 7;
    const nextDay = DAY_NAMES[nextIndex];
    const nextSchedule = schedule[nextDay];
    if (nextSchedule) {
      const dayLabel = offset === 1 ? "mañana" : nextDay;
      return {
        open: false,
        nextOpenTime: `${nextSchedule.open} (${dayLabel})`,
      };
    }
  }

  return { open: false };
}

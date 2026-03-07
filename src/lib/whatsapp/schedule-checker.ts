/**
 * Business hours checking using Intl.DateTimeFormat for timezone awareness.
 *
 * Schedule format (stored in `kitchenSchedule` jsonb):
 * {
 *   "monday":    [{ "open": "12:00", "close": "17:00" }, { "open": "20:00", "close": "00:00" }],
 *   "tuesday":   [{ "open": "09:00", "close": "22:00" }],
 *   ...
 * }
 * Legacy single-range format is also supported:
 * { "monday": { "open": "09:00", "close": "22:00" } }
 *
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

interface TimeRange {
  open: string; // "HH:MM"
  close: string; // "HH:MM"
}

type WeekSchedule = Record<string, TimeRange | TimeRange[]>;

/** Normalize to always return an array of ranges */
function normalizeRanges(value: TimeRange | TimeRange[]): TimeRange[] {
  return Array.isArray(value) ? value : [value];
}

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
  const todayEntry = schedule[dayName];
  const nowMinutes = timeToMinutes(time);

  if (todayEntry) {
    const ranges = normalizeRanges(todayEntry);

    // Check if currently within any range
    for (const range of ranges) {
      const openMin = timeToMinutes(range.open);
      // "00:00" as close time means midnight (end of day = 1440)
      const closeMin = range.close === "00:00" || range.close === "24:00"
        ? 1440
        : timeToMinutes(range.close);

      if (nowMinutes >= openMin && nowMinutes < closeMin) {
        return { open: true };
      }
    }

    // Not open now — find next range today that hasn't started yet
    const nextRangeToday = ranges
      .filter((r) => timeToMinutes(r.open) > nowMinutes)
      .sort((a, b) => timeToMinutes(a.open) - timeToMinutes(b.open))[0];

    if (nextRangeToday) {
      return { open: false, nextOpenTime: nextRangeToday.open };
    }
  }

  // Find next open day
  for (let offset = 1; offset <= 7; offset++) {
    const nextIndex = (dayIndex + offset) % 7;
    const nextDay = DAY_NAMES[nextIndex];
    const nextEntry = schedule[nextDay];
    if (nextEntry) {
      const nextRanges = normalizeRanges(nextEntry);
      const firstRange = nextRanges.sort(
        (a, b) => timeToMinutes(a.open) - timeToMinutes(b.open)
      )[0];
      const dayLabel = offset === 1 ? "mañana" : nextDay;
      return {
        open: false,
        nextOpenTime: `${firstRange.open} (${dayLabel})`,
      };
    }
  }

  return { open: false };
}

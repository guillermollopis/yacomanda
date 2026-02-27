import type {
  ORDER_STATUSES,
  BUSINESS_TYPES,
  PLANS,
  BOT_TONES,
  USER_ROLES,
  DELIVERY_TYPES,
} from "@/config/constants";

export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type BusinessType = (typeof BUSINESS_TYPES)[number];
export type Plan = (typeof PLANS)[number];
export type BotTone = (typeof BOT_TONES)[number];
export type UserRole = (typeof USER_ROLES)[number];
export type DeliveryType = (typeof DELIVERY_TYPES)[number];

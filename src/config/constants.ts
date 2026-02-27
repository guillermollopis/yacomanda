export const APP_NAME = "YaComanda";
export const APP_DESCRIPTION =
  "Automatiza los pedidos de tu restaurante por WhatsApp con IA";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "payment_sent",
  "paid",
  "preparing",
  "ready",
  "completed",
  "cancelled",
] as const;

export const BUSINESS_TYPES = [
  "restaurant",
  "bar",
  "cafe",
  "bakery",
] as const;

export const PLANS = [
  "trial",
  "esencial",
  "profesional",
  "negocio",
] as const;

export const BOT_TONES = ["formal", "informal", "muy_informal"] as const;

export const USER_ROLES = ["owner", "admin", "staff"] as const;

export const DELIVERY_TYPES = ["pickup", "delivery"] as const;

export const ALLERGENS = [
  "gluten",
  "lactosa",
  "huevos",
  "pescado",
  "crustaceos",
  "frutos_secos",
  "soja",
  "apio",
  "mostaza",
  "sesamo",
  "sulfitos",
  "altramuces",
  "moluscos",
  "cacahuetes",
] as const;

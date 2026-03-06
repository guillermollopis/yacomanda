import {
  pgTable,
  uuid,
  text,
  boolean,
  integer,
  decimal,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ============================================
// YACOMANDA: FULL DATABASE SCHEMA (Drizzle ORM)
// ============================================

// --- Businesses (multi-tenant) ---

export const businesses = pgTable(
  "businesses",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: text().notNull(),
    slug: text().notNull().unique(),
    type: text().notNull().default("restaurant"),
    phone: text().notNull(),
    email: text(),
    address: text(),
    city: text(),
    postalCode: text("postal_code"),

    // WhatsApp
    waPhoneId: text("wa_phone_id"),
    waBusinessId: text("wa_business_id"),
    waAccessToken: text("wa_access_token"),
    waWebhookVerifyToken: text("wa_webhook_verify_token"),
    notificationPhone: text("notification_phone"),

    // Stripe
    stripeAccountId: text("stripe_account_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    stripeCustomerId: text("stripe_customer_id"),

    // Redsys (future)
    redsysMerchantCode: text("redsys_merchant_code"),

    // Localization
    timezone: text().default("Europe/Madrid"),
    currency: text().default("EUR"),
    locale: text().default("es-ES"),

    // Plan & billing
    plan: text().default("esencial"),
    monthlyOrderLimit: integer("monthly_order_limit").default(500),
    monthlyOrderCount: integer("monthly_order_count").default(0),
    setupFeePaid: boolean("setup_fee_paid").default(false),
    subscriptionStatus: text("subscription_status").default("trial"),
    trialEndsAt: timestamp("trial_ends_at", { withTimezone: true }),

    // Bot config
    botActive: boolean("bot_active").default(false),
    botTone: text("bot_tone").default("informal"),
    welcomeMessage: text("welcome_message"),
    kitchenSchedule: jsonb("kitchen_schedule"),
    minPreparationMinutes: integer("min_preparation_minutes").default(30),
    deliveryEnabled: boolean("delivery_enabled").default(false),
    pickupEnabled: boolean("pickup_enabled").default(true),

    bizumPhone: text("bizum_phone"),
    onboardingCompleted: boolean("onboarding_completed").default(false),
    logoUrl: text("logo_url"),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_businesses_slug").on(table.slug),
    index("idx_businesses_wa_phone_id").on(table.waPhoneId),
  ]
);

// --- Catalog Items ---

export const catalogItems = pgTable(
  "catalog_items",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    name: text().notNull(),
    description: text(),
    price: decimal({ precision: 10, scale: 2 }).notNull(),
    category: text(),
    variants: jsonb().default([]),
    allergens: text().array(),
    available: boolean().default(true),
    imageUrl: text("image_url"),
    sortOrder: integer("sort_order").default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_catalog_business").on(
      table.businessId,
      table.available,
      table.sortOrder
    ),
  ]
);

// --- Customers ---

export const customers = pgTable(
  "customers",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    phone: text().notNull(),
    name: text(),
    waProfileName: text("wa_profile_name"),
    notes: text(),
    totalOrders: integer("total_orders").default(0),
    totalSpent: decimal("total_spent", { precision: 10, scale: 2 }).default(
      "0"
    ),
    lastOrderAt: timestamp("last_order_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    uniqueIndex("idx_customers_business_phone").on(
      table.businessId,
      table.phone
    ),
  ]
);

// --- Orders ---

export const orders = pgTable(
  "orders",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id").references(() => customers.id),
    orderNumber: integer("order_number").notNull(),
    items: jsonb().notNull(),
    subtotal: decimal({ precision: 10, scale: 2 }).notNull(),
    tax: decimal({ precision: 10, scale: 2 }).default("0"),
    total: decimal({ precision: 10, scale: 2 }).notNull(),
    status: text().default("pending"),
    paymentMethod: text("payment_method"),
    paymentId: text("payment_id"),
    paymentUrl: text("payment_url"),
    paymentPaidAt: timestamp("payment_paid_at", { withTimezone: true }),
    deliveryType: text("delivery_type").default("pickup"),
    deliveryTime: timestamp("delivery_time", { withTimezone: true }),
    deliveryAddress: text("delivery_address"),
    notes: text(),
    conversationId: uuid("conversation_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_orders_business_status").on(table.businessId, table.status),
    index("idx_orders_business_created").on(table.businessId, table.createdAt),
    index("idx_orders_business_number").on(
      table.businessId,
      table.orderNumber
    ),
  ]
);

// --- Order Sequences ---

export const orderSequences = pgTable("order_sequences", {
  businessId: uuid("business_id")
    .primaryKey()
    .references(() => businesses.id, { onDelete: "cascade" }),
  lastNumber: integer("last_number").default(0),
});

// --- Conversations ---

export const conversations = pgTable(
  "conversations",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id").references(() => customers.id),
    waConversationId: text("wa_conversation_id"),
    status: text().default("active"),
    escalatedReason: text("escalated_reason"),
    startedAt: timestamp("started_at", { withTimezone: true }).defaultNow(),
    lastMessageAt: timestamp("last_message_at", {
      withTimezone: true,
    }).defaultNow(),
  },
  (table) => [
    index("idx_conversations_business_status").on(
      table.businessId,
      table.status
    ),
    index("idx_conversations_customer").on(
      table.customerId,
      table.lastMessageAt
    ),
  ]
);

// --- Messages ---

export const messages = pgTable(
  "messages",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    businessId: uuid("business_id")
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    direction: text().notNull(),
    waMessageId: text("wa_message_id").unique(),
    messageType: text("message_type").notNull(),
    content: text(),
    mediaUrl: text("media_url"),
    mediaMimeType: text("media_mime_type"),
    aiParsed: jsonb("ai_parsed"),
    aiConfidence: decimal("ai_confidence", { precision: 3, scale: 2 }),
    status: text().default("sent"),
    errorMessage: text("error_message"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_messages_conversation").on(
      table.conversationId,
      table.createdAt
    ),
    index("idx_messages_wa_id").on(table.waMessageId),
  ]
);

// --- Users (dashboard users) ---

export const users = pgTable("users", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  businessId: uuid("business_id").references(() => businesses.id, {
    onDelete: "cascade",
  }),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  email: text().notNull(),
  name: text().notNull(),
  role: text().default("staff"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// --- Audit Logs ---

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    businessId: uuid("business_id").references(() => businesses.id, {
      onDelete: "set null",
    }),
    userId: uuid("user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    action: text().notNull(),
    entityType: text("entity_type"),
    entityId: uuid("entity_id"),
    metadata: jsonb().default({}),
    ipAddress: text("ip_address"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_audit_business").on(table.businessId, table.createdAt),
  ]
);

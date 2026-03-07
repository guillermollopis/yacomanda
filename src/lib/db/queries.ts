import { eq, and, desc, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  businesses,
  customers,
  conversations,
  messages,
  catalogItems,
  orders,
  orderSequences,
} from "@/lib/db/schema";

// --- Business ---

export async function findBusinessByWaPhoneId(phoneId: string) {
  const rows = await db
    .select()
    .from(businesses)
    .where(eq(businesses.waPhoneId, phoneId))
    .limit(1);
  return rows[0] ?? null;
}

// --- Customer ---

export async function findOrCreateCustomer(
  businessId: string,
  phone: string,
  profileName?: string
) {
  const existing = await db
    .select()
    .from(customers)
    .where(
      and(eq(customers.businessId, businessId), eq(customers.phone, phone))
    )
    .limit(1);

  if (existing[0]) {
    if (profileName && existing[0].waProfileName !== profileName) {
      const [updated] = await db
        .update(customers)
        .set({ waProfileName: profileName, updatedAt: new Date() })
        .where(eq(customers.id, existing[0].id))
        .returning();
      return updated;
    }
    return existing[0];
  }

  const [customer] = await db
    .insert(customers)
    .values({
      businessId,
      phone,
      waProfileName: profileName,
      name: profileName,
    })
    .returning();

  return customer;
}

// --- Conversation ---

export async function findOrCreateConversation(
  businessId: string,
  customerId: string
) {
  const existing = await db
    .select()
    .from(conversations)
    .where(
      and(
        eq(conversations.businessId, businessId),
        eq(conversations.customerId, customerId)
      )
    )
    .orderBy(desc(conversations.lastMessageAt))
    .limit(1);

  if (existing[0]) {
    const updates: Record<string, unknown> = { lastMessageAt: new Date() };
    // Reopen closed conversations when a new message arrives
    if (existing[0].status === "closed") {
      updates.status = "active";
    }
    const [updated] = await db
      .update(conversations)
      .set(updates)
      .where(eq(conversations.id, existing[0].id))
      .returning();
    return updated;
  }

  const [conversation] = await db
    .insert(conversations)
    .values({ businessId, customerId })
    .returning();

  return conversation;
}

// --- Message ---

export async function saveMessage(data: {
  conversationId: string;
  businessId: string;
  direction: "inbound" | "outbound";
  waMessageId?: string;
  messageType: string;
  content?: string;
  mediaUrl?: string;
  mediaMimeType?: string;
  aiParsed?: unknown;
  aiConfidence?: string;
  status?: string;
}) {
  const [message] = await db.insert(messages).values(data).returning();
  return message;
}

export async function updateMessageStatus(
  waMessageId: string,
  status: string
) {
  await db
    .update(messages)
    .set({ status })
    .where(eq(messages.waMessageId, waMessageId));
}

// --- Conversation history ---

export async function getConversationHistory(
  conversationId: string,
  limit = 10
) {
  const rows = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(desc(messages.createdAt))
    .limit(limit);
  return rows.reverse(); // chronological order
}

// --- Catalog ---

export async function getCatalogItems(
  businessId: string,
  availableOnly = true
) {
  if (availableOnly) {
    return db
      .select()
      .from(catalogItems)
      .where(
        and(
          eq(catalogItems.businessId, businessId),
          eq(catalogItems.available, true)
        )
      )
      .orderBy(catalogItems.sortOrder);
  }
  return db
    .select()
    .from(catalogItems)
    .where(eq(catalogItems.businessId, businessId))
    .orderBy(catalogItems.sortOrder);
}

// --- Order Sequences ---

export async function getNextOrderNumber(businessId: string): Promise<number> {
  const [row] = await db
    .insert(orderSequences)
    .values({ businessId, lastNumber: 1 })
    .onConflictDoUpdate({
      target: orderSequences.businessId,
      set: { lastNumber: sql`${orderSequences.lastNumber} + 1` },
    })
    .returning({ lastNumber: orderSequences.lastNumber });
  return row.lastNumber!;
}

// --- Orders ---

export async function createOrder(data: {
  businessId: string;
  customerId: string;
  orderNumber: number;
  items: unknown;
  subtotal: string;
  tax: string;
  total: string;
  status?: string;
  deliveryType?: string;
  deliveryAddress?: string;
  notes?: string;
  conversationId?: string;
}) {
  const [order] = await db.insert(orders).values(data).returning();
  return order;
}

export async function updateOrderStatusById(orderId: string, status: string) {
  const [updated] = await db
    .update(orders)
    .set({ status, updatedAt: new Date() })
    .where(eq(orders.id, orderId))
    .returning();
  return updated;
}

export async function getOrderById(orderId: string) {
  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);
  return rows[0] ?? null;
}

export async function incrementCustomerStats(
  customerId: string,
  orderTotal: string
) {
  await db
    .update(customers)
    .set({
      totalOrders: sql`${customers.totalOrders} + 1`,
      totalSpent: sql`${customers.totalSpent}::numeric + ${orderTotal}::numeric`,
      lastOrderAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(customers.id, customerId));
}

export async function incrementBusinessOrderCount(businessId: string) {
  await db
    .update(businesses)
    .set({
      monthlyOrderCount: sql`${businesses.monthlyOrderCount} + 1`,
      updatedAt: new Date(),
    })
    .where(eq(businesses.id, businessId));
}

export async function getCustomerLastOrder(customerId: string) {
  const rows = await db
    .select({
      id: orders.id,
      items: orders.items,
      total: orders.total,
      deliveryType: orders.deliveryType,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .where(eq(orders.customerId, customerId))
    .orderBy(desc(orders.createdAt))
    .limit(1);
  return rows[0] ?? null;
}

// --- Order with customer phone (for owner notifications) ---

export async function getOrderWithCustomerPhone(orderId: string) {
  const rows = await db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      items: orders.items,
      subtotal: orders.subtotal,
      tax: orders.tax,
      total: orders.total,
      status: orders.status,
      deliveryType: orders.deliveryType,
      businessId: orders.businessId,
      customerId: orders.customerId,
      paymentUrl: orders.paymentUrl,
      paymentPaidAt: orders.paymentPaidAt,
      customerPhone: customers.phone,
    })
    .from(orders)
    .innerJoin(customers, eq(orders.customerId, customers.id))
    .where(eq(orders.id, orderId))
    .limit(1);
  return rows[0] ?? null;
}

// --- Business lookup by ID ---

export async function getBusinessById(businessId: string) {
  const rows = await db
    .select()
    .from(businesses)
    .where(eq(businesses.id, businessId))
    .limit(1);
  return rows[0] ?? null;
}

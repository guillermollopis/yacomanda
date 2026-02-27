import { eq, and, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  businesses,
  customers,
  conversations,
  messages,
  catalogItems,
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
    const [updated] = await db
      .update(conversations)
      .set({ lastMessageAt: new Date() })
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

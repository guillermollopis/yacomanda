CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"business_id" uuid,
	"user_id" uuid,
	"action" text NOT NULL,
	"entity_type" text,
	"entity_id" uuid,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"ip_address" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "businesses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"type" text DEFAULT 'restaurant' NOT NULL,
	"phone" text NOT NULL,
	"email" text,
	"address" text,
	"city" text,
	"postal_code" text,
	"wa_phone_id" text,
	"wa_business_id" text,
	"wa_access_token" text,
	"wa_webhook_verify_token" text,
	"stripe_account_id" text,
	"stripe_subscription_id" text,
	"stripe_customer_id" text,
	"redsys_merchant_code" text,
	"timezone" text DEFAULT 'Europe/Madrid',
	"currency" text DEFAULT 'EUR',
	"locale" text DEFAULT 'es-ES',
	"plan" text DEFAULT 'esencial',
	"monthly_order_limit" integer DEFAULT 500,
	"monthly_order_count" integer DEFAULT 0,
	"setup_fee_paid" boolean DEFAULT false,
	"subscription_status" text DEFAULT 'trial',
	"trial_ends_at" timestamp with time zone,
	"bot_active" boolean DEFAULT false,
	"bot_tone" text DEFAULT 'informal',
	"welcome_message" text,
	"kitchen_schedule" jsonb DEFAULT '{}'::jsonb,
	"min_preparation_minutes" integer DEFAULT 30,
	"delivery_enabled" boolean DEFAULT false,
	"pickup_enabled" boolean DEFAULT true,
	"onboarding_completed" boolean DEFAULT false,
	"logo_url" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "businesses_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "catalog_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"business_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"category" text,
	"variants" jsonb DEFAULT '[]'::jsonb,
	"allergens" text[],
	"available" boolean DEFAULT true,
	"image_url" text,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"business_id" uuid NOT NULL,
	"customer_id" uuid,
	"wa_conversation_id" text,
	"status" text DEFAULT 'active',
	"escalated_reason" text,
	"started_at" timestamp with time zone DEFAULT now(),
	"last_message_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"business_id" uuid NOT NULL,
	"phone" text NOT NULL,
	"name" text,
	"wa_profile_name" text,
	"notes" text,
	"total_orders" integer DEFAULT 0,
	"total_spent" numeric(10, 2) DEFAULT '0',
	"last_order_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"conversation_id" uuid NOT NULL,
	"business_id" uuid NOT NULL,
	"direction" text NOT NULL,
	"wa_message_id" text,
	"message_type" text NOT NULL,
	"content" text,
	"media_url" text,
	"media_mime_type" text,
	"ai_parsed" jsonb,
	"ai_confidence" numeric(3, 2),
	"status" text DEFAULT 'sent',
	"error_message" text,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "messages_wa_message_id_unique" UNIQUE("wa_message_id")
);
--> statement-breakpoint
CREATE TABLE "order_sequences" (
	"business_id" uuid PRIMARY KEY NOT NULL,
	"last_number" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"business_id" uuid NOT NULL,
	"customer_id" uuid,
	"order_number" integer NOT NULL,
	"items" jsonb NOT NULL,
	"subtotal" numeric(10, 2) NOT NULL,
	"tax" numeric(10, 2) DEFAULT '0',
	"total" numeric(10, 2) NOT NULL,
	"status" text DEFAULT 'pending',
	"payment_method" text,
	"payment_id" text,
	"payment_url" text,
	"payment_paid_at" timestamp with time zone,
	"delivery_type" text DEFAULT 'pickup',
	"delivery_time" timestamp with time zone,
	"delivery_address" text,
	"notes" text,
	"conversation_id" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"business_id" uuid,
	"clerk_user_id" text NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"role" text DEFAULT 'staff',
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_clerk_user_id_unique" UNIQUE("clerk_user_id")
);
--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "catalog_items" ADD CONSTRAINT "catalog_items_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_sequences" ADD CONSTRAINT "order_sequences_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_audit_business" ON "audit_logs" USING btree ("business_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_businesses_slug" ON "businesses" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "idx_businesses_wa_phone_id" ON "businesses" USING btree ("wa_phone_id");--> statement-breakpoint
CREATE INDEX "idx_catalog_business" ON "catalog_items" USING btree ("business_id","available","sort_order");--> statement-breakpoint
CREATE INDEX "idx_conversations_business_status" ON "conversations" USING btree ("business_id","status");--> statement-breakpoint
CREATE INDEX "idx_conversations_customer" ON "conversations" USING btree ("customer_id","last_message_at");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_customers_business_phone" ON "customers" USING btree ("business_id","phone");--> statement-breakpoint
CREATE INDEX "idx_messages_conversation" ON "messages" USING btree ("conversation_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_messages_wa_id" ON "messages" USING btree ("wa_message_id");--> statement-breakpoint
CREATE INDEX "idx_orders_business_status" ON "orders" USING btree ("business_id","status");--> statement-breakpoint
CREATE INDEX "idx_orders_business_created" ON "orders" USING btree ("business_id","created_at");--> statement-breakpoint
CREATE INDEX "idx_orders_business_number" ON "orders" USING btree ("business_id","order_number");
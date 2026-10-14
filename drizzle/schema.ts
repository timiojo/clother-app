// Drizzle schema — Dej. by Ayodeji (local Postgres)
// Core auth tables match Better Auth's drizzle adapter expectations
// (user, session, account, verification) + app tables from PRD Sec 10.
import {
  pgTable, text, varchar, timestamp, boolean, integer,
  pgEnum, jsonb, uuid,
} from "drizzle-orm/pg-core";

// ---------- Better Auth core ----------
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  name: text("name"),
  image: text("image"),
  // CLOTHER role model: two groups, Designer/Support admin types
  group: varchar("group", { length: 16 }).default("customer").notNull(), // customer | admin
  adminType: varchar("admin_type", { length: 16 }), // designer | support | null
  market: varchar("market", { length: 8 }), // UK | NG
  consentVersion: varchar("consent_version", { length: 16 }),
  consentAt: timestamp("consent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---------- Studio (singleton row, id = 'dej') ----------
export const businessProfile = pgTable("business_profile", {
  id: varchar("id", { length: 16 }).primaryKey(), // 'dej'
  tagline: text("tagline"),
  location: text("location"),
  specialisms: jsonb("specialisms").$type<string[]>(),
  servicesOffered: jsonb("services_offered").$type<string[]>(), // formal dresses, suits…
  consultationFormats: jsonb("consultation_formats").$type<string[]>(),
  materialOptions: jsonb("material_options"),
  measurementOptions: jsonb("measurement_options"),
  fulfilmentOptions: jsonb("fulfilment_options"),
  policies: jsonb("policies"), // { cancellation, refund, termsVersion }
  updatedBy: text("updated_by").references(() => user.id),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projectStatus = pgEnum("project_status", [
  "awaiting_confirmation", "in_progress", "awaiting_approval", "completed", "cancelled",
]);

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: text("customer_id").notNull().references(() => user.id),
  brief: jsonb("brief").$type<{
    garmentType: string; occasion: string; style: string;
    budgetMin?: number; budgetMax?: number; deadline?: string; description: string;
  }>().notNull(),
  status: projectStatus("status").default("awaiting_confirmation").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const invitations = pgTable("invitations", {
  token: varchar("token", { length: 64 }).primaryKey(),
  createdBy: text("created_by").references(() => user.id),
  acceptedUserId: text("accepted_user_id").references(() => user.id),
  status: varchar("status", { length: 16 }).default("pending").notNull(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const paymentStatus = pgEnum("payment_status", [
  "pending", "succeeded", "failed", "refunded", "partially_refunded",
]);

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").references(() => projects.id),
  quoteId: uuid("quote_id"),
  provider: varchar("provider", { length: 16 }).default("flutterwave").notNull(),
  providerRef: text("provider_ref"), // Flutterwave tx_ref / transaction_id
  amount: integer("amount").notNull(), // minor units (kobo/pence)
  currency: varchar("currency", { length: 8 }).notNull(), // NGN | GBP
  status: paymentStatus("status").default("pending").notNull(),
  idempotencyKey: varchar("idempotency_key", { length: 64 }).notNull().unique(),
  webhookState: jsonb("webhook_state"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminAudit = pgTable("admin_audit", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorId: text("actor_id").references(() => user.id),
  actorType: varchar("actor_type", { length: 16 }), // designer | support
  action: text("action").notNull(),
  entity: text("entity"),
  entityId: text("entity_id"),
  reason: text("reason"),
  meta: jsonb("meta"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

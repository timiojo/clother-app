// Better Auth + server-side authorisation (replaces RLS — local Postgres has no RLS layer).
// NOTE: verify against the installed better-auth version's docs at npm-install time;
// the shape below follows better-auth v1 (betterAuth + drizzleAdapter + emailAndPassword).
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { sendMail } from "./email/zeptomail";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "Reset your Dej. by Ayodeji password",
        html: `<p>Hi ${user.name ?? "there"},</p><p><a href="${url}">Reset your password</a>. This link expires soon.</p>`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "Verify your email — Dej. by Ayodeji",
        html: `<p>Hi ${user.name ?? "there"},</p><p><a href="${url}">Verify your email</a> to continue.</p>`,
      });
    },
  },
  user: {
    additionalFields: {
      group: { type: "string", defaultValue: "customer" },
      adminType: { type: "string", required: false },
      market: { type: "string", required: false },
    },
  },
});

export type SessionUser = {
  id: string;
  email: string;
  group: "customer" | "admin";
  adminType?: "designer" | "support" | null;
};

// Call at the top of every protected Route Handler / Server Action.
export function requireUser(session: { user?: SessionUser } | null): SessionUser {
  if (!session?.user) throw new Error("UNAUTHENTICATED");
  return session.user;
}

export function requireAdmin(u: SessionUser, kinds: Array<"designer" | "support"> = ["designer", "support"]) {
  if (u.group !== "admin" || !u.adminType || !kinds.includes(u.adminType)) {
    throw new Error("FORBIDDEN: admin required");
  }
  return u;
}

// Project membership: the customer who owns it, or any admin.
export function canAccessProject(u: SessionUser, projectCustomerId: string) {
  return u.group === "admin" || u.id === projectCustomerId;
}

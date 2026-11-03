// lib/notifications.ts — NTF-01 to NTF-03
// Creates in-app notification records and sends email via ZeptoMail when
// user prefs allow it.
import { db } from "@/lib/db";
import { notifications, userNotificationPrefs, user } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { sendMail } from "@/lib/email/zeptomail";

export type NotificationType =
  | "new_message"
  | "quote_sent"
  | "quote_accepted"
  | "payment_received"
  | "booking_confirmed"
  | "project_status_change"
  | "support_case";

export async function createNotification(opts: {
  recipientId: string;
  type: NotificationType;
  title: string;
  body: string;
  link?: string;
}) {
  const [row] = await db.insert(notifications).values(opts).returning();
  return row;
}

export async function getUnreadCount(userId: string): Promise<number> {
  const result = await db
    .select({ count: notifications.id })
    .from(notifications)
    .where(eq(notifications.recipientId, userId))
    .where(eq(notifications.read, false));
  return result.length;
}

export async function getNotifications(userId: string, limit = 20) {
  return await db
    .select()
    .from(notifications)
    .where(eq(notifications.recipientId, userId))
    .orderBy(notifications.createdAt)
    .limit(limit);
}

export async function markRead(notificationId: string, userId: string) {
  await db
    .update(notifications)
    .set({ read: true, readAt: new Date() })
    .where(eq(notifications.id, notificationId))
    .where(eq(notifications.recipientId, userId));
}

export async function markAllRead(userId: string) {
  await db
    .update(notifications)
    .set({ read: true, readAt: new Date() })
    .where(eq(notifications.recipientId, userId))
    .where(eq(notifications.read, false));
}

// Look up a user's notification prefs + contact info in one query.
export async function getUserPrefsAndContact(userId: string) {
  const [row] = await db
    .select({
      email: user.email,
      name: user.name,
      emailNewMessage: userNotificationPrefs.emailNewMessage,
      emailQuote: userNotificationPrefs.emailQuote,
      emailPayment: userNotificationPrefs.emailPayment,
      emailBooking: userNotificationPrefs.emailBooking,
      inAppNewMessage: userNotificationPrefs.inAppNewMessage,
    })
    .from(user)
    .leftJoin(userNotificationPrefs, eq(user.id, userNotificationPrefs.userId))
    .where(eq(user.id, userId));
  return row;
}

const emailEnabledMap: Record<NotificationType, boolean> = {
  new_message: true,
  quote_sent: true,
  quote_accepted: true,
  payment_received: true,
  booking_confirmed: true,
  project_status_change: true,
  support_case: true,
};

export function isEmailEnabled(
  type: NotificationType,
  prefs: Awaited<ReturnType<typeof getUserPrefsAndContact>>
) {
  if (!prefs) return false;
  switch (type) {
    case "new_message": return prefs.emailNewMessage ?? true;
    case "quote_sent": return prefs.emailQuote ?? true;
    case "quote_accepted": return prefs.emailQuote ?? true;
    case "payment_received": return prefs.emailPayment ?? true;
    case "booking_confirmed": return prefs.emailBooking ?? true;
    case "project_status_change": return prefs.emailBooking ?? true;
    case "support_case": return prefs.emailNewMessage ?? true;
  }
  return true;
}

export async function sendNotificationEmail(
  to: string,
  name: string | undefined,
  type: NotificationType,
  title: string,
  body: string,
  link?: string
) {
  await sendMail({
    to,
    subject: `Dej. by Ayodeji — ${title}`,
    html: `
      <div style="font-family:Inter,sans-serif;color:#2B1D21;line-height:1.55">
        <p style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#97878A">Dej. by Ayodeji</p>
        <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#4B1F2E;margin:8px 0">${title}</h1>
        <p style="font-size:14px">${body}</p>
        ${link ? `<p><a href="${link}" style="color:#4B1F2E;font-weight:700">View in Dej. by Ayodeji</a></p>` : ""}
        <p style="font-size:11px;color:#97878A">Bespoke design · Thoughtfully made</p>
      </div>
    `,
  });
}

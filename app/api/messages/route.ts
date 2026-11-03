import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages, projects, user } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import {
  createNotification,
  getUserPrefsAndContact,
  isEmailEnabled,
  sendNotificationEmail,
} from "@/lib/notifications";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  // TODO: verify user is project participant or admin
  const rows = await db
    .select()
    .from(messages)
    .where(eq(messages.projectId, projectId))
    .orderBy(messages.createdAt);
  return NextResponse.json({ messages: rows });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { projectId, senderId, body: messageBody, attachmentUrl } = body;

  // Insert the message
  const [msg] = await db
    .insert(messages)
    .values({ projectId, senderId, body: messageBody, attachmentUrl })
    .returning();

  // Determine recipients: project customer + all admins (except sender)
  const project = await db
    .select({ customerId: projects.customerId })
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1);

  const admins = await db
    .select({ id: user.id, email: user.email, name: user.name })
    .from(user)
    .where(eq(user.group, "admin"));

  const recipientIds = new Set<string>();
  if (project[0]?.customerId) recipientIds.add(project[0].customerId);
  admins.forEach((a) => recipientIds.add(a.id));
  recipientIds.delete(senderId); // don't notify the sender

  // Create notifications + send emails for each recipient
  const sender = await db
    .select({ name: user.name, email: user.email })
    .from(user)
    .where(eq(user.id, senderId))
    .limit(1);
  const senderName = sender[0]?.name ?? sender[0]?.email ?? "Studio";

  for (const recipientId of recipientIds) {
    await createNotification({
      recipientId,
      type: "new_message",
      title: "New message",
      body: `${senderName} sent you a message on your project.`,
      link: `/projects/${projectId}`,
    });

    const prefs = await getUserPrefsAndContact(recipientId);
    if (prefs && isEmailEnabled("new_message", prefs)) {
      await sendNotificationEmail(
        prefs.email!,
        prefs.name,
        "new_message",
        "New message",
        `${senderName} sent you a message on your project.`,
        `${process.env.NEXT_PUBLIC_APP_URL}/projects/${projectId}`
      );
    }
  }

  return NextResponse.json({ ok: true, message: msg });
}

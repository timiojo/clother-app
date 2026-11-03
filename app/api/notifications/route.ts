"use server";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notifications } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers as unknown as Headers,
  });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") ?? "20");

  const rows = await db
    .select()
    .from(notifications)
    .where(eq(notifications.recipientId, session.user.id))
    .orderBy(notifications.createdAt)
    .limit(limit);

  const unread = await db
    .select({ count: notifications.id })
    .from(notifications)
    .where(eq(notifications.recipientId, session.user.id))
    .where(eq(notifications.read, false));

  return NextResponse.json({ notifications: rows, unreadCount: unread.length });
}

export async function PATCH(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers as unknown as Headers,
  });
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { notificationId, markAll } = body;

  if (markAll) {
    await db
      .update(notifications)
      .set({ read: true, readAt: new Date() })
      .where(eq(notifications.recipientId, session.user.id))
      .where(eq(notifications.read, false));
  } else if (notificationId) {
    await db
      .update(notifications)
      .set({ read: true, readAt: new Date() })
      .where(eq(notifications.id, notificationId))
      .where(eq(notifications.recipientId, session.user.id));
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  // TODO: verify user is project participant or admin
  const rows = await db.select().from(messages).where(eq(messages.projectId, projectId));
  return NextResponse.json({ messages: rows });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { projectId, senderId, body: messageBody, attachmentUrl } = body;

  // TODO: verify authorization, insert into messages table
  return NextResponse.json({ ok: true });
}

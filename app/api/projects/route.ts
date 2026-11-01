import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get("customerId");

  // TODO: verify customer owns these projects
  const rows = await db.select().from(projects).where(eq(projects.customerId, customerId));
  return NextResponse.json({ projects: rows });
}

export async function POST(req: Request) {
  const body = await req.json();
  // TODO: validate brief fields, insert into projects table
  return NextResponse.json({ ok: true });
}

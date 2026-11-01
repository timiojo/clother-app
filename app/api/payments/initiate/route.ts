import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { payments, quotes } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { createIntent } from "@/lib/payments/flutterwave";

export async function POST(req: Request) {
  const body = await req.json();
  const { quoteId, amountMinor, currency, customerEmail, customerName } = body;

  // TODO: validate quote exists, customer owns it, quote is accepted, not already paid
  const txRef = `pay-${Date.now()}`;

  const link = await createIntent({
    txRef,
    amountMinor,
    currency,
    customer: { email: customerEmail, name: customerName },
    redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payments/callback`,
    title: "Dej. by Ayodeji",
  });

  // TODO: insert into payments table with status pending, idempotencyKey = txRef

  return NextResponse.json({ paymentLink: link, txRef });
}

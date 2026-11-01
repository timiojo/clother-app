export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Flutterwave webhook endpoint.
// Verifies the webhook hash, then updates payment status in the database.
// TODO: wire to Drizzle DB writes once DATABASE_URL is configured.
export async function POST(req: Request) {
  const headersList = headers();
  const receivedHash = headersList.get("verif-hash");
  const expectedHash = process.env.FLW_WEBHOOK_HASH;

  if (!receivedHash || receivedHash !== expectedHash) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
  }

  const body = await req.json();
  // Expected Flutterwave webhook payload includes: event.type, data.tx_ref, data.status, data.amount, data.currency

  // TODO: 
  // 1. Look up payment by providerRef (tx_ref)
  // 2. Update payments table status based on data.status
  // 3. If refund webhook, update refunds table
  // 4. Return 200 quickly to acknowledge

  return NextResponse.json({ received: true });
}

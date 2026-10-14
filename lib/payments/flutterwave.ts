// Flutterwave adapter — single payments provider for GBP + NGN.
// Docs: developer.flutterwave.com. SANDBOX first: test secret keys only until Phase 0 gate passes.
// Money rule: amounts in MINOR units (kobo/pence). Never auto-convert currencies.
const BASE = process.env.FLW_BASE_URL ?? "https://api.flutterwave.com/v3";
const SECRET = () => {
  const k = process.env.FLW_SECRET_KEY ?? "";
  if (k.includes("FLWSECK_TEST")) console.warn("[fw] using TEST keys — sandbox mode");
  else if (k) console.warn("[fw] LIVE keys detected — real money!");
  return k;
};

async function fw(path: string, init: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${SECRET()}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`FLW ${path} ${res.status}: ${JSON.stringify(data).slice(0, 300)}`);
  return data;
}

export type IntentArgs = {
  txRef: string; // our idempotency key — unique per payment attempt
  amountMinor: number;
  currency: "NGN" | "GBP";
  customer: { email: string; name?: string };
  redirectUrl: string; // e.g. https://<tunnel-url>/payments/callback
  title?: string;
};

// Creates a hosted payment link the customer completes in their browser.
export async function createIntent(a: IntentArgs) {
  const data = await fw("/payments", {
    method: "POST",
    body: JSON.stringify({
      tx_ref: a.txRef,
      amount: a.amountMinor / 100,
      currency: a.currency,
      redirect_url: a.redirectUrl,
      customer: { email: a.customer.email, name: a.customer.name ?? a.customer.email },
      customizations: { title: a.title ?? "Dej. by Ayodeji" },
    }),
  });
  return data.data.link as string;
}

// Server-side truth: verify by transaction id after redirect/webhook.
export async function verifyTransaction(transactionId: string | number) {
  const data = await fw(`/transactions/${transactionId}/verify`);
  return data.data as { status: string; tx_ref: string; amount: number; currency: string; id: number };
}

export async function refund(transactionId: string | number, amountMinor?: number) {
  const body: Record<string, unknown> = { seckey: SECRET() };
  if (amountMinor !== undefined) body.amount = amountMinor / 100; // partial refund
  return fw(`/transactions/${transactionId}/refund`, { method: "POST", body: JSON.stringify(body) });
}

// Webhook guard: Flutterwave signs with the secret hash you set on the dashboard.
export function verifyWebhookSignature(receivedHash: string | null) {
  const expected = process.env.FLW_WEBHOOK_HASH ?? "";
  return !!receivedHash && !!expected && receivedHash === expected;
}

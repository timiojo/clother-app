// Phase 0 spike: proves Flutterwave connectivity + prints test payment links.
// RUN:  FLW_SECRET_KEY=FLWSECK_TEST-... node scripts/fw-spike.mjs
// You complete the links manually in a browser (test card), then record results
// in PHASE0/ROUTE_MATRIX.md. No DB needed.
const BASE = process.env.FLW_BASE_URL ?? "https://api.flutterwave.com/v3";
const SECRET = process.env.FLW_SECRET_KEY ?? "";

if (!SECRET) {
  console.error("Set FLW_SECRET_KEY first (TEST key). See .env.example");
  process.exit(1);
}
if (!SECRET.includes("FLWSECK_TEST")) {
  console.error("REFUSING: only TEST keys allowed for the spike. Aborting.");
  process.exit(1);
}

const stamp = Date.now().toString(36);
for (const [currency, amount] of [["NGN", 100], ["GBP", 100]]) {
  const txRef = `spike-${stamp}-${currency}`;
  const res = await fetch(`${BASE}/payments`, {
    method: "POST",
    headers: { Authorization: `Bearer ${SECRET}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      tx_ref: txRef,
      amount,
      currency,
      redirect_url: "https://example.com/payments/callback",
      customer: { email: "spike-test@example.com", name: "Spike Test" },
      customizations: { title: "Dej. by Ayodeji (spike)" },
    }),
  });
  const data = await res.json().catch(() => ({}));
  console.log(`--- ${currency} ${amount} ---`);
  console.log("http:", res.status, "| txRef:", txRef);
  console.log("link:", data?.data?.link ?? JSON.stringify(data).slice(0, 300));
}
console.log("\nNext: open each link, pay with a Flutterwave test card, then fill PHASE0/ROUTE_MATRIX.md.");

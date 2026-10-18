# clother-app — Dej. by Ayodeji

Bespoke formalwear platform. Next.js 14 + TypeScript, local Postgres + Drizzle,
Better Auth, Cloudflare R2, ZeptoMail, Flutterwave. Self-hosted on your Mac (no Vercel).

## 0 · You need installed (do once)

1. **Node 20 LTS** — https://nodejs.org → `node --version` should print v20.
2. **Postgres.app** (free, ~100MB) — https://postgresapp.com → open it, click Start.
   Then: `createdb clother` (or use its `psql`: `CREATE DATABASE clother;`).
3. Accounts (all have free tiers): **Cloudflare R2**, **ZeptoMail**, **Flutterwave**
   (Flutterwave: stay in SANDBOX/test mode until the Phase 0 gate passes).

## 1 · Run it

```bash
cd clother-app
cp .env.example .env.local   # edit .env.local with your keys (never commit it)
npm install
npm run db:push              # creates tables in local Postgres
npm run dev                  # http://localhost:3000
```

Entry flow (customer sees first):
- `/` — public landing, compelling copy + "Start a request" / "Sign in"
- `/login` — email/password sign in
- `/signup` — email/password sign up → verification email via ZeptoMail → check inbox
- `/dashboard`, `/projects/*` — protected; middleware redirects to `/login` if not signed in

Pages now: `/` (studio home) · `/login` · `/signup` · `/design` (token swatches).

## 2 · Phase 0 validation (before building commerce)

- [ ] `npm run fw:spike` with TEST keys → complete both links → fill `PHASE0/ROUTE_MATRIX.md`
- [ ] Read `PHASE0/POLICIES_DRAFT.md` → get UK/NG legal review → paste final policies into BusinessProfile
- [ ] Beta hosting: `npm run build && npm start` under PM2 + Caddy; expose via `cloudflared tunnel`

## 3 · Beta hosting (later, Phase 4)

```bash
npm run build
pm2 start npm --name clother -- start   # `npm i -g pm2` once
brew install caddy cloudflared          # reverse proxy + public URL without port-forwarding
cloudflared tunnel --url http://localhost:3000
```

Nightly: `pg_dump clother > ~/backups/clother-$(date +%F).sql` (keep on an external drive).

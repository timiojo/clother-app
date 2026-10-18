// app/api/auth/[...all]/route.ts
// Better Auth route handler for Next.js App Router.
// Mounts /api/auth/sign-up-email, /api/auth/sign-in-email, /api/auth/verify-email,
// /api/auth/reset-password, /api/auth/session, etc.
import { auth } from "@/lib/auth";

export const GET = auth.handler;
export const POST = auth.handler;

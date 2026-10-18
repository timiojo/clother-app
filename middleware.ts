import { createAuthMiddleware } from "better-auth/api";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const authMiddleware = createAuthMiddleware(auth);

export default authMiddleware(async (ctx) => {
  // Protect project/admin paths
  const protectedPaths = ["/dashboard", "/projects", "/settings", "/admin"];
  if (protectedPaths.some((p) => ctx.nextUrl.pathname.startsWith(p))) {
    if (!ctx.session) {
      return NextResponse.redirect(new URL("/login?cb=" + ctx.nextUrl.pathname, ctx.nextUrl));
    }
  }
  // Redirect signed-in users away from auth pages
  if ((ctx.nextUrl.pathname === "/login" || ctx.nextUrl.pathname === "/signup") && ctx.session) {
    return NextResponse.redirect(new URL("/dashboard", ctx.nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/settings/:path*", "/admin/:path*", "/login", "/signup"],
};

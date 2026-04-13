import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/orders"];

const authPaths = ["/login", "/register", "/forgot-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken =
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value;

  const isAuthenticated = !!sessionToken;

  if (!isAuthenticated && protectedPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && authPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/orders/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};

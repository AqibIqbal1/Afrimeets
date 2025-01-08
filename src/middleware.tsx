import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;

  const { pathname } = req.nextUrl;

  // If the user is not logged in, restrict access to specific routes
  if (!token) {
    if (pathname === "/login" || pathname === "/signup") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/home",
    "/about-us",
    "/contact-us",
    "/cancellation-policy",
    "/subscription",
    "/terms-and-conditions",
    "/privacy-policy",
  ],
  headers: {
    "Cache-Control": "no-store",
  },
};

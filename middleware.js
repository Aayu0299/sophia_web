// import { NextResponse } from "next/server";

// export function middleware(req) {
//   // Your logic here...
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/:path*"],
// };

// middleware.js

import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Read login cookie
  const isAuthenticated = req.cookies.get("isAuthenticated")?.value === "true";

  /** ---------------------------------------
   *  PUBLIC AUTH PAGES
   *  (these should NOT be accessible when logged-in)
   *  --------------------------------------*/
  const authPages = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];
  const isAuthPage = authPages.some((route) => pathname.startsWith(route));

  /** ---------------------------------------
   *  PROTECTED ROUTES
   *  (anything under dashboard, patient etc.)
   *  --------------------------------------*/
  // No need to list routes
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/patient") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/account");

  /** ---------------------------------------
   *  NOT LOGGED IN → BLOCK PROTECTED PAGES
   *  --------------------------------------*/
  if (!isAuthenticated && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  /** ---------------------------------------
   *  LOGGED IN → BLOCK LOGIN/SIGNUP PAGES
   *  --------------------------------------*/
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // Runs for ALL routes automatically
};

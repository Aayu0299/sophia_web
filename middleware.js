import { NextResponse } from "next/server";

export function middleware(req) {
  // Your logic here...
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};

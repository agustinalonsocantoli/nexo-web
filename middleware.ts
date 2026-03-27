import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin exact → redirect to home
  if (pathname === "/admin" || pathname === "/admin/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // /admin/* routes → skip i18n, let Auth.js handle protection
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Everything else → next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

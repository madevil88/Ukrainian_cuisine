import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PROTECTED_PREFIXES = ["/ingredients", "/recipes"] as const;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  if (token) {
    return NextResponse.next();
  }

  const url = new URL("/error", request.url);
  url.searchParams.set("message", "Insufficient permissions");
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/ingredients", "/recipes", "/recipes/:path*"],
};

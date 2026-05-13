import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  const isProfilRoute = pathname.startsWith("/profil");
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  let user = null;

  if (token) {
    user = await verifyToken(token);
  }

  if (isProfilRoute && !user) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, req.url)
    );
  }

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/profil", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profil/:path*", "/login", "/register"],
};
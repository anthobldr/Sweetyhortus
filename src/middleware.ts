import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (e) {
    console.log("JWT ERROR:", e);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  console.log("PATH:", pathname);
  console.log("TOKEN:", token);
  console.log("SECRET DEFINED:", !!process.env.JWT_SECRET);

  const profilRoute = pathname.startsWith("/profil");
  const authRoute = pathname === "/login" || pathname === "/register";

  if (profilRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (authRoute && token) {
    const payload = await verifyToken(token);
    if (payload) {
      return NextResponse.redirect(new URL("/profil", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profil/:path*", "/login", "/register"],
};
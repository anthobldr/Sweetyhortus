import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { origin } = new URL(req.url);
  
  const res = NextResponse.redirect(`${origin}/login`);
  
  res.cookies.delete("token");
  
  return res;
}
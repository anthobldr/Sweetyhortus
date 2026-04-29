import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { db } from "@/db/db"
import { eq } from "drizzle-orm"; 
import { users } from "@/db/schema"

export async function GET() {
    const cookie = await cookies();
  
    const token = cookie.get("token")?.value;
    if (!token) return NextResponse.json(null);

    const user = await verifyToken(token);
    if (!user) return NextResponse.json(null)

    const [userProfil] = await db.select().from(users).where(eq(users.id, user.userId))
    if(!userProfil) return NextResponse.json(null)
        
    return NextResponse.json(userProfil)
}
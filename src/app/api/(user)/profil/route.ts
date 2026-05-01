import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { users_account } from "@/db/schema";
export async function POST(req: Request){
    const cookie = await cookies();
      
    const token = cookie.get("token")?.value;
    if (!token) return NextResponse.json(null);

    const user = await verifyToken(token);
    if (!user) return NextResponse.json(null)

    const {surname, name, phone, adress, postcode, city} = await req.json();
    const editProfil = await db.update(users_account).set({surname: surname, name: name, phone: phone, adress: adress, postcode: postcode, city: city}).where(eq(users_account.users_id, user.userId));
    
    return NextResponse.json({success: "Les modifications ont bien été effectuées.", editProfil})
}
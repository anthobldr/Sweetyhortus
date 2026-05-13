import { checkUser } from "@/lib/checkUser";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import * as argon2 from "argon2";
import { NextResponse } from "next/server";


export async function POST(req: Request){
    const {oldPassword, newPassword, confirmPassword} = await req.json()
    const user = await checkUser();
    if (!user) {
    return ;
    }
    const getPassword = await db.select({ password: users.password }).from(users).where(eq(users.id, user.userId as number)).limit(1);
    const currentPassword = await argon2.verify(getPassword[0].password, oldPassword)
    if(!currentPassword){
        return NextResponse.json({error: "Le mot de passe saisie ne correspond pas avec le mot de passe actuel."})
    } else {
        if(newPassword === confirmPassword){
            if(oldPassword === confirmPassword){
                return NextResponse.json({error: "Le nouveau mot de passe ne peut pas êtres votre mot de passe actuel."})
            } else {
                const newPassword = await argon2.hash(confirmPassword)
                await db.update(users).set({password: String(newPassword)}).where(eq(users.id, Number(user.userId)))
                return NextResponse.json({success: "Vous avez modifier votre mot de passe."})
            }
        } else {
            return NextResponse.json({error: "Les deux mots de passe saisie ne corresponde pas."})
        }
    }
}
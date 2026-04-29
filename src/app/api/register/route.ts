import { db } from "@/db/db";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";
import * as argon2 from 'argon2';
import { eq } from "drizzle-orm";
import { z } from "zod"

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(req: Request){
    const body = await req.json();
    const { email, password } = registerSchema.parse(body)

    const existing = await db.query.users.findFirst({where: eq(users.email, email)})
    if(existing){
        return NextResponse.json({error: "L'utilisateur existe déjà."}, {status: 400})
    }
    const hashPassword = await argon2.hash(password);
    const user = await db.insert(users).values({email, password: hashPassword});

    return NextResponse.json({success: true, user})
}
import { db } from "@/db/db";
import { users, users_account } from "@/db/schema";
import { NextResponse } from "next/server";
import * as argon2 from 'argon2';
import { eq } from "drizzle-orm";
import { z } from "zod"

const registerSchema = z.object({
    surname: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(req: Request){
    const body = await req.json();
    const { surname, name, email, password } = registerSchema.parse(body)

    const existing = await db.query.users.findFirst({where: eq(users.email, email)})
    if(existing){
        return NextResponse.json({error: "L'utilisateur existe déjà."}, {status: 400})
    }
    const hashPassword = await argon2.hash(password);
    // Création d'un utilisateur
    //const user = await db.insert(users).values({email, password: hashPassword}).returning({id: users.id});
    //const userId = user[0].id;
    // Création d'un profil à l'utilisateur
    //const userProfil = await db.insert(users_account).values({userId, name, surname});
    await db.transaction(async (transaction) => {
    const [{ id: userId }] = await transaction
        .insert(users)
        .values({ email, password: hashPassword })
        .returning({ id: users.id });

        await transaction.insert(users_account).values({
            users_id: userId,
            surname: surname,
            name: name,
        });
    });
    return NextResponse.json({success: true, users})
}
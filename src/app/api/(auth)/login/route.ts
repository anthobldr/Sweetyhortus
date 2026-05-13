import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as argon2 from "argon2";
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const user = await db.query.users.findFirst({where: eq(users.email, email)});
    if (!user) {
        return NextResponse.json({error: "L'utilisateur n'existe pas."}, {status: 400});
    }

    const checkPassword = await argon2.verify(user.password, password);

    if (!checkPassword) {
        return NextResponse.json({error: "Le mot de passe est incorrect."}, {status: 400});
    }

    const token = await generateToken(user.id);
    const res = NextResponse.json({success: true});

    res.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

  return res;
}
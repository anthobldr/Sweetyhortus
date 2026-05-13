import { checkUser } from "@/lib/checkUser";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { users, users_account } from "@/db/schema";
import * as argon2 from "argon2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await checkUser();
    if (!user) {
      return NextResponse.json({error: "Non authentifié"}, {status: 401});
    }

    const { deleteAccountPassword } = await req.json();
    
    const dbPassword = await db.select({password: users.password})
      .from(users)
      .where(eq(users.id, user.userId as number))
      .limit(1)
    
    if(!dbPassword || !dbPassword[0]){
      return NextResponse.json({error: "Une erreur est survenue."}, {status: 500})
    }

    const checkPassword = await argon2.verify(dbPassword[0].password, deleteAccountPassword);
    if(!checkPassword){
      return NextResponse.json({error: "Le mot de passe est incorrect."}, {status: 401})
    }


    const deleteProfilUser = await db.delete(users_account).where(eq(users_account.users_id, user.userId as number));
    if(!deleteProfilUser){
      return NextResponse.json({error: "Une erreur est survenue lors de la suppression du profil."}, {status: 500})
    }

    const deleteUser = await db.delete(users).where(eq(users.id, user.userId as number))
    if (!deleteUser) {
      return NextResponse.json({error: "Une erreur est survenue lors de la suppression de votre compte."}, {status: 500})
    }

    return NextResponse.json({success: "Vous avez supprimé votre compte. En espérant vous revoir bientôt !"})
  } catch (error) {
    console.error("Erreur détaillée:", error);
    return NextResponse.json({error: "Erreur serveur"}, {status: 500})
  }
}
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema"

export default async function Profil() {
  const cookie = await cookies();

  const token = cookie.get("token")?.value;
  if (!token) {
    return <h1>Non connecté</h1>;
  }

  const user = await verifyToken(token);
  if (!user) {
    return <h1>Token invalide</h1>;
  }

  const userProfil = await db.select().from(users).where(eq(users.id, user.userId))

  console.log(userProfil)
  return(
    <>
      <h1>Bienvenue {userProfil[0].email}</h1>
      <a href="/api/logout">Se déconnecter</a>
    </>
  );
}
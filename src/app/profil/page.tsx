import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export default async function Dashboard() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return <h1>Non connecté</h1>;
  }

  const user = await verifyToken(token);

  if (!user) {
    return <h1>Token invalide</h1>;
  }

  return(
    <>
      <h1>Bienvenue user {user.userId}</h1>
      <a href="/api/logout">Se déconnecter</a>
    </>
  );
}
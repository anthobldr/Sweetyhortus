import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { users, users_account } from "@/db/schema";
import Sidebar from "../layouts/Asidebar";
import Navbar from "../layouts/Navbar";
import ProfilClient from "./ProfilClient";

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
  const [getUser] = await db.select().from(users).where(eq(users.id, user.userId));
  const [userProfil] = await db.select().from(users_account).where(eq(users_account.users_id, user.userId));
  return(
    <>
    <Navbar />
    <div className="container-fluid">
      <div className="row">
          <div className="col-3 p-0">
            <Sidebar />
          </div>
          <div className="col-9 py-5">
            <ProfilClient user={getUser} profil={userProfil}/>
          </div>
        </div>
    </div>
    </>
  );
}
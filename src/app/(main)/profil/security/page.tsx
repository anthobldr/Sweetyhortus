import { checkUser } from "@/lib/checkUser"
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import Sidebar from "@/app/layouts/Asidebar";
import Navbar from "@/app/layouts/Navbar";
import SecurityClient from "./SecurityClient";
export default async function Security(){
    
    const user = await checkUser();
    if (!user) {
    return <h1>Token invalide</h1>;
    }
    const [getUser] = await db.select().from(users).where(eq(users.id, user.userId as number))
    return (
        <div>
           <div className="container-fluid overflow-hidden">
                <div className="row h-100">
                    <div className="col-2 p-0">
                        <Sidebar />
                    </div>
                    <div className="col-10 py-5 px-5">
                        <SecurityClient user={getUser} />
                    </div>Ï
                </div>
            </div>
        </div>
    )
}
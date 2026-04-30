"user client"
import { users } from "@/db/schema";
type User = typeof users.$inferSelect;
type Props = {
    user: User;
}
export default function ProfilClient({ user }: Props){
    return (
        <>
            <h5>Profil</h5>
            <p>Ces informations peuvent êtres affichées publiquement, alors faites attention à ce que vous partagez.</p>
            <hr/>
            <div className="py-2">
                <div className="row g-3">
                    <div className="col-4">
                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInputGrid" placeholder="name@example.com" value="mdo@example.com" />
                            <label htmlFor="floatingInputGrid">Nom</label>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInputGrid" placeholder="name@example.com" value="mdo@example.com" />
                            <label htmlFor="floatingInputGrid">Prénom</label>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
        </>
    )
}
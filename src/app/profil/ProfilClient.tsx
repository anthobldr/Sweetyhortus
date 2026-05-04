"use client"
import { users, users_account } from "@/db/schema";
import { useState } from "react";
import Success from "../components/SuccessAlert";

type User = typeof users.$inferSelect;
type Profil = typeof users_account.$inferSelect;

type Props = {
    user: User;
    profil: Profil;
}
export default function ProfilClient({ user, profil }: Props){
    const [surname, setSurname] = useState(profil.surname);
    const [name, setName] = useState(profil.name);
    const [phone, setPhone] = useState(profil.phone);
    const [adress, setAdress] = useState(profil.adress);
    const [postcode, setPostCode] = useState(profil.postcode)
    const [city, setCity] = useState(profil.city);
    const [editStatus, setStatus] = useState("");

    async function editProfil(){
        const res = await fetch("/api/profil", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({surname, name, phone, adress, postcode, city}),
        });
        if(res.ok){
            const status = await res.json()
            setStatus(status.success)
        }
    }
    return (
        <>
            {editStatus && (<Success message={editStatus} />)}
            <h5>Profil</h5>
            <p>Ces informations peuvent êtres affichées publiquement, alors faites attention à ce que vous partagez.</p>
            <hr/>
            <div className="py-2">
                <div className="row g-3 mb-3">
                    <div className="col-4">
                        <div className="form-floating">
                            <input type="text" className="form-control" onChange={(e) => setSurname(e.target.value)} id="surnameProfil" placeholder="name@example.com" defaultValue={profil.surname} />
                            <label htmlFor="surnameProfil">Nom</label>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-floating">
                            <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} id="nameProfil" placeholder="name@example.com" defaultValue={profil.name} />
                            <label htmlFor="nameProfil">Prénom</label>
                        </div>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-4">
                        <div className="form-floating">
                            <input type="email" className="form-control" id="emailProfil" placeholder="Email" value={user.email} disabled />
                            <label htmlFor="emailProfil">E-mail</label>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-floating">
                            <input type="tel" className="form-control" onChange={(e) => setPhone(e.target.value)} id="phoneProfil" placeholder="Téléphone" defaultValue={profil.phone?? ""} />
                            <label htmlFor="phoneProfil">Téléphone</label>
                        </div>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-3">
                        <div className="form-floating">
                            <input type="text" className="form-control" onChange={(e) => setAdress(e.target.value)} id="adressProfil" placeholder="name@example.com" defaultValue={profil.adress?? ""} />
                            <label htmlFor="adressProfil">Adresse</label>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-floating">
                            <input type="text" className="form-control" onChange={(e) => setPostCode(e.target.value)} id="postalProfil" placeholder="name@example.com" defaultValue={profil.postcode?? ""} />
                            <label htmlFor="postalProfil">Code Postal</label>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-floating">
                            <input type="text" className="form-control" onChange={(e) => setCity(e.target.value)} id="cityProfil" placeholder="name@example.com" defaultValue={profil.city?? ""} />
                            <label htmlFor="cityProfil">Ville</label>
                        </div>
                    </div>
                </div>
                <div className="form-floating">
                    <button className="btn my-3" onClick={editProfil} name="edit" type="submit">Modifier</button>
                </div>
            </div>
        </>
    )
}
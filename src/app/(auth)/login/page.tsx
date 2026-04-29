"use client";
import { useRouter } from "next/navigation";
import { useState } from "react"
export default function Login(){
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(){
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password}),
        });
        if(res.ok){
            router.push("/profil");
        }
    }

    return(
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="row border rounded shadow bg-white">
                <div className="col-6 col-md-6 py-5 px-md-5">
                    <h2 className="py-md-3">Connexion</h2>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} name="identifiant" id="Identifiant" placeholder="Identifiant" />
                        <label htmlFor="Identifiant">Identifant</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}name="password" id="Password" placeholder="Password" />
                        <label htmlFor="Password">Mot de passe</label>
                    </div>
                    <div className="form-floating">
                        <button className="btn my-3" onClick={handleLogin} name="connexion" type="submit">Connexion</button>
                    </div>
                </div>
                <div className="col-12 col-md-6 p-0">
                    <img className="img-fluid w-100 h-100 object-fit-cover" src="/propos.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}
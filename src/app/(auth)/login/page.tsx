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
        <div>
            <h1>Login</h1>
            <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}
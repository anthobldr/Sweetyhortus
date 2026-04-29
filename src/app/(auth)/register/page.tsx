"use client";

import { useState } from "react"
export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister(){
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password}),
        });
        if(res.ok){

        }
    }

    return(
        <div>
            <h1>Register</h1>
            <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}
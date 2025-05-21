"use client";
import {LoginContainer, LoginFormValues} from "@/components/LoginContainer";
import {redirect} from "next/navigation";
import {httpClient} from "@/lib/httpclient";
import {useState} from "react";


export default function Login() {
    const [loading, setLoading] = useState(false);
    async function handleLogin(values: LoginFormValues) {
        setLoading(true)
        const response = await httpClient("auth/login", { // Usa tu URL real aquí
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: values.email, // Asegúrate que el backend espera "email" (no "username")
                password: values.password,
            }),
        })

        if (!response.ok) {
            console.error("Credenciales incorrectas" + await response.json());
        } else {
            const data = await response.json();
            const token = data.token;

            localStorage.setItem("token", token); // ✅ Guarda el JWT
            setLoading(false)
            // Redirige a página protegida
            redirect("/reports");
        }
    }

    return (
        <LoginContainer handleLogin={handleLogin} loading={loading}/>
    );
}

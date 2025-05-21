"use client";
import {LoginContainer, LoginFormValues} from "@/components/LoginContainer";
import {redirect} from "next/navigation";
import {httpClient} from "@/lib/httpclient";
import {useState} from "react";
import {useError} from "@/error/context";


export default function Login() {
    const [loading, setLoading] = useState(false);
    const {setError} = useError();
    async function handleLogin(values: LoginFormValues) {
        setLoading(true)
        try {
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
                throw new Error('Error: ' + await response.json());
            } else {
                const data = await response.json();
                const token = data.token;

                localStorage.setItem("token", token); // ✅ Guarda el JWT
                setLoading(false)
                // Redirige a página protegida
                redirect("/reports");
            }
        } catch (e) {
            setError({title: "badCredentials.title", description: "badCredentials.description"})
            setLoading(false)
            throw e;
        }
    }

    return (
        <LoginContainer handleLogin={handleLogin} loading={loading}/>
    );
}

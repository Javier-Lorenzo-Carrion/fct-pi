"use client";
import {useForm} from "@mantine/form";
import {LoginContainer, LoginFormValues} from "@/components/LoginContainer";
import {redirect} from "next/navigation";


export default function Login() {
    const form = useForm<LoginFormValues>({
        mode: "uncontrolled",
        initialValues: {
            username: "",
            password: "",
        },
        validate: {
            password: (value) => (!!value.length ? null : "Password is required"),
            username: (value) => (!!value.length ? null : "Username is required"),
        },
    });

    async function handleLogin(values: LoginFormValues) {
        const response = await fetch("http://localhost:8080/auth/login", { // Usa tu URL real aquí
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: values.username, // Asegúrate que el backend espera "email" (no "username")
                password: values.password,
            }),
        })

        if (!response.ok) {
            console.error("Credenciales incorrectas" + await response.json());
        } else {
            const data = await response.json();
            const token = data.token;

            localStorage.setItem("token", token); // ✅ Guarda el JWT

            // Redirige a página protegida
            redirect("/reports");
        }
    }

    return (
        <LoginContainer key={form.key("password")} form={form} handleLogin={handleLogin}/>
    );
}

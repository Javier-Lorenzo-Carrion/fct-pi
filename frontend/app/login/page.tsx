"use client";
import {LoginContainer, LoginFormValues} from "@/components/LoginContainer";
import { useRouter } from "next/navigation";
import {httpClient} from "@/lib/httpclient";
import {useState} from "react";
import {useError} from "@/error/context";
import {useTranslations} from "next-intl";


export default function Login() {

    const [loading, setLoading] = useState(false);
    const { setError } = useError();
    const router = useRouter();
    const t = useTranslations("badCredentials");

    return (<LoginContainer handleLogin={handleLogin} loading={loading}/>);

    async function handleLogin(values: LoginFormValues) {
        setLoading(true)
        try {
            const response = await httpClient("auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            })
            if (!response.ok) {
                const errorData = await response.json();
                setError({
                    title: t("title"),
                    description: t("description"),
                });
                setLoading(false);
                return;
            } else {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem("token", token);
                setLoading(false)
                router.push("/");
            }
        } catch (e) {
            setError({
                title: t("unexpected.title"),
                description: t("unexpected.description"),
            });
            setLoading(false)
        }
    }
}

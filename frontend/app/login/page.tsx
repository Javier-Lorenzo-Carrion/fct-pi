"use client";
import {useForm} from "@mantine/form";
import {LoginContainer, LoginFormValues} from "@/components/LoginContainer";


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

    function handleLogin(values: LoginFormValues) {
        console.log(values.username);
        console.log(values.password);
        console.log("Inicio de sesión");
    }

    return (
        <LoginContainer key={form.key("password")} form={form} handleLogin={handleLogin}/>
    );
}

"use client";
import {Button, Card, Center, Container, Divider, Flex, Group, Text, TextInput, Title} from "@mantine/core";
import {Form, useForm} from "@mantine/form";
import {Key, User} from "react-feather";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/NavBarAnonymousUser";

interface LoginFormValues {
    username: string
    password: string
}


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
        <div className="min-h-screen w-full bg-black flex items-center justify-center">
            <Navbar/>
            <div className="flex flex-row items-center justify-center gap-12">
                <div className="text-white w-60">
                    <Title size="lg" c="white" className="mb-4 text-center">
                        Inicio de sesión
                    </Title>
                    <br/>
                    <Link href="/signup" className="text-blue-400 hover:underline text-sm">
                        No tengo cuenta, quiero registrarme
                    </Link>
                    <form onSubmit={form.onSubmit(handleLogin)} className="mt-8 w-full">
                        <Flex className="w-full" gap="xl" direction="column" wrap="wrap">
                            <TextInput
                                className="w-60"
                                label={<Group><User size="20" />Usuario</Group>}
                                placeholder="john"
                                key={form.key("username")}
                                {...form.getInputProps("username")}
                            />
                            <TextInput
                                className="w-60"
                                type="password"
                                label={<Group><Key size="20" />Contraseña</Group>}
                                placeholder="*******"
                                key={form.key("password")}
                                {...form.getInputProps("password")}
                            />
                            <Link href="#" className="text-blue-400 hover:underline text-sm">
                                He olvidado mi contraseña
                            </Link>
                            <Divider />
                            <Button className="w-full" variant="filled" color="blue" radius="md" type="submit">
                                Iniciar sesión
                            </Button>
                        </Flex>
                    </form>
                </div>
                <div className="flex-shrink-0">
                    <Image
                        src="/images/mainImage.jpg"
                        alt="Imagen central"
                        width={750}
                        height={500}
                        style={{ objectFit: "contain" }}
                        priority
                    />
                </div>
            </div>
        </div>
    );
}

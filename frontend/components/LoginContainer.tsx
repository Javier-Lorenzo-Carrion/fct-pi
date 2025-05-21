"use client";

import {UseFormReturnType} from "@mantine/form";
import NavbarAnonymousUser from "@/components/NavBarAnonymousUser";
import {Button, Divider, Flex, Group, TextInput, Title} from "@mantine/core";
import Link from "next/link";
import {Key, Mail, User} from "react-feather";
import Image from "next/image";

export interface LoginFormValues {
    email: string
    password: string
}

export function LoginContainer(props: {
    form: UseFormReturnType<LoginFormValues, (values: LoginFormValues) => LoginFormValues>,
    handleLogin: (values: LoginFormValues) => void
}) {
    return <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <NavbarAnonymousUser/>
        <div className="flex flex-row items-center justify-center gap-12">
            <div className="text-white w-60">
                <Title size="30" c="white" className="mb-4 text-center">
                    Inicio de sesión
                </Title>
                <br/>
                <Link href="/signup" className="text-blue-400 hover:underline text-sm">
                    No tengo cuenta, quiero registrarme
                </Link>
                <form onSubmit={props.form.onSubmit(props.handleLogin)} className="mt-8 w-full">
                    <Flex className="w-full" gap="xl" direction="column" wrap="wrap">
                        <TextInput
                            className="w-60"
                            label={<Group><Mail size="20"/>Email</Group>}
                            placeholder="example@gmail.com"

                            {...props.form.getInputProps("email")}
                        />
                        <TextInput
                            className="w-60"
                            type="password"
                            label={<Group><Key size="20"/>Contraseña</Group>}
                            placeholder="*******"

                            {...props.form.getInputProps("password")}
                        />
                        <Divider/>
                        <Button className="w-full" variant="filled" color="blue" radius="md" type="submit">
                            Iniciar sesión
                        </Button>
                    </Flex>
                </form>
            </div>
            <div className="flex-shrink-0">
                <Image
                    src="/images/laptop.jpg"
                    alt="Imagen central"
                    width={750}
                    height={500}
                    style={{objectFit: "contain"}}
                    priority
                />
            </div>
        </div>
    </div>;
}
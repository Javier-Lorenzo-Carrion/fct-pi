"use client";
import {Button, Center, Divider, Flex, Group, TextInput, Title} from "@mantine/core";
import {Calendar, Key, Mail, User, UserCheck, Voicemail} from "react-feather";
import {useForm} from "@mantine/form";
import Link from "next/link";
import Image from "next/image";
import NavbarAnonymousUser from "@/components/NavBarAnonymousUser";

interface SignupFormValues {
    name: string
    lastName: string
    birthDate: string
    email: string
    username: string
    password: string

}

export default function Signup() {
    function handleSignup(values: SignupFormValues){
        console.log(values.name);
        console.log(values.lastName);
        console.log(values.email);
        console.log(values.birthDate);
        console.log(values.username);
        console.log(values.password);
        console.log("Registro de usuario");

    }
    const form = useForm<SignupFormValues>({
        mode: "uncontrolled",
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            birthDate: '',
            username: '',
            password: ''
        },
        validate: {
            name: value => !!value.length ? null : 'Name is required',
            lastName: value => !!value.length ? null : 'Last name is required',
            birthDate: value => !!value.length ? null : 'Birth date is required',
            email: value => !!value.length ? null : 'email is required',
            password: value => !!value.length ? null : 'Password is required',
            username: value => !!value.length ? null : 'Username is required',

        }
    });
    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center">
            <NavbarAnonymousUser/>
            <div className="flex flex-row items-center justify-center gap-12">
                <div className="text-white w-60">
                    <Title size="30" c="white" className="mb-4 text-center" >
                        Registro usuario
                    </Title>
                    <br/>
                    <Link href="/login" className="text-blue-400 hover:underline text-sm">
                        Ya soy un usuario registrado
                    </Link>
                    <form onSubmit={form.onSubmit(handleSignup)} className="mt-8 w-full">
                        <Flex className="w-full" gap="xl" direction="column" wrap="wrap">
                            <TextInput
                                className="w-60"
                                label={<Group><UserCheck size="20" />Nombre</Group>}
                                placeholder="John Richard"
                                key={form.key("name")}
                                {...form.getInputProps("name")}
                            />
                            <TextInput
                                className="w-60"
                                label={<Group><UserCheck size="20" />Apellidos</Group>}
                                placeholder="Hogan Rockefeller"
                                key={form.key("lastName")}
                                {...form.getInputProps("lastName")}
                            />
                            <TextInput
                                className="w-60"
                                label={<Group><Calendar size="20" />Fecha de nacimiento</Group>}
                                placeholder="01-01-1990"
                                key={form.key("birthDate")}
                                {...form.getInputProps("birthDate")}
                            />
                            <TextInput
                                className="w-60"
                                label={<Group><Mail size="20" />Email</Group>}
                                placeholder="example@gmail.com"
                                key={form.key("email")}
                                {...form.getInputProps("email")}
                            />
                            <TextInput
                                className="w-60"
                                label={<Group><User size="20" />Nombre de usuario</Group>}
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
                            <Divider />
                            <Button className="w-full" variant="filled" color="blue" radius="md" type="submit">
                                Registrarme
                            </Button>
                        </Flex>
                    </form>
                </div>
                <div className="flex-shrink-0">
                    <Image
                        src="/images/backgroundImage.jpg"
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
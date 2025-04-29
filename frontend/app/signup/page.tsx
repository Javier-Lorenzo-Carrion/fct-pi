"use client";
import {Button, Center, Divider, Flex, Group, TextInput, Title} from "@mantine/core";
import {Key, User} from "react-feather";
import {useForm} from "@mantine/form";
import Link from "next/link";

interface SignupFormValues {
    username: string
    password: string
}

export default function Signup(): Element {
    function handleSignup(values: SignupFormValues){
        console.log(values.username);
        console.log(values.password);
        console.log("Registro de usuario");

    }
    const form = useForm<SignupFormValues>({
        mode: "uncontrolled",
        initialValues: {
            username: '',
            password: ''
        },
        validate: {
            password: value => !!value.length ? null : 'Password is required',
            username: value => !!value.length ? null : 'Username is required',
        }
    });
    return (
        <Center h="100vh">
            <Flex gap="lg" justify="center" align="center" direction="column" wrap="wrap">
                <Title size="lg">
                    Registro de usuario
                </Title>
                <form onSubmit={form.onSubmit(handleSignup)}>
                    <Flex gap="md" direction="column" wrap="wrap">
                        <TextInput
                            label={<Group><User size="20"/>Usuario</Group>}
                            placeholder="john"
                            key={form.key('username')}
                            {...form.getInputProps('username')}
                        />
                        <TextInput
                            type="password"
                            label={<Group><Key size="20"/>Contraseña</Group>}
                            placeholder="*******"
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />
                        <Divider/>
                        <Button variant="filled" color="blue" radius="md" type="submit">
                            Registrarme
                        </Button>
                        <Divider/>
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Ya soy un usuario registrado
                        </Link>
                    </Flex>
                </form>
            </Flex>
        </Center>
    )
}
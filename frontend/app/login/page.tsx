"use client";
import {Button, Card, Center, Container, Divider, Flex, Group, Text, TextInput, Title} from "@mantine/core";
import {Form, useForm} from "@mantine/form";
import {Key, User} from "react-feather";

interface LoginFormValues {
    username: string
    password: string
}


export default function Login() {
    const handleClick = () => {
        console.log("clicked");
    }

    function handleLogin(values: LoginFormValues) {
        console.log(values.username);
        console.log(values.password);
    }

    const form = useForm<LoginFormValues>({
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
                    Inicio de sesión
                </Title>
                <a href="#">No tengo cuenta, quiero registrarme</a>

                <form onSubmit={form.onSubmit(handleLogin)}>
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
                            Iniciar sesión
                        </Button>
                    </Flex>
                </form>
            </Flex>
        </Center>
    )
}

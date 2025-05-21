"use client";

import {useForm} from "@mantine/form";
import NavbarAnonymousUser from "@/components/NavBarAnonymousUser";
import {Button, Divider, Flex, Group, TextInput, Title} from "@mantine/core";
import Link from "next/link";
import {Key, Mail} from "react-feather";
import Image from "next/image";
import {useTranslations} from "next-intl";

export interface LoginFormValues {
    email: string
    password: string
}

interface LoginContainerProps {
    handleLogin: (values: LoginFormValues) => void;
    loading: boolean;
}

export function LoginContainer(props: LoginContainerProps) {
    const form = useForm<LoginFormValues>({
        mode: "uncontrolled",
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            password: (value) => (!!value.length ? null : "Password is required"),
            email: (value) => (!!value.length ? null : "Username is required"),
        },
    });

    const t = useTranslations("loginForm");

    return <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <NavbarAnonymousUser/>
        <div className="flex flex-row items-center justify-center gap-12">
            <div className="text-white w-60">
                <Title size="30" c="white" className="mb-4 text-center">
                    {t("titleLogin")}
                </Title>
                <br/>
                <Link href="/signup" className="text-blue-400 hover:underline text-sm">
                    {t("wantedSignup")}
                </Link>
                <form onSubmit={form.onSubmit(props.handleLogin)} className="mt-8 w-full">
                    <Flex className="w-full" gap="xl" direction="column" wrap="wrap">
                        <TextInput
                            className="w-60"
                            label={<Group><Mail size="20"/>{t("email")}</Group>}
                            placeholder={t("exampleEmail")}

                            {...form.getInputProps("email")}
                        />
                        <TextInput
                            className="w-60"
                            type="password"
                            label={<Group><Key size="20"/>{t("password")}</Group>}
                            placeholder="*******"

                            {...form.getInputProps("password")}
                        />
                        <Divider/>
                        <Button className="w-full" variant="filled" color="blue" radius="md" type="submit"
                                loading={props.loading} disabled={props.loading}>
                            {t("login")}
                        </Button>
                    </Flex>
                </form>
            </div>
            <div className="flex-shrink-0">
                <Image
                    src="/images/laptop.jpg"
                    alt={t("imageDescription")}
                    width={750}
                    height={500}
                    style={{objectFit: "contain"}}
                    priority
                />
            </div>
        </div>
    </div>;
}

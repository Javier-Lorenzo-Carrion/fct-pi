"use client";

import {UseFormReturnType} from "@mantine/form";
import NavbarAnonymousUser from "@/components/NavBarAnonymousUser";
import {Button, Divider, Flex, Group, TextInput, Title} from "@mantine/core";
import Link from "next/link";
import {Key, Mail, User} from "react-feather";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {useTransition} from "react";
import {Locale} from "@/i18n/config";
import {setStoredLocale} from "@/i18n/locale";

export interface LoginFormValues {
    email: string
    password: string
}

export function LoginContainer(props: {

    form: UseFormReturnType<LoginFormValues, (values: LoginFormValues) => LoginFormValues>,
    handleLogin: (values: LoginFormValues) => void
}) {

    const t = useTranslations("loginForm");

    const [_, startTransition] = useTransition();
    function handleChangeLocale(locale: Locale) {
        startTransition(() => setStoredLocale(locale))
    }

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
                <form onSubmit={props.form.onSubmit(props.handleLogin)} className="mt-8 w-full">
                    <Flex className="w-full" gap="xl" direction="column" wrap="wrap">
                        <TextInput
                            className="w-60"
                            label={<Group><Mail size="20"/>{t("email")}</Group>}
                            placeholder={t("exampleEmail")}

                            {...props.form.getInputProps("email")}
                        />
                        <TextInput
                            className="w-60"
                            type="password"
                            label={<Group><Key size="20"/>{t("password")}</Group>}
                            placeholder="*******"

                            {...props.form.getInputProps("password")}
                        />
                        <Divider/>
                        <Button className="w-full" variant="filled" color="blue" radius="md" type="submit">
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
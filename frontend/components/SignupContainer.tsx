"use client";
import {UseFormReturnType} from "@mantine/form";
import NavbarAnonymousUser from "@/components/NavBarAnonymousUser";
import {Button, Divider, Flex, Group, TextInput, Title} from "@mantine/core";
import Link from "next/link";
import {Calendar, Key, Mail, User, UserCheck} from "react-feather";
import Image from "next/image";
import {useTranslations} from "next-intl";

export interface SignupFormValues {
    name: string
    lastName: string
    birthDate: string
    email: string
    username: string
    password: string
}
export function SignupContainer(props: {
    form: UseFormReturnType<SignupFormValues, (values: SignupFormValues) => SignupFormValues>,
    handleSignup: (values: SignupFormValues) => void
}) {
    const t = useTranslations("signupForm");
    return <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <NavbarAnonymousUser/>
        <div className="flex flex-row items-center justify-center gap-12">
            <div className="text-white w-60">
                <Title size="30" c="white" className="mb-4 text-center">
                    {t("titleSignup")}
                </Title>
                <br/>
                <Link href="/login" className="text-blue-400 hover:underline text-sm">
                    {t("alreadyUser")}
                </Link>
                <form onSubmit={props.form.onSubmit(props.handleSignup)} className="mt-8 w-full">
                    <Flex className="w-full" gap="xl" direction="column" wrap="wrap">
                        <TextInput
                            className="w-60"
                            label={<Group><UserCheck size="20"/>{t("name")}</Group>}
                            placeholder={t("exampleName")}
                            {...props.form.getInputProps("name")}
                        />
                        <TextInput
                            className="w-60"
                            label={<Group><UserCheck size="20"/>{t("lastName")}</Group>}
                            placeholder={t("exampleLastName")}
                            {...props.form.getInputProps("lastName")}
                        />
                        <TextInput
                            className="w-60"
                            label={<Group><Calendar size="20"/>{t("birthDate")}</Group>}
                            placeholder={t("exampleBirthDate")}
                            {...props.form.getInputProps("birthDate")}
                        />
                        <TextInput
                            className="w-60"
                            label={<Group><Mail size="20"/>{t("email")}</Group>}
                            placeholder={t("exampleEmail")}
                            {...props.form.getInputProps("email")}
                        />
                        <TextInput
                            className="w-60"
                            label={<Group><User size="20"/>{t("userName")}</Group>}
                            placeholder={t("exampleUserName")}
                            {...props.form.getInputProps("username")}
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
                            {t("signup")}
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
"use client";

import {useTranslations} from "next-intl";
import Link from "next/link";
import Image from "next/image";
import NavbarAnonymousUser from "@/components/NavBarAnonymousUser";
import {Divider, Title} from "@mantine/core";


export function RegisteredUserContainer() {
    const t = useTranslations("registeredUser");
    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center">
            <NavbarAnonymousUser/>
            <div className="flex flex-row items-center justify-center gap-12">
                <div className="text-white w-60">
                    <Title size="30" c="white" className="text-center">
                        {t("welcomeMessage")}
                    </Title>
                    <br/>
                    <br/>
                    <div className="text-center">
                    <Link href="/login" className="text-blue-400 hover:underline text-md">
                        {t("linkToLogin")}
                    </Link>
                    </div>
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
        </div>
    )
}
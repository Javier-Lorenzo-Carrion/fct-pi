"use client";

import Image from "next/image";
import NavBarRegisteredUser from "@/components/NavBarRegisteredUser";
import NavBarAnonymousUser from "@/components/NavBarAnonymousUser";
import {useTranslations} from "next-intl";
import {List, Title} from "@mantine/core";
import {CheckCircle} from "react-feather";

export function HomeContainer() {

    const t = useTranslations("homeContent");

    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center">
            {localStorage.getItem("token")? <NavBarRegisteredUser/>:<NavBarAnonymousUser/>}
            <div className="flex flex-col items-center justify-center">

                <div className="text-white">
                    <Title order={1} className="pt-50 text-center">{t("title-1")}</Title>

                    <p className="pt-12">{t("paragraph-1")}</p>

                    <p className="py-12"><Title order={4} className="text-center text-amber-900">{t("title-2")}</Title></p>

                    <Title order={2} className="py-10 underline text-cyan-800">{t("title-3")}</Title>

                    <p>{t("paragraph-2-1")}  <a href="/reports" className="text-cyan-400 underline hover:text-cyan-400">{t("link-1")}</a>  {t("paragraph-2-2")}  <a href="/report-example/example.pdf" className="text-cyan-400 underline hover:text-cyan-400">{t("link-2")}</a>  {t("paragraph-2-3")}</p>


                    <div className="flex flex-row gap-12">
                        <List py={18} icon={<CheckCircle/>}>
                            <Title order={4} className="py-4 underline">{t("title-4")}</Title>
                            <List.Item>{t("list-1")}</List.Item>
                            <List.Item>{t("list-2")}</List.Item>
                            <List.Item>{t("list-3")}</List.Item>
                            <List.Item>{t("list-4")}</List.Item>
                            <List.Item>{t("list-5")}</List.Item>
                            <List.Item>{t("list-6")}</List.Item>
                            <List.Item>{t("list-7")}</List.Item>
                            <List.Item>{t("list-8")}</List.Item>
                            <List.Item>{t("list-9")}</List.Item>
                            <List.Item>{t("list-10")}</List.Item>
                            <Title order={5} className="pt-6">
                                <p>{t("title-5")}  <a href="/report-manual/manual.pdf" className="text-cyan-400 underline hover:text-cyan-400">{t("link-3")}</a></p>
                            </Title>
                        </List>

                        <Image
                            className="pt-6"
                            src="/images/laptop.jpg"
                            alt={t("imageDescription")}
                            width={750}
                            height={500}
                            style={{objectFit: "contain"}}
                            priority
                        />
                    </div>

                    <Title order={2} className="py-14 underline text-cyan-800">{t("title-6")}</Title>

                    <p>{t("paragraph-3-1")}  <a href="/reports-history" className="text-cyan-400 underline hover:text-cyan-400">{t("link-4")}</a>  {t("paragraph-3-2")}</p>
                    <p>{t("paragraph-4")}</p>
                    <p>{t("paragraph-5")}</p>

                    <Title order={2} className="pt-16 pb-6 underline text-cyan-800">{t("title-7")}</Title>

                    <p className="pb-16">{t("paragraph-6-1")} {t("paragraph-6-2")}.</p>
                </div>
            </div>
        </div>
    );
}
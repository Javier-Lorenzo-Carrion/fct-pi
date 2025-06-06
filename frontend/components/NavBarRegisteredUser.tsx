'use client';
import Link from "next/link";
import {Divider, Flex} from "@mantine/core";
import {usePathname} from "next/navigation";
import {Clipboard, Home, Info, List, Power} from "react-feather";
import {useTranslations} from "next-intl";
import {Locale} from "@/i18n/config";
import {setStoredLocale} from "@/i18n/locale";
import {useTransition} from "react";

export default function NavbarAnonymousUser() {
    const currentPath = usePathname();
    const t = useTranslations("navbar");
    const [_, startTransition] = useTransition();
    function handleChangeLocale(locale: Locale) {
        startTransition(() => setStoredLocale(locale))
    }
    return (
        <nav className="w-full bg-black text-white p-4 shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center relative">
                <div>
                    <Flex className="w-full" gap="xl" direction="row">
                        <Link href="/" className={`flex gap-4 mt-4 hover:underline ${currentPath === "/" ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-white"}`}>
                            <Home size={16} className="shrink-0"/>
                            {t("home")}
                        </Link>
                        <Link href="/reports" className={`flex gap-4 mt-4 hover:underline ${currentPath === "/reports" ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-white"}`}>
                            <Clipboard size={16} className="shrink-0"/>
                            {t("reports")}
                        </Link>
                        <Link href="/reports-history" className={`flex gap-4 mt-4 hover:underline ${currentPath === "/reports-history" ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-white"}`}>
                            <List size={16} className="shrink-0"/>
                            {t("reportsHistory")}
                        </Link>
                        <Link href="/report-manual/manual.pdf" className={`flex gap-4 mt-4 hover:underline "text-white"}`}>
                            <Info size={16} className="shrink-0"/>
                            {t("manual")}
                        </Link>
                    </Flex>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/" title={t("logout")} className="flex gap-4 hover:underline text-white" onClick={() => {
                        localStorage.removeItem("token");
                    }}>
                        <span className={`flex gap-4 shrink-0 mt-2 ${currentPath === "/login" ? "text-blue-400 border-b-2 border-blue-400 pb-1" : ""}`}>
                            <Power size={18}/>
                            {t("logout")}
                        </span>
                    </Link>
                    <div className="flex gap-4">
                        <button onClick={() => handleChangeLocale("es")}>
                            <img
                                src="/images/es.png"
                                alt="Español"
                                className="w-8 h-8 cursor-pointer"
                                title="Español"
                            />
                        </button>
                        <button onClick={() => handleChangeLocale("en")}>
                            <img
                                src="/images/en.png"
                                alt="English"
                                className="w-8 h-8 cursor-pointer"
                                title="English"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <Divider className="text-white mt-12"/>
        </nav>
    );
}
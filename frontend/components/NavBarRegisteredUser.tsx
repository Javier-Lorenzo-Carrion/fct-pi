'use client';
import Link from "next/link";
import {Divider, Flex} from "@mantine/core";
import {usePathname} from "next/navigation";
import {Clipboard, Home, List, Lock, LogIn, Power, UserPlus} from "react-feather";
import Login from "@/app/login/page";

export default function NavbarAnonymousUser() {
    const currentPath = usePathname();
    return (
        <nav className="w-full bg-black text-white p-4 shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center relative">
                <div>
                    <Flex className="w-full" gap="xl" direction="row">
                        <Link href="/" className={`flex gap-4 mt-4 hover:underline ${currentPath === "/" ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-white"}`}>
                            <Home size={16} className="shrink-0"/>
                            Home
                        </Link>
                        <Link href="/report" className={`flex gap-4 mt-4 hover:underline ${currentPath === "/report" ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-white"}`}>
                            <Clipboard size={16} className="shrink-0"/>
                            Generar mi informe
                        </Link>
                        <Link href="/report-history" className={`flex gap-4 mt-4 hover:underline ${currentPath === "/report-history" ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-white"}`}>
                            <List size={16} className="shrink-0"/>
                            Mis informes generados
                        </Link>
                    </Flex>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="/" title="Logout" className="flex gap-4 hover:underline text-white">
                        <span className={`shrink-0 mt-2 ${currentPath === "/login" ? "text-blue-400 border-b-2 border-blue-400 pb-1" : ""}`}>
                            <Power size={18}/>
                        </span>
                    </Link>
                    <div className="flex gap-4">
                        <button>
                            <img
                                src="/images/es.png"
                                alt="Español"
                                className="w-8 h-8 cursor-pointer"
                                title="Español"
                            />
                        </button>
                        <button>
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
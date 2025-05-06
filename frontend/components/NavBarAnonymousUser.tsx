import Link from "next/link";
import {Divider, Flex} from "@mantine/core";
import {usePathname} from "next/navigation";

export default function NavbarAnonymousUser() {
    const currentPath = usePathname();
    return (
        <nav className="w-full bg-black text-white p-4 shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center relative">
                <div>
                    <Flex className="w-full" gap="xl" direction="row">
                        <Link href="/"
                              className={`flex gap-2 mt-4 hover:underline ${currentPath === "/" ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-white"}`}>
                            Home
                        </Link>
                        <Link
                            href="/signup"
                            className={`flex gap-2 mt-4 hover:underline ${
                                currentPath === "/signup" ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-white"
                            }`}
                        >
                            Registrarme
                        </Link>
                        <Link
                            href="/login"
                            className={`flex gap-2 mt-4 hover:underline ${
                                currentPath === "/login" ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "text-white"
                            }`}
                        >
                            Iniciar sesión
                        </Link>
                    </Flex>
                </div>
                <div className="absolute top-4 right-4 flex gap-4">
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
            <Divider className="text-white mt-12"/>
        </nav>
    );
}
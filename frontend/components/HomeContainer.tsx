"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import NavBarRegisteredUser from "@/components/NavBarRegisteredUser";
import NavBarAnonymousUser from "@/components/NavBarAnonymousUser";

export function HomeContainer() {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // true si hay token, false si no
    }, []);

    if (isLoggedIn === null) {
        return null; // o un spinner si quieres
    }

    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center">
            {isLoggedIn ? <NavBarRegisteredUser /> : <NavBarAnonymousUser />}
            <div className="flex flex-row items-center justify-center gap-12">
                <div className="text-white w-60">
                    <p>
                        Descripcion del servicio y la aplicación. Algo como un eslogan y una breve introducción.
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <Image
                        src="/images/laptop.jpg"
                        alt="Imagen central"
                        width={750}
                        height={500}
                        style={{objectFit: "contain"}}
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
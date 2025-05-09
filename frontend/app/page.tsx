import Image from "next/image";
import NavbarAnonymousUser from "@/components/NavBarAnonymousUser";
import NavBarRegisteredUser from "@/components/NavBarRegisteredUser";
import {Title} from "@mantine/core";

export default function Home() {
    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center">
            <NavbarAnonymousUser/>
            <div className="flex flex-row items-center justify-center gap-12">
                <div className="text-white w-60">
                    <p>
                        Descripcion del servicio y la aplicación. Algo como un eslogan y una breve introducción.
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <Image
                        src="/images/prueba2.jpg"
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

import NavBarRegisteredUser from "@/components/NavBarRegisteredUser";
import Image from "next/image";


export default function ReportHistoryContainer() {
    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center">
            <NavBarRegisteredUser/>
            <div className="text-white mt-8 w-max">
                <h1 className="font-bold text-2xl leading-tight">
                    PONER TABLA
                </h1>
            </div>
            <div className="flex flex-row items-center justify-center gap-12">
                <div className="text-white w-60">
                </div>
            </div>
            <div className="flex-shrink-0">
                <Image
                    src="/images/house.jpg"
                    alt="Imagen central"
                    width={750}
                    height={500}
                    style={{objectFit: "contain"}}
                    priority
                />
            </div>
        </div>
    );
}
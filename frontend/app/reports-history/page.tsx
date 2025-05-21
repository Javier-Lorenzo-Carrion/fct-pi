"use client";

import ReportHistoryContainer from "@/components/ReportHistoryContainer";
import NavbarAnonymousUser from "@/components/NavBarAnonymousUser";
import Image from "next/image";

export default function ReportHistoryPage(){
    return (
            <div className="flex flex-row items-center justify-center gap-12 mt-36">
                <ReportHistoryContainer/>
            </div>
    );
}
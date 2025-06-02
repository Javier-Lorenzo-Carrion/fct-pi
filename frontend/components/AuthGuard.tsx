'use client'

import { useState, useEffect, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {Text} from "@mantine/core";
import {useTranslations} from "next-intl";

interface Props { children: ReactNode }
export default function AuthGuard({ children }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const [checked, setChecked] = useState(false)
    const t = useTranslations("authentication");
    useEffect(() => {
        const token = localStorage.getItem('token')
        const publicPaths = ['/login', '/signup', '/', '/registeredUser']

        if (!token && !publicPaths.includes(pathname)) {
            router.replace('/login')
        } else {
            setChecked(true)
        }
    }, [pathname, router])
    if (!checked) {
        return <div className="text-center mt-72">
            <Text size="xl"> {t("checkingCredentials")}</Text>
        </div>
    }
    return <>{children}</>
}

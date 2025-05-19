import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {PUBLIC_ROUTES} from "@/lib/authentication";

export default function Template({children}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        // Cada vez que cambie la ruta:
        const handleRouteChange = (url: string) => {
            const token = localStorage.getItem('token')
            const isPublic = PUBLIC_ROUTES.includes(url)
            if (!token && !isPublic) {
                router.push('/login')
            }
        }

        // Primera comprobación al montar
        handleRouteChange(router.pathname)
        setChecking(false)

        router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [router])

    // Evitamos el "flash" de contenido protegido
    if (checking) {
        return <div>Cargando…</div>
    }
    return {children};
}

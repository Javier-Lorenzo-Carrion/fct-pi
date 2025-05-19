'use client'

import { useState, useEffect, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface Props { children: ReactNode }

export default function AuthGuard({ children }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const publicPaths = ['/login', '/signup', '/']

        if (!token && !publicPaths.includes(pathname)) {
            router.replace('/login')
        } else {
            setChecked(true)
        }
    }, [pathname, router])

    // Mientras comprobamos, evitamos un "flash" de contenido privado
    if (!checked) {
        return <div>Cargando…</div>
    }

    return <>{children}</>
}

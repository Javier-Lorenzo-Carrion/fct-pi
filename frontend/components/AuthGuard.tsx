'use client'

import { useState, useEffect, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {Text} from "@mantine/core";

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
        return <div className="text-center mt-72">
            <Text size="xl"> Comprobando credenciales ...</Text>
        </div>
    }

    return <>{children}</>
}

// TODO: OJO QUE CUANDO ESTAS LOGUEADO, Y VAS AL HOME YA NO TE PUEDEN APARECER LOS ICONOS DE LOGIN O SIGNUP SOLO EL DE APAGAR O CERRAR SESIÓN

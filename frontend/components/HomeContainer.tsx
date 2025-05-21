"use client";

import Image from "next/image";
import {useEffect, useState, useTransition} from "react";
import NavBarRegisteredUser from "@/components/NavBarRegisteredUser";
import NavBarAnonymousUser from "@/components/NavBarAnonymousUser";
import {useTranslations} from "next-intl";
import {Locale} from "@/i18n/config";
import {setStoredLocale} from "@/i18n/locale";
import {List, ListItem, Title} from "@mantine/core";
import {CheckCircle} from "react-feather";

export function HomeContainer() {

    const t = useTranslations("signupForm");

    const [_, startTransition] = useTransition();

    function handleChangeLocale(locale: Locale) {
        startTransition(() => setStoredLocale(locale))
    }

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
            {isLoggedIn ? <NavBarRegisteredUser/> : <NavBarAnonymousUser/>}
            <div className="flex flex-col items-center justify-center">
                <Image
                    src="/images/laptop.jpg"
                    alt="Imagen central"
                    width={750}
                    height={500}
                    style={{objectFit: "contain"}}
                    priority
                />
                <div className="text-white">
                    <Title order={4} className="py-10 text-center">¿Estás pensando en contratar un préstamo hipotecario con una entidad bancaria,
                        pero no sabes como
                        abordar este asunto?</Title>
                    <p className="py-3">Cuando una persona va a una entidad bancaria en búsqueda de financiación hipotecaria, se suele
                        encontrar con una cantidad de términos y papeleos difíciles de entender y gestionar. Estos
                        productos son difíciles de entender para personas que no pertenecen al mundo financiero.
                        Por ello, es importante dedicar un tiempo a su comprensión y estudio. Recuerda que son productos
                        a los que puedes estar atado 35 años. Conviene saber
                        exáctamente lo
                        que te ofrecen antes de firmar.</p>


                    <p className="py-3">Sabemos que este proceso es difícil y desalentador, pero esperamos que puedas
                        tomar la mejor
                        decisión con ayuda de nuestro servicio.</p>

                    <Title order={2} className="py-10 underline">Generar un informe</Title>

                    <p>Aquí podrás simular y calcular al detalle tu préstamo hipotecario y generar un informe completo
                        en pdf descargable (apartado “Generar mi informe”) en el que tendrás información detallada:</p>

                    <Title order={3} className="py-4">Resumen ejecutivo del préstamo hipotecario</Title>

                    <List icon={<CheckCircle/>}>
                        <List.Item>Moneda</List.Item>
                        <List.Item>Capital financiado</List.Item>
                        <List.Item>Tipo de interés nominal anual</List.Item>
                        <List.Item>Duración</List.Item>
                        <List.Item>Frecuencia de pago</List.Item>
                        <List.Item>Sistema de amortización del préstamo</List.Item>
                        <List.Item>Total de pagos entre amortización e intereses</List.Item>
                        <List.Item>Total de pagos por intereses</List.Item>
                        <List.Item>Carga porcentual de los intereses respecto al capital financiado</List.Item>
                    </List>

                    <Title order={3} className="py-4">Cuadro de amortización completo</Title>

                    <List icon={<CheckCircle/>}>
                        <List.Item>Período</List.Item>
                        <List.Item>Cuota total mensual</List.Item>
                        <List.Item>Cuota de interés mensual</List.Item>
                        <List.Item>Cuota de amortización mensual</List.Item>
                        <List.Item>Capital pendiente en cada momento</List.Item>
                    </List>

                    <Title order={2} className="py-10 underline">Acceder al historial de informes generados</Title>

                    <p>Siempre podrás ver todos los informes que hayas generado en el apartado “tus informes generados”
                        (tantos como propuestas bancarias te hayan realizado las distintas entidades).</p>
                    <p>En este apartado, podrás visualizar siempre que quieras, una tabla con todas aquellas propuestas
                        que hayas generado para así observar cual es la que más te convence.</p>
                    <p>Además, puedes rescatar los informes que hayas generado en caso de haberlos perdido o borrado
                        accidentalmente accediendo al link de descarga en PDF que aparace en la tabla.</p>

                    <Title order={2} className="py-10 underline">Registro</Title>

                    <p>Para usar nuestro servicio, es necesario crear una cuenta. No te preocupes, sólo te llevará unos
                        minutos.</p>
                </div>
            </div>
        </div>
    );
}
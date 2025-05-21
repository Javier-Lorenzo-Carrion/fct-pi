import React from "react";
import AuthGuard from "@/components/AuthGuard";
import {ColorSchemeScript, Container, createTheme, mantineHtmlProps, MantineProvider} from "@mantine/core";
import {Geist, Geist_Mono} from "next/font/google";

const theme = createTheme({});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function Template({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" {...mantineHtmlProps}>
        <head>
            <ColorSchemeScript/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <MantineProvider theme={theme}>
                <AuthGuard>{children}</AuthGuard>
        </MantineProvider>
        </body>
        </html>
    )
}

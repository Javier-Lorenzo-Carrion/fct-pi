import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ColorSchemeScript, Container, createTheme, mantineHtmlProps, MantineProvider} from "@mantine/core";
import AuthGuard from "@/components/AuthGuard";
import {getLocale} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";
import {ErrorProvider} from "@/error/context";
import {ErrorModal} from "@/components/ErrorModal";

const theme = createTheme({});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    return (
        <html lang={locale} {...mantineHtmlProps}>
        <head>
            <ColorSchemeScript/>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MantineProvider theme={theme}>
            <NextIntlClientProvider>
                <ErrorProvider>
                    <Container size="xl">
                        <ErrorModal/>
                        <AuthGuard>{children}</AuthGuard>
                    </Container>
                </ErrorProvider>
            </NextIntlClientProvider>
        </MantineProvider>
        </body>
        </html>
    );
}

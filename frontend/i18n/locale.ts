"use server"

import {cookies} from "next/headers";
import {getLocaleOrDefault, Locale} from "./config";

const cookieLocale = "current_locale";
export async function getStoredLocale(): Promise<Locale> {
    const nextCookie = await cookies();
    const storedLocale = nextCookie.get(cookieLocale)?.value;
    return getLocaleOrDefault(storedLocale);
}
export async function setStoredLocale(locale: Locale) {
    const nextCookie = await cookies();
    nextCookie.set(cookieLocale, locale);
}
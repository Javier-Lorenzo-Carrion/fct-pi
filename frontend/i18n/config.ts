export const locales = ["es", "en"] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = locales[0];
export function getLocaleOrDefault(value?: string): Locale {
    return locales.some((locale) => locale === value)? value as Locale: defaultLocale;
}
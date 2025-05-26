import {getRequestConfig} from "next-intl/server";

import {getStoredLocale} from "@/i18n/locale";

async function handleLocale() {;
    const storedLocale = await getStoredLocale();
    return {
            locale: storedLocale,
            messages: (await import(`../messages/${storedLocale}.json`)).default
        };
}
export default getRequestConfig(handleLocale);
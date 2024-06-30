import { type LocalePrefix } from "next-intl/routing";

export const locales = ["en", "pl"] as const;
export type AppLocaleType = (typeof locales)[number];

export const localePrefix = "always" satisfies LocalePrefix;

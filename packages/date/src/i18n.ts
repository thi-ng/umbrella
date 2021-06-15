import type { Locale } from "./api";
import { EN_SHORT } from "./i18n/en";

export let LOCALE = EN_SHORT;

/**
 * Sets {@link LOCALE} for formatting, default: {@link EN_SHORT}.
 *
 * @param locale
 */
export const setLocale = (locale: Locale) => (LOCALE = locale);

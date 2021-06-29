import type { Locale, LocaleSpec } from "./api";
import { EN_SHORT } from "./i18n/en";

/**
 * Sets {@link LOCALE} for formatting and fills in missing default values.
 * Unless called explicitly, the package uses {@link EN_SHORT} by default.
 *
 * @param locale
 */
export const setLocale = (locale: LocaleSpec): Locale =>
    (LOCALE = <Locale>{
        sepED: " ",
        sepDM: "/",
        sepMY: "/",
        sepHM: ":",
        date: ["E", "/ED", "d", "/DM", "MMM", "/MY", "yyyy"],
        time: ["H", "/HM", "mm"],
        ...locale,
    });

export let LOCALE = setLocale(EN_SHORT);

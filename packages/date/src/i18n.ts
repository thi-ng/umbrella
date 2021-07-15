import type { Fn0 } from "@thi.ng/api";
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

/**
 * Executes given `fn` with temporarily active `locale`. Returns result of `fn`.
 *
 * @param locale
 * @param fn
 */
export const withLocale = <T>(locale: LocaleSpec, fn: Fn0<T>) => {
    const old = LOCALE;
    setLocale(locale);
    const res = fn();
    setLocale(old);
    return res;
};

export let LOCALE = setLocale(EN_SHORT);

import { Locale } from "./api";

export const EN_SHORT: Locale = {
    months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ],
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

export const EN_LONG: Locale = {
    months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ],
};

export let LOCALE = EN_SHORT;

/**
 * Sets {@link LOCALE} for formatting, default: {@link EN_SHORT}.
 *
 * @param locale
 */
export const setLocale = (locale: Locale) => (LOCALE = locale);

import type { LocaleSpec } from "../api";

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Date_and_time_notation_in_Europe#Germany
 */
export const DE_SHORT: LocaleSpec = {
    months: [
        "Jan",
        "Feb",
        "Mär",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez",
    ],
    days: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    sepED: ", ",
    sepDM: ".",
    sepMY: ".",
    date: ["d", "/DM", "M", "/MY", "yyyy"],
};

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Date_and_time_notation_in_Europe#Germany
 */
export const DE_LONG: LocaleSpec = {
    months: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
    ],
    days: [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
    ],
    sepED: ", ",
    sepDM: ". ",
    sepMY: " ",
};

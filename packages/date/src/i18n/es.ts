import type { LocaleSpec } from "../api";

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Date_and_time_notation_in_Spain
 */
export const ES_SHORT: LocaleSpec = {
    months: [
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jul",
        "ago",
        "sep",
        "oct",
        "nov",
        "dic",
    ],
    days: ["D", "L", "M", "X", "J", "V", "S"],
    date: ["d", "/DM", "MM", "/MY", "yyyy"],
};

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Date_and_time_notation_in_Spain
 */
export const ES_LONG: LocaleSpec = {
    months: [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
    ],
    days: [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado",
    ],
    sepDM: " ",
    sepMY: " ",
};

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
    units: {
        y: { s: "J.", p: "J." },
        M: { s: "Mo.", p: "Mo." },
        d: { s: "T.", p: "T." },
        h: { s: "Std.", p: "Std." },
        m: { s: "Min.", p: "Min." },
        s: { s: "Sek.", p: "Sek." },
        t: { s: "ms", p: "ms" },
    },
    less: "< %s",
    past: "vor %s",
    now: "jetzt",
    future: "in %s",
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
    units: {
        y: { s: "Jahr", p: "Jahre", pd: "Jahren" },
        M: { s: "Monat", p: "Monate", pd: "Monaten" },
        d: { s: "Tag", p: "Tage", pd: "Tagen" },
        h: { s: "Stunde", p: "Stunden" },
        m: { s: "Minute", p: "Minuten" },
        s: { s: "Sekunde", p: "Sekunden" },
        t: { s: "Millisekunde", p: "Millisekunden" },
    },
    less: "weniger als %s",
    past: "vor %s",
    now: "jetzt",
    future: "in %s",
};

import type { LocaleSpec } from "../api.js";

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Date_and_time_notation_in_Italy
 */
export const IT_LONG: LocaleSpec = {
    months: [
        "gennaio",
        "febbraio",
        "marzo",
        "aprile",
        "maggio",
        "giugno",
        "luglio",
        "agosto",
        "settembre",
        "ottobre",
        "novembre",
        "dicembre",
    ],
    days: [
        "domenica",
        "lunedì",
        "martedì",
        "mercoledì",
        "giovedì",
        "venerdì",
        "sabato",
    ],
    sepDM: " ",
    sepMY: " ",
    sepHM: ".",
    units: {
        y: { s: "anno", p: "anni" },
        M: { s: "mese", p: "mesi" },
        d: { s: "giorno", p: "giorni" },
        h: { s: "ora", p: "ore" },
        m: { s: "minuto", p: "minuti" },
        s: { s: "secondo", p: "secondi" },
        t: { s: "millisecondo", p: "millisecondi" },
    },
    less: "meno di %s",
    past: "%s fa",
    // https://dailyitalianwords.com/ora-vs-adesso/
    now: "ora",
    future: "in %s",
};

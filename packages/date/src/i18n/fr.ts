import type { LocaleSpec } from "../api";

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Date_and_time_notation_in_France
 */
export const FR_LONG: LocaleSpec = {
    months: [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "aout",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
    ],
    days: [
        "dimanche",
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
    ],
    sepDM: " ",
    sepMY: " ",
    sepHM: "h ",
    units: {
        y: { s: "année", p: "ans" },
        M: { s: "mois", p: "mois" },
        d: { s: "jour", p: "jours" },
        h: { s: "heure", p: "heures" },
        m: { s: "minute", p: "minutes" },
        s: { s: "seconde", p: "secondes" },
        t: { s: "milliseconde", p: "millisecondes" },
    },
    less: "moins de",
    past: "il y a %s",
    now: "à présent",
    future: "en %s",
};

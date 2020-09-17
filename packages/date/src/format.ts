import type { Fn } from "@thi.ng/api";
import { MONTH_NAMES, WEEKDAYS } from "./api";

const Z2 = (x: number) => (x < 10 ? "0" + x : String(x));

export const FORMATTERS: Record<string, Fn<Date, string>> = {
    /**
     * Full year (4 digits)
     */
    yyyy: (d) => String(d.getFullYear()),
    /**
     * Short year (2 digits, e.g. `2020 % 100` => 20)
     */
    yy: (d) => String(d.getFullYear() % 100),
    /**
     * 3-letter month name (e.g. `Feb`)
     */
    MMM: (d) => MONTH_NAMES[d.getMonth()],
    /**
     * Zero-padded 2-digit month
     */
    MM: (d) => Z2(d.getMonth() + 1),
    /**
     * Unpadded month
     */
    M: (d) => String(d.getMonth() + 1),
    /**
     * Zero-padded 2-digit day of month
     */
    dd: (d) => Z2(d.getDate()),
    /**
     * Unpadded day of month
     */
    d: (d) => String(d.getDate()),
    /**
     * 3-letter weekday name (e.g. `Mon`)
     */
    E: (d) => WEEKDAYS[d.getDay()],
    /**
     * Zero-padded 2-digit hour of day (0-23)
     */
    HH: (d) => Z2(d.getHours()),
    /**
     * Zero-padded hour of day (1-12)
     */
    hh: (d) => {
        const h = d.getHours() % 12;
        return Z2(h > 0 ? h : 12);
    },
    /**
     * Unpadded hour of day (1-12)
     */
    h: (d) => {
        const h = d.getHours() % 12;
        return String(h > 0 ? h : 12);
    },
    /**
     * Zero-padded 2-digit minute of hour
     */
    mm: (d) => Z2(d.getMinutes()),
    /**
     * Unpadded minute of hour
     */
    m: (d) => String(d.getMinutes()),
    /**
     * Zero-padded 2-digit second of minute
     */
    ss: (d) => Z2(d.getSeconds()),
    /**
     * Unpadded second of minute
     */
    s: (d) => String(d.getSeconds()),
    /**
     * Unpadded millisecond of second
     */
    S: (d) => String(d.getMilliseconds()),
    /**
     * 12-hour AM/PM marker
     */
    A: (d) => String(d.getHours() < 12 ? "AM" : "PM"),
    /**
     * Timezone offset in signed `HH:mm` format
     */
    Z: (d) => {
        const z = d.getTimezoneOffset();
        const za = Math.abs(z);
        return `${z < 0 ? "-" : "+"}${Z2((za / 60) | 0)}:${Z2(za % 60)}`;
    },
};

/**
 * Returns a new date formatter for given format string. The returned function
 * accepts timestamps or `Date` instances.
 *
 * @remarks
 * See {@link FORMATTERS} for available date component format IDs.
 *
 * @example
 * ```ts
 * const fmt = defFormat(["yyyy", "-", "MM", "-", "dd"]);
 *
 * fmt(Date.UTC(2015, 4, 23))
 * // 2015-04-23
 * ```
 *
 * @param fmt
 */
export const defFormat = (fmt: string[]) => (x: Date | number) => {
    const d = typeof x === "number" ? new Date(x) : x;
    return fmt
        .map((f) => {
            const fmt = FORMATTERS[f];
            return fmt ? fmt(d) : f;
        })
        .join("");
};

export const FMT_yyyyMMdd = defFormat(["yyyy", "-", "MM", "-", "dd"]);
export const FMT_MMddyyyy = defFormat(["MM", "/", "dd", "/", "yyyy"]);
export const FMT_MMMddyyyy = defFormat(["MMM", " ", "dd", " ", "yyyy"]);
export const FMT_ddMMyyyy = defFormat(["dd", "/", "MM", "/", "yyyy"]);
export const FMT_ddMMMyyyy = defFormat(["dd", " ", "MMM", " ", "yyyy"]);

export const FMT_HHmm = defFormat(["HH", ":", "mm"]);
export const FMT_hm = defFormat(["h", ":", "mm", " ", "A"]);
export const FMT_HHmmss = defFormat(["HH", ":", "mm", ":", "ss"]);
export const FMT_hms = defFormat(["h", ":", "mm", ":", "ss", " ", "A"]);

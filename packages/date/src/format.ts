import { isFunction } from "@thi.ng/checks/is-function";
import { isString } from "@thi.ng/checks/is-string";
import { Z2, Z3, Z4 } from "@thi.ng/strings/pad-left";
import { FormatFn, MaybeDate, MINUTE } from "./api";
import { ensureDate } from "./checks";
import { LOCALE } from "./i18n";
import { weekInYear } from "./units";

export const FORMATTERS: Record<string, FormatFn> = {
    /**
     * Full year (4 digits)
     */
    yyyy: (d) => Z4(d.getFullYear()),
    /**
     * Short year (2 digits, e.g. `2020 % 100` => 20)
     */
    yy: (d) => Z2(d.getFullYear() % 100),
    /**
     * Month name, using current {@link LOCALE} (e.g. `Feb`)
     */
    MMM: (d) => LOCALE.months[d.getMonth()],
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
     * Weekday name, using current {@link LOCALE} (e.g. `Mon`)
     */
    E: (d) => LOCALE.days[d.getDay()],
    /**
     * Zero-padded 2-digit ISO week number.
     */
    ww: (d) => Z2(FORMATTERS.w(d, false)),
    /**
     * Unpadded ISO week number.
     */
    w: (d) => String(weekInYear(d.getFullYear(), d.getMonth(), d.getDate())),
    /**
     * Unpadded quarter:
     *
     * - 1 = Jan - Mar
     * - 2 = Apr - Jun
     * - 3 = Jul - Sep
     * - 4 = Oct - Dec
     */
    q: (d) => String(((d.getMonth() / 3) | 0) + 1),
    /**
     * Zero-padded 2-digit hour of day (0-23)
     */
    HH: (d) => Z2(d.getHours()),
    /**
     * Unpadded our of day (0-23)
     */
    H: (d) => String(d.getHours()),
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
     * Zero-padded 3-digit millisecond of second
     */
    SS: (d) => Z3(d.getMilliseconds()),
    /**
     * Unpadded millisecond of second
     */
    S: (d) => String(d.getMilliseconds()),
    /**
     * 12-hour AM/PM marker (uppercase)
     */
    A: (d) => String(d.getHours() < 12 ? "AM" : "PM"),
    /**
     * 12-hour am/pm marker (lowercase)
     */
    a: (d) => String(d.getHours() < 12 ? "am" : "pm"),
    /**
     * Timezone offset in signed `HH:mm` format
     */
    Z: (d, utc = false) => {
        const z = utc ? 0 : d.getTimezoneOffset();
        const za = Math.abs(z);
        return `${z < 0 ? "+" : "-"}${Z2((za / 60) | 0)}:${Z2(za % 60)}`;
    },
    /**
     * Returns literal `"Z"` iff timezone offset is zero (UTC), else the same as
     * `Z` formatter.
     *
     * @param d
     */
    ZZ: (d, utc = false) => (utc ? "Z" : FORMATTERS.Z(d, utc)),
    /**
     * Current {@link LOCALE}'s day-month separator.
     */
    "/DM": () => LOCALE.sepDM,
    /**
     * Current {@link LOCALE}'s weekday-day separator.
     */
    "/ED": () => LOCALE.sepED,
    /**
     * Current {@link LOCALE}'s hour-minute separator.
     */
    "/HM": () => LOCALE.sepHM,
    /**
     * Current {@link LOCALE}'s month-year separator.
     */
    "/MY": () => LOCALE.sepMY,
};

/**
 * Returns a new date formatter for given array of format strings (or
 * functions). The returned function accepts timestamps (epoch), `Date` or
 * `DateTime` instances and accepts an optional boolean arg to output UTC
 * instead of local time (default).
 *
 * @remarks
 * See {@link FORMATTERS} for available date component format IDs. To escape a
 * formatter and use as a string literal, prefix the term with `\\`.
 *
 * @example
 * ```ts
 * const fmt = defFormat(["yyyy", "-", "MM", "-", "dd"]);
 *
 * fmt(new Date(2015, 3, 23))
 * // "2015-04-23"
 *
 * defFormat(["\\yyyy"])(new Date(2015, 3, 23))
 * // "yyyy"
 * ```
 *
 * @param fmt
 */
export const defFormat =
    (fmt: (string | FormatFn)[]) =>
    (x: MaybeDate, utc = false) => {
        let d = ensureDate(x);
        utc && (d = new Date(d.getTime() + d.getTimezoneOffset() * MINUTE));
        return fmt
            .map((x) => {
                let fn: FormatFn;
                return isString(x)
                    ? x.startsWith("\\")
                        ? x.substr(1)
                        : (fn = FORMATTERS[x])
                        ? fn(d, utc)
                        : x
                    : isFunction(x)
                    ? x(d, utc)
                    : x;
            })
            .join("");
    };

/**
 * Format preset, e.g. `2020-09-19`
 */
export const FMT_yyyyMMdd = defFormat(["yyyy", "-", "MM", "-", "dd"]);
/**
 * Format preset, e.g. `9/19/2020`
 */
export const FMT_Mdyyyy = defFormat(["M", "/", "d", "/", "yyyy"]);
/**
 * Format preset, e.g. `Sep 19 2020`. Uses current `LOCALE`, see
 * {@link setLocale}.
 */
export const FMT_MMMdyyyy = defFormat(["MMM", " ", "d", " ", "yyyy"]);
/**
 * Format preset, e.g. `19.9.2020`
 */
export const FMT_dMyyyy = defFormat(["d", "~", "M", "~", "yyyy"]);
/**
 * Format preset, e.g. `19 Sep 2020`
 */
export const FMT_dMMMyyyy = defFormat(["d", "~~", "MMM", " ", "yyyy"]);
/**
 * Format preset, e.g. `17:08`
 */
export const FMT_HHmm = defFormat(["HH", ":", "mm"]);
/**
 * Format preset, e.g. `5:08 PM`
 */
export const FMT_hm = defFormat(["h", ":", "mm", " ", "A"]);
/**
 * Format preset, e.g. `17:08:01`
 */
export const FMT_HHmmss = defFormat(["HH", ":", "mm", ":", "ss"]);
/**
 * Format preset, e.g. `5:08:01 PM`
 */
export const FMT_hms = defFormat(["h", ":", "mm", ":", "ss", " ", "A"]);
/**
 * Format preset, e.g. `20200919-170801`
 */
// prettier-ignore
export const FMT_yyyyMMdd_HHmmss = defFormat(
    ["yyyy", "MM", "dd", "-", "HH", "mm", "ss"]
);
/**
 * ISO8601 format preset (without millisecond term), e.g.
 * `2020-09-19T17:08:01Z`
 */
// prettier-ignore
export const FMT_ISO_SHORT = defFormat(
    ["yyyy", "-", "MM", "-", "dd", "T", "HH", ":", "mm", ":", "ss", "ZZ"]
);

/**
 * ISO8601 format preset (with millisecond term), e.g.
 * `2020-09-19T17:08:01.123Z`
 */
// prettier-ignore
export const FMT_ISO = defFormat(
    ["yyyy", "-", "MM", "-", "dd", "T", "HH", ":", "mm", ":", "ss", ".", "SS", "ZZ"]
);

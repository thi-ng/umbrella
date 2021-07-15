import {
    DAY,
    HOUR,
    LocaleUnit,
    MaybeDate,
    MINUTE,
    MONTH,
    Period,
    Precision,
    SECOND,
    YEAR,
} from "./api";
import { DateTime, dateTime, ensureDateTime } from "./datetime";
import { LOCALE } from "./i18n";
import { EN_LONG, EN_SHORT } from "./i18n/en";
import { ensureEpoch, idToPrecision, precisionToID } from "./utils";

/**
 * Takes a relative time `offset` string in plain english and an optional `base`
 * date (default: now). Parses `offset` and returns new date with relative
 * offset applied. Returns `undefined` if parsing failed.
 *
 * @remarks
 * This function only handles the parsing and input normalization aspect for
 * {@link relative}. The latter function applies the actual offset.
 *
 * The following input formats are supported:
 *
 * - `"tomorrow"` / `"yesterday"` - ±1 day
 * - any weekday names in {@link EN_SHORT} and {@link EN_LONG} (always in future)
 * - `<"-"|"+">?<num><period><" ago">?"` - ±num periods (if prefixed with "-" or
 *   if the `" ago"` suffix is given, the offset will be applied towards the
 *   past)
 *
 * (Note: If both negative offset and "ago" is given, the suffix will, like a
 * double-negative, flip the direction back towards the future).
 *
 * If using the latter form:
 *
 * - `<num>` can be a positve integer or strings: `"next "`, `"a "` or `"an "`
 * - `<period>` can be:
 *   - `ms` / `millis` / `millisecond` / `milliseconds`
 *   - `s` / `sec` / `secs` / `second` / `seconds`
 *   - `min` / `mins` / `minute` / `minutes`
 *   - `h` / `hour` / `hours`
 *   - `d` / `day` / `days`
 *   - `w` / `week` / `weeks`
 *   - `month` / `months`
 *   - `q` / `quarter` / `quarters`
 *   - `y` / `year` / `years`
 *
 * @param offset
 * @param base
 */
export const parseRelative = (offset: string, base?: MaybeDate) => {
    offset = offset.toLowerCase();
    const epoch = dateTime(base);
    switch (offset) {
        case "today":
            return epoch;
        case "tomorrow":
            epoch.incDay();
            return epoch;
        case "yesterday":
            epoch.decDay();
            return epoch;
        default: {
            let idx = findIndex(EN_SHORT.days, offset);
            if (idx < 0) {
                idx = findIndex(EN_LONG.days, offset);
            }
            if (idx >= 0) {
                do {
                    epoch.incDay();
                } while (epoch.toDate().getDay() != idx);
                return epoch;
            }
            const match =
                /^(an? |next |[-+]?\d+\s?)((ms|milli(?:(s?|seconds?)))|s(?:(ecs?|econds?))?|min(?:(s|utes?))?|h(?:ours?)?|d(?:ays?)?|w(?:eeks?)?|months?|q(?:uarters?)?|y(?:ears?)?)(\s+ago)?$/.exec(
                    offset
                );
            return match
                ? relative(
                      parseNum(match![1], !!match[7]),
                      parsePeriod(match![2]),
                      base
                  )
                : undefined;
        }
    }
};

const findIndex = (items: string[], x: string) =>
    items.findIndex((y) => y.toLowerCase() === x);

const parseNum = (x: string, past: boolean) =>
    (x === "next " || x === "a " || x === "an " ? 1 : Number(x)) *
    (past ? -1 : 1);

const parsePeriod = (x: string) => {
    x =
        x !== "s" && x !== "ms" && x.endsWith("s")
            ? x.substr(0, x.length - 1)
            : x;
    return <Period>{
            ms: "t",
            milli: "t",
            millisecond: "t",
            sec: "s",
            second: "s",
            min: "m",
            minute: "m",
            hour: "h",
            day: "d",
            week: "w",
            month: "M",
            quarter: "q",
            year: "y",
        }[x] || <Period>x;
};

/**
 * Applies the given relative offset (defined by `num` and `period`) to the
 * optionally given `base` date (default: now). If `num < 0` the result date
 * will be in the past (relative to `base`).
 *
 * @param num
 * @param period
 * @param base
 * @returns
 */
export const relative = (
    num: number,
    period: Period,
    base: MaybeDate = dateTime()
) => {
    if (period === "w") {
        num *= 7;
        period = "d";
    } else if (period === "q") {
        num *= 3;
        period = "M";
    }
    return dateTime(base).add(num, period);
};

/**
 * Returns the signed difference in milliseconds between given two dates `a` and
 * `b`.
 *
 * @param a
 * @param b
 */
export const difference = (a: MaybeDate, b: MaybeDate) =>
    ensureEpoch(a) - ensureEpoch(b);

export const decomposeDifference = (
    a: MaybeDate,
    b: MaybeDate = new Date()
) => {
    const dur = ensureEpoch(a) - ensureEpoch(b);
    let abs = Math.abs(dur);
    const milli = abs % SECOND;
    abs -= milli;
    const sec = abs % MINUTE;
    abs -= sec;
    const min = abs % HOUR;
    abs -= min;
    const hour = abs % DAY;
    abs -= hour;

    const parts = [
        Math.sign(dur),
        0,
        0,
        0,
        hour / HOUR,
        min / MINUTE,
        sec / SECOND,
        milli,
    ];

    if (!abs) return parts;

    const diff = (a: DateTime, b: DateTime): number => {
        const months = (b.y - a.y) * 12 + (b.M - a.M);
        const bstart = +a.add(months, "M");
        let frac = +b - bstart;
        frac /=
            frac < 0
                ? bstart - +a.add(months - 1, "M")
                : +a.add(months + 1, "M") - bstart;
        return -(months + frac) || 0;
    };

    const aa = ensureDateTime(a, "d");
    const bb = ensureDateTime(b, "d");
    const months = Math.abs(aa.d < bb.d ? -diff(bb, aa) : diff(aa, bb)) | 0;

    const days = (start: DateTime, end: DateTime) =>
        Math.abs(
            +start.withPrecision("d").add(months, "M") - +end.withPrecision("d")
        ) / DAY;

    parts[1] = (months / 12) | 0;
    parts[2] = months % 12;
    parts[3] = dur < 0 ? days(aa, bb) : days(bb, aa);

    return parts;
};

/**
 * Takes a `date` and optional reference `base` date and (also optional
 * `prec`ision). Computes the difference between given dates and returns it as
 * formatted string.
 *
 * @remarks
 * As with {@link parseRelative}, (currently) this function doesn't make use of
 * the active {@link LOCALE} and only outputs English phrases.
 *
 * @see {@link formatRelativeParts} for alternative output.
 *
 *
 * @example
 * ```ts
 * formatRelative("2020-06-01", "2021-07-01")
 * // "1 year ago"
 *
 * formatRelative("2020-08-01", "2021-07-01")
 * // "11 months ago"
 *
 * formatRelative("2021-07-01 13:45", "2021-07-01 12:05")
 * // "in 2 hours"
 *
 * formatRelative("2021-07-01 12:23:24", "2021-07-01 12:05")
 * // "in 18 minutes"
 * ```
 *
 * @param date
 * @param base
 * @param prec
 */
export const formatRelative = (
    date: MaybeDate,
    base: MaybeDate = new Date(),
    prec = 1
) => {
    const delta = difference(date, base);
    if (delta === 0) return LOCALE.now;

    let abs = Math.abs(delta);
    let units: Precision;
    if (abs < SECOND) {
        units = "t";
    } else if (abs < MINUTE) {
        abs /= SECOND;
        units = "s";
    } else if (abs < HOUR) {
        abs /= MINUTE;
        units = "m";
    } else if (abs < DAY) {
        abs /= HOUR;
        units = "h";
    } else if (abs < MONTH) {
        abs /= DAY;
        units = "d";
    } else if (abs < YEAR) {
        abs /= MONTH;
        units = "M";
    } else {
        abs /= YEAR;
        units = "y";
    }

    return tense(
        delta,
        unitString(LOCALE.units[units], Math.round(abs / prec) * prec)
    );
};

/**
 * Similar to {@link formatRelative}, however precision is specified as
 * {@link Precision} (default: seconds). The result will be formatted as a
 * string made up of parts of increasing precision (years, months, days, hours,
 * etc.). Only non-zero parts will be mentioned.
 *
 * @remarks
 * Uses {@link decomposeDifference} for given dates to extract parts for
 * formatting.
 *
 * @example
 * ```ts
 * // with default precision (seconds)
 * formatRelativeParts("2022-09-01 12:23:24", "2021-07-01 12:05")
 * // "in 1 year, 2 months, 21 hours, 18 minutes, 24 seconds"
 *
 * // with day precision
 * formatRelativeParts("2012-12-25 17:59", "2021-07-01 12:05", "d")
 * // "8 years, 6 months, 5 days ago"
 *
 * formatRelativeParts("2021-07-01 17:59", "2021-07-01 12:05", "d")
 * // "in less than a day"
 * ```
 *
 * @param date
 * @param base
 * @param prec
 */
export const formatRelativeParts = (
    date: MaybeDate,
    base: MaybeDate = Date.now(),
    prec: Precision = "s"
) => {
    const [sign, ...parts] = decomposeDifference(date, base);
    if (!sign) return LOCALE.now;
    const precID = precisionToID(prec);
    let maxID = precID;
    while (!parts[maxID] && maxID > 0) maxID--;
    let minID = parts.findIndex((x) => x > 0);
    minID < 0 && (minID = maxID);
    maxID = Math.min(Math.max(maxID, minID), precID);
    if (minID <= precID && precID < 6) {
        parts[maxID] = Math.round(
            parts[maxID] + parts[maxID + 1] / [12, 31, 24, 60, 60, 1000][maxID]
        );
    }
    const res = parts
        .slice(0, maxID + 1)
        .map((x, i) => {
            let unit = LOCALE.units[idToPrecision(i)];
            return x > 0
                ? unitString(unit, x)
                : i === maxID && maxID < 6
                ? `${LOCALE.less} 1 ${unit.s}`
                : "";
        })
        .filter((x) => !!x)
        .join(", ");
    return tense(sign, res);
};

const unitString = (unit: LocaleUnit, x: number) =>
    `${x} ${unit[x > 1 ? "p" : "s"]}`;

const tense = (sign: number, res: string) =>
    (sign < 0 ? LOCALE.past : LOCALE.future).replace("%s", res);

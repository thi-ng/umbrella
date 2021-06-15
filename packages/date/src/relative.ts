import type { Period } from "./api";
import { DateTime, dateTime } from "./datetime";
import { EN_LONG, EN_SHORT } from "./i18n/en";

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
 *   - `y` / `year` / `years`
 *
 * @param offset
 * @param base
 */
export const parseRelative = (
    offset: string,
    base?: DateTime | Date | number
) => {
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
                /^(an? |next |[-+]?\d+\s?)((ms|milli(?:(s?|seconds?)))|s(?:(ecs?|econds?))?|min(?:(s|utes?))?|h(?:ours?)?|d(?:ays?)?|w(?:eeks?)?|months?|y(?:ears?)?)(\s+ago)?$/.exec(
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
            year: "y",
        }[x] || <Period>x;
};

/**
 * Applies the given relative offset (defined by `num` and `period`) to the
 * optionally given `base` date (default: now). If `num < 0` the new date will
 * be in the past.
 *
 * @remarks
 * Note: This current implementation is O(n).
 *
 * @param num
 * @param period
 * @param base
 * @returns
 */
export const relative = (
    num: number,
    period: Period,
    base: DateTime | Date | number = Date.now()
) => {
    const op =
        (num > 0 ? "inc" : "dec") +
        (<const>{
            t: "Millisecond",
            s: "Second",
            m: "Minute",
            h: "Hour",
            d: "Day",
            w: "Week",
            M: "Month",
            y: "Year",
        })[period]!;
    const absNum = Math.abs(num);
    const epoch = dateTime(base);
    for (let i = 0; i < absNum; i++) {
        // @ts-ignore
        epoch[op]();
    }
    return epoch;
};

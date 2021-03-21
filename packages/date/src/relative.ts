import type { Period } from "./api";
import { DateTime, dateTime } from "./datetime";

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
 * - `"<num><period><" ago">?"` - ±num periods, if the `" ago"` suffix is given,
 *   the offset will be applied towards the past
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
    const epoch = dateTime(base);
    switch (offset) {
        case "tomorrow":
            epoch.incDay();
            return epoch;
        case "yesterday":
            epoch.decDay();
            return epoch;
        default: {
            const match = /^(an? |next |\d+\s?)((ms|milli(?:(s?|seconds?)))|s(?:(ecs?|econds?))?|min(?:(s|utes?))?|h(?:ours?)?|d(?:ays?)?|w(?:eeks?)?|months?|y(?:ears?)?)(\s+ago)?$/.exec(
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

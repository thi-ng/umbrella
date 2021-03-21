import { assert } from "@thi.ng/api";
import { DateTime, dateTime } from "./datetime";

/**
 * Takes a relative time `offset` string in plain english and an optional `base`
 * date (default: now). Parses `offset` and returns new date with relative
 * offset applied.
 *
 * @remarks
 * This function only handles the parsing and input normalization aspect for
 * {@link relative}. The latter function applies the actual offset.
 *
 * The following input formats are supported:
 *
 * - `"tomorrow"` / `"yesterday"` - ±1 day
 * - `"<num><period><" ago">?"` - ±num periods, if `ago` is given, the offset
 *   will be applied towards the past
 *
 * If using the latter form:
 *
 * - `<num>` can be an positive integer or the strings `"next "`, `"a "` or `"an
 *   "`
 * - `<period>` can be:
 *   - `s` / `sec` / `secs` / `second` / `seconds`
 *   - `min` / `mins` / `minute` / `minutes`
 *   - `h` / `hour` / `hours`
 *   - `d` / `day` / `days`
 *   - `m` / `month` / `months`
 *   - `y` / `year` / `years`
 *
 * @param offset
 * @param base
 */
export const parseRelative = (
    offset: string,
    base: DateTime | Date | number = Date.now()
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
            const match = /^(an? |next |\d+\s?)(s(?:(ecs?|onds?))?|min(?:(s|utes?))?|h(?:ours?)?|d(?:ays?)?|w(?:eeks?)?|m(?:onths?)?|y(?:ears?)?)(\s+ago)?$/.exec(
                offset
            );
            assert(!!match, `can't parse time offset string: '${offset}'`);
            console.log(match);
            const $num = match![1];
            const num =
                ($num === "next " || $num === "a " || $num === "an "
                    ? 1
                    : Number($num)) * (match![4] ? -1 : 1);
            let period = match![2];
            period =
                period !== "s" && period.endsWith("s")
                    ? period.substr(0, period.length - 1)
                    : period;
            period =
                (<const>{
                    s: "second",
                    sec: "second",
                    min: "minute",
                    h: "hour",
                    d: "day",
                    w: "week",
                    m: "month",
                    y: "year",
                })[period] || period;
            return relative(num, <any>period, base);
        }
    }
};

/**
 * Applies the given relative offset (defined by `num` and `period`) to the
 * optionally given `base` date (default: now). If `num < 0` the new date will
 * be in the past.
 *
 * @param num
 * @param period
 * @param base
 * @returns
 */
export const relative = (
    num: number,
    period: "second" | "minute" | "hour" | "day" | "week" | "month" | "year",
    base: DateTime | Date | number = Date.now()
) => {
    const op =
        (num > 0 ? "inc" : "dec") +
        (<const>{
            second: "Second",
            minute: "Minute",
            hour: "Hour",
            day: "Day",
            week: "Week",
            month: "Month",
            year: "Year",
        })[period]!;
    const epoch = dateTime(base);
    num = Math.abs(num);
    for (let i = 0; i < num; i++) {
        // @ts-ignore
        epoch[op]();
    }
    return epoch;
};

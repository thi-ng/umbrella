import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { DateTime, dateTime, parseRelative } from "../src/index.js";

const checkDate = (offset: string, base: DateTime, expected: number) => {
    const d = parseRelative(offset, base);
    assert.ok(!!d, `couldn't parse ${offset}`);
    assert.ok(
        d.equiv(expected),
        `no match (past): ${d.toISOString()} => ${dateTime(
            expected
        ).toISOString()} (${offset})`
    );
};

const check = (
    period: string[],
    ref: number,
    past: number,
    future: number,
    num = 5
) => {
    const base = dateTime(ref);
    for (let p of period) {
        checkDate(`-${num} ${p}`, base, past);
        checkDate(`-${num} ${p} ago`, base, future);
        checkDate(`${num} ${p} ago`, base, past);
        checkDate(`${num} ${p}`, base, future);
        checkDate(`+${num} ${p}`, base, future);
    }
};

group("relative", {
    parse: () => {
        const base = Date.UTC(2021, 0, 1);
        check(
            ["ms", "milli", "millis", "millisecond", "milliseconds"],
            base,
            Date.UTC(2020, 11, 31, 23, 59, 59, 995),
            Date.UTC(2021, 0, 1, 0, 0, 0, 5)
        );
        check(
            ["s", "sec", "secs", "second", "seconds"],
            base,
            Date.UTC(2020, 11, 31, 23, 59, 55),
            Date.UTC(2021, 0, 1, 0, 0, 5)
        );
        check(
            ["min", "mins", "minute", "minutes"],
            base,
            Date.UTC(2020, 11, 31, 23, 55),
            Date.UTC(2021, 0, 1, 0, 5)
        );
        check(
            ["h", "hour", "hours"],
            base,
            Date.UTC(2020, 11, 31, 19),
            Date.UTC(2021, 0, 1, 5)
        );
        check(
            ["d", "day", "days"],
            base,
            Date.UTC(2020, 11, 27),
            Date.UTC(2021, 0, 6)
        );
        check(
            ["w", "week", "weeks"],
            base,
            Date.UTC(2020, 10, 27),
            Date.UTC(2021, 1, 5)
        );
        check(
            ["mo", "month", "months"],
            base,
            Date.UTC(2020, 7, 1),
            Date.UTC(2021, 5, 1)
        );
        check(
            ["y", "year", "years"],
            base,
            Date.UTC(2016, 0, 1),
            Date.UTC(2026, 0, 1)
        );
    },

    "parse (weekday)": () => {
        const base = dateTime(Date.UTC(2021, 0, 1));
        checkDate("sat", base, Date.UTC(2021, 0, 2));
        checkDate("sunday", base, Date.UTC(2021, 0, 3));
        checkDate("thu", base, Date.UTC(2021, 0, 7));
        checkDate("friday", base, Date.UTC(2021, 0, 8));
        checkDate("today", base, Date.UTC(2021, 0, 1));
        checkDate("tomorrow", base, Date.UTC(2021, 0, 2));
        checkDate("yesterday", base, Date.UTC(2020, 11, 31));
    },
});

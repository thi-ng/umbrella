import * as assert from "assert";
import { dateTime, parseRelative } from "../src";

const check = (
    period: string[],
    ref: number,
    past: number,
    future: number,
    num = 5
) => {
    const base = dateTime(ref);
    for (let p of period) {
        let offset = `${num} ${p} ago`;
        let d = parseRelative(offset, base);
        assert(!!d, `couldn't parse ${offset}`);
        assert(
            d.equiv(past),
            `no match (past): ${d.toISOString()} => ${dateTime(
                past
            ).toISOString()} (${offset})`
        );
        offset = `${num} ${p}`;
        d = parseRelative(offset, base);
        assert(!!d, `couldn't parse ${offset}`);
        assert(
            d.equiv(future),
            `no match (future): ${d.toISOString()} => ${dateTime(
                future
            ).toISOString()} (${offset})`
        );
    }
};

describe("relative", () => {
    it("parse", () => {
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
            ["month", "months"],
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
    });
});

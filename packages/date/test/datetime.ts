import * as assert from "assert";
import { dateTime } from "../src";

describe("datetime", () => {
    it("leap years", () => {
        assert.deepStrictEqual(
            [1896, 1900, 1904, 1970, 1996, 1999, 2000, 2001, 2020, 2100].map(
                (y) => dateTime(new Date(y, 0, 2)).isLeapYear()
            ),
            [true, false, true, false, true, false, true, false, true, false]
        );
    });

    it("week number", () => {
        (<[string, number][]>[
            // start on mon & leap
            ["2024-01-01", 1],
            ["2024-03-03", 9],
            ["2024-03-04", 10],
            // start on tue
            ["2019-01-06", 1],
            ["2019-01-07", 2],
            // start on wed & leap year
            ["2020-01-01", 1],
            ["2020-03-01", 9],
            ["2020-03-02", 10],
            ["2020-12-31", 53],
            // start on thur
            ["2015-01-01", 1],
            ["2015-01-04", 1],
            ["2015-01-05", 2],
            // start on fri & prev. leap
            ["2021-01-01", 53],
            ["2021-01-03", 53],
            ["2021-01-04", 1],
            // start on sat
            ["2011-01-01", 52],
            ["2011-01-02", 52],
            ["2011-01-03", 1],
            // start on sun & leap
            ["2012-01-01", 52],
            ["2012-01-02", 1],
        ]).forEach(([date, week]) =>
            assert.strictEqual(
                dateTime(Date.parse(date)).weekInYear(),
                week,
                date
            )
        );
    });
});

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
});

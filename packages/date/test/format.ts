import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
    dateTime,
    DAY,
    defFormat,
    defTimecode,
    HOUR,
    MINUTE,
    SECOND,
} from "../src";

group("date", {
    formatters: () => {
        const d = dateTime(Date.UTC(2020, 8, 1, 2, 3, 4, 5));
        const d2 = dateTime(Date.UTC(1996, 11, 13, 14, 15, 16, 17));
        const check = (fmt: string[], res1: string, res2: string) => {
            assert.strictEqual(
                defFormat(fmt)(d, true),
                res1,
                `${fmt}: ${res1} (a)`
            );
            assert.strictEqual(
                defFormat(fmt)(d2, true),
                res2,
                `${fmt}: ${res2} (b)`
            );
        };
        check(["yy"], "20", "96");
        check(["yyyy"], "2020", "1996");
        check(["M"], "9", "12");
        check(["MM"], "09", "12");
        check(["MMM"], "Sep", "Dec");
        check(["d"], "1", "13");
        check(["dd"], "01", "13");
        check(["E"], "Tue", "Fri");
        check(["HH"], "02", "14");
        check(["h"], "2", "2");
        check(["A"], "AM", "PM");
        check(["m"], "3", "15");
        check(["mm"], "03", "15");
        check(["s"], "4", "16");
        check(["ss"], "04", "16");
        check(["S"], "5", "17");
        check(["yyyy", "-", "MM", "-", "dd"], "2020-09-01", "1996-12-13");
        assert.strictEqual(
            defFormat(["Z", "/", "ZZ"])(Date.UTC(2021, 0), true),
            "-00:00/Z"
        );
        assert.strictEqual(defFormat(["\\yyyy"])(0), "yyyy");
    },

    timecode: () => {
        assert.strictEqual(
            defTimecode(30)(HOUR + 2 * MINUTE + 3 * SECOND + (4 * 1000) / 30),
            "01:02:03:04"
        );
        assert.strictEqual(
            defTimecode(30)(4 * DAY + HOUR + 2 * MINUTE + 3 * SECOND + 999),
            "04:01:02:03:29"
        );
        assert.strictEqual(
            defTimecode(30, ["d ", "h ", "' ", '" '])(
                4 * DAY + HOUR + 2 * MINUTE + 3 * SECOND + 999
            ),
            "04d 01h 02' 03\" 29"
        );
    },
});

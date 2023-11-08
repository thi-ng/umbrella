import { expect, test } from "bun:test";
import {
	DAY,
	HOUR,
	MINUTE,
	SECOND,
	dateTime,
	defFormat,
	defTimecode,
	formatDuration,
} from "../src/index.js";

test("formatters", () => {
	const d = dateTime(Date.UTC(2020, 8, 1, 2, 3, 4, 5));
	const d2 = dateTime(Date.UTC(1996, 11, 13, 14, 15, 16, 17));
	const check = (fmt: string[], res1: string, res2: string) => {
		expect(defFormat(fmt)(d, true)).toBe(res1);
		expect(defFormat(fmt)(d2, true)).toBe(res2);
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
	expect(defFormat(["Z", "/", "ZZ"])(Date.UTC(2021, 0), true)).toBe(
		"-00:00/Z"
	);
	expect(defFormat(["\\yyyy"])(0)).toBe("yyyy");
});

test("timecode", () => {
	expect(
		defTimecode(30)(HOUR + 2 * MINUTE + 3 * SECOND + (4 * 1000) / 30)
	).toBe("01:02:03:04");
	expect(
		defTimecode(30)(4 * DAY + HOUR + 2 * MINUTE + 3 * SECOND + 999)
	).toBe("04:01:02:03:29");
	expect(
		defTimecode(30, ["d ", "h ", "' ", '" '])(
			4 * DAY + HOUR + 2 * MINUTE + 3 * SECOND + 999
		)
	).toBe("04d 01h 02' 03\" 29");
});

test("duration", () => {
	expect(formatDuration(98765)).toBe("1 min, 39 s");
	expect(formatDuration(98765, "t")).toBe("1 min, 38 s, 765 ms");
	expect(formatDuration(98765, "m")).toBe("2 min");
	expect(formatDuration(98765, "h")).toBe("< 1 h");
});

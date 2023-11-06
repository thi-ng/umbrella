import { expect, test } from "bun:test";
import { formatCSV, formatFloat, zeroPad } from "../src/index.js";

test("format array header", () =>
	expect([...formatCSV({ header: ["a", "b"] }, [[1, 2]])]).toEqual([
		"a,b",
		"1,2",
	]));

test("format array no header", () =>
	expect([...formatCSV({}, [[1, 2]])]).toEqual(["1,2"]));

test("format array tx", () =>
	expect([...formatCSV({ cols: [null, formatFloat(2)] }, [[1, 2]])]).toEqual([
		"1,2.00",
	]));

test("format obj header", () =>
	expect([...formatCSV({ header: ["a", "b"] }, [{ a: 1, b: 2 }])]).toEqual([
		"a,b",
		"1,2",
	]));

test("format obj no header", () =>
	expect([...formatCSV({}, [{ a: 1, b: 2 }])]).toEqual(["a,b", "1,2"]));

test("format obj tx", () =>
	expect([
		...formatCSV({ cols: { a: zeroPad(4), b: formatFloat(2) } }, [
			{ a: 1, b: 2 },
		]),
	]).toEqual(["a,b", "0001,2.00"]));

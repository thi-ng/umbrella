import { identity } from "@thi.ng/api";
import { compare, reverse } from "@thi.ng/compare";
import { expect, test } from "bun:test";
import { sortByCachedKey } from "../src/index.js";

test("sortCached key fn", () => {
	expect(sortByCachedKey(["a", "bbbb", "ccc", "dd"], (x) => x)).toEqual([
		"a",
		"bbbb",
		"ccc",
		"dd",
	]);
	expect(
		sortByCachedKey(["a", "bbbb", "ccc", "dd"], identity, reverse(compare))
	).toEqual(["dd", "ccc", "bbbb", "a"]);
	expect(
		sortByCachedKey(
			["a", "bbbb", "ccc", "dd"],
			(x) => x.length,
			(a, b) => b - a
		)
	).toEqual(["bbbb", "ccc", "dd", "a"]);
});

test("sortCached key array", () => {
	expect(sortByCachedKey(["a", "b", "c", "d"], [3, 2, 1, 0])).toEqual([
		"d",
		"c",
		"b",
		"a",
	]);
});

test("sortCached wrong key length", () =>
	expect(() => sortByCachedKey(["a", "b", "c", "d"], [])).toThrow());

import { expect, test } from "bun:test";
import {
	absSkew,
	compare,
	inc,
	merge,
	remove,
	signedSkew,
	type VClock,
} from "../src/index.js";

test("inc", () => {
	expect(inc({ b: 2 }, "a")).toEqual({ a: 1, b: 2 });
	expect(inc({ a: 1, b: 3 }, "a")).toEqual({ a: 2, b: 3 });
});

test("remove", () => {
	const x: VClock = { b: 2 };
	expect(remove(x, "a")).toBe(x);
	expect(remove({ a: 1, b: 3 }, "a")).toEqual({ b: 3 });
});

test("compare", () => {
	expect(compare({ a: 1, b: 2 }, { a: 3, b: 2 })).toBe(-1);
	expect(compare({ a: 3, b: 2 }, { a: 3, b: 2 })).toBe(0);
	expect(compare({ a: 3, b: 2 }, { a: 2, b: 3 })).toBe(0);
	expect(compare({ a: 3, b: 3 }, { a: 3, b: 2 })).toBe(1);
	expect(compare({}, { a: 1 })).toBe(-1);
	expect(compare({}, {})).toBe(0);
	expect(compare({ a: 1 }, {})).toBe(1);
});

test("merge", () => {
	expect(merge({}, {})).toEqual({});
	expect(merge({ a: 1 }, {})).toEqual({ a: 1 });
	expect(merge({}, { a: 1 })).toEqual({ a: 1 });
	expect(merge({ a: 1, b: 2, c: 4 }, { a: 3, b: 2 })).toEqual({
		a: 3,
		b: 2,
		c: 4,
	});
});

test("skew", () => {
	expect(signedSkew({}, {})).toBe(0);
	expect(signedSkew({ a: 1 }, {})).toBe(1);
	expect(signedSkew({}, { a: 1 })).toBe(-1);
	expect(signedSkew({ a: 1, b: 4, c: 2 }, { a: 2, c: 20 })).toBe(-18);
	expect(absSkew({ a: 1, b: 4, c: 2 }, { a: 2, c: 20 })).toBe(18);
});

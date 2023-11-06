import { equiv } from "@thi.ng/equiv";
import { expect, test } from "bun:test";
import { ArraySet, difference } from "../src/index.js";

test("native (numbers)", () => {
	const a = new Set([1, 2, 3, 4]);
	const b = new Set([3, 4, 5]);
	expect(difference(a, b)).toEqual(new Set([1, 2]));
});

test("array (numbers)", () => {
	const a = new ArraySet([1, 2, 3, 4]);
	const b = new ArraySet([3, 4, 5]);
	expect(difference(a, b)).toEqual(new ArraySet([1, 2]));
});

test("native (obj)", () => {
	const a = new Set([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
	const b = new Set([{ a: 3 }, { a: 4 }, { a: 5 }]);
	const d = difference(a, b);
	expect(d.size).toBe(4); // verifies that it doesn't work w/ native sets!
	expect(d).toEqual(a);
	expect(d !== a).toBeTrue();
	expect(d !== b).toBeTrue();
});

test("array (obj)", () => {
	const a = new ArraySet([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
	const b = new ArraySet([{ a: 3 }, { a: 4 }, { a: 5 }]);
	const d = difference(a, b);
	expect(d.size).toBe(2);
	expect(equiv(d, new ArraySet([{ a: 1 }, { a: 2 }])));
	expect(d !== a).toBeTrue();
	expect(d !== b).toBeTrue();
});

test("w/ out", () => {
	expect(
		difference(new Set([1, 2, 3]), new Set([2, 4]), new Set([5]))
	).toEqual(new Set([1, 3, 5]));
});

test("same", () => {
	const a = new Set([1]);
	expect(difference(a, a)).toEqual(new Set());
});

import { expect, test } from "bun:test";
import { ArraySet, intersection } from "../src/index.js";

test("native (numbers)", () => {
	const a = new Set([1, 2, 3, 4]);
	const b = new Set([3, 4, 5, 6]);
	expect(intersection(a, b)).toEqual(new Set([3, 4]));
});

test("array (numbers)", () => {
	const a = new ArraySet([1, 2, 3, 4]);
	const b = new ArraySet([3, 4, 5, 6]);
	expect(intersection(a, b)).toEqual(new ArraySet([3, 4]));
});

test("native (obj)", () => {
	const a = new Set([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
	const b = new Set([{ a: 3 }, { a: 4 }, { a: 5 }]);
	const i = intersection(a, b);
	expect(i).toEqual(new Set()); // verifies that it doesn't work w/ native sets!
	expect(i !== a).toBeTrue();
	expect(i !== b).toBeTrue();
});

test("array (obj)", () => {
	const a = new ArraySet([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
	const b = new ArraySet([{ a: 3 }, { a: 4 }, { a: 5 }]);
	const i = intersection(a, b);
	expect(i).toEqual(new ArraySet([{ a: 3 }, { a: 4 }]));
});

test("w/ out", () => {
	expect(
		intersection(new Set([1, 2, 3]), new Set([2, 4]), new Set([5]))
	).toEqual(new Set([2, 5]));
});

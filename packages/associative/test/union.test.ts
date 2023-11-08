import { expect, test } from "bun:test";
import { ArraySet, union } from "../src/index.js";

test("native (numbers)", () => {
	const a = new Set([1, 2, 3, 4]);
	const b = new Set([3, 4, 5, 6]);
	expect(union(a, b)).toEqual(new Set([1, 2, 3, 4, 5, 6]));
});

test("equiv (numbers)", () => {
	const a = new ArraySet([1, 2, 3, 4]);
	const b = new ArraySet([3, 4, 5, 6]);
	expect(union(a, b)).toEqual(new ArraySet([1, 2, 3, 4, 5, 6]));
});

test("native (obj)", () => {
	const a = new Set([{ a: 1 }, { a: 2 }]);
	const b = new Set([{ a: 2 }, { a: 3 }]);
	const u = union(a, b);
	expect(u.size).toBe(4);
	expect(u).toEqual(new Set([{ a: 1 }, { a: 2 }, { a: 2 }, { a: 3 }]));
	expect(u !== a).toBeTrue();
	expect(u !== b).toBeTrue();
});

test("equiv (obj)", () => {
	const a = new ArraySet([{ a: 1 }, { a: 2 }]);
	const b = new ArraySet([{ a: 2 }, { a: 3 }]);
	const u = union(a, b);
	expect(u.size).toBe(3);
	expect(u).toEqual(new ArraySet([{ a: 1 }, { a: 2 }, { a: 3 }]));
	expect(u !== a).toBeTrue();
	expect(u !== b).toBeTrue();
});

test("w/ out", () => {
	expect(union(new Set([1, 2, 3]), new Set([2, 4]), new Set([5]))).toEqual(
		new Set([1, 2, 3, 4, 5])
	);
});

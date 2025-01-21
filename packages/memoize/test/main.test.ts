// SPDX-License-Identifier: Apache-2.0
import { EquivMap } from "@thi.ng/associative";
import { LRUCache } from "@thi.ng/cache";
import { expect, test } from "bun:test";
import { memoize1, memoizeO } from "../src/index.js";

test("memoize1", () => {
	const calls: number[] = [];
	const f = memoize1<number, number>((x) => (calls.push(x), x * 10));
	expect(f(1)).toBe(10);
	expect(f(2)).toBe(20);
	expect(f(2)).toBe(20);
	expect(f(1)).toBe(10);
	expect(f(3)).toBe(30);
	expect(calls).toEqual([1, 2, 3]);
});

test("memoizeO", () => {
	const calls: number[] = [];
	const f = memoizeO((x: number) => (calls.push(x), x * 10));
	expect(f(1)).toBe(10);
	expect(f(2)).toBe(20);
	expect(f(2)).toBe(20);
	expect(f(1)).toBe(10);
	expect(f(3)).toBe(30);
	expect(calls).toEqual([1, 2, 3]);
});

test("memoize2O", () => {
	const calls: number[][] = [];
	const cache: Record<string, number> = {};
	const f = memoizeO(
		(a: number, b: number) => (calls.push([a, b]), a * b),
		cache
	);
	expect(f(1, 2)).toBe(2);
	expect(f(1, 2)).toBe(2);
	expect(f(2, 3)).toBe(6);
	expect(f(2, 1)).toBe(2);
	expect(calls).toEqual([
		[1, 2],
		[2, 3],
		[2, 1],
	]);
	expect(cache).toEqual({
		"1-2": 2,
		"2-1": 2,
		"2-3": 6,
	});
});

test("memoize1 (equivmap)", () => {
	const calls: number[][] = [];
	const f = memoize1<number[], number>(
		(x) => (calls.push(x), x[0] + x[1]),
		new EquivMap()
	);
	expect(f([1, 2])).toBe(3);
	expect(f([3, 4])).toBe(7);
	expect(f([3, 4])).toBe(7);
	expect(f([1, 2])).toBe(3);
	expect(f([5, 6])).toBe(11);
	expect(calls).toEqual([
		[1, 2],
		[3, 4],
		[5, 6],
	]);
});

test("memoize1 (lru)", () => {
	const calls: number[][] = [];
	const cache = new LRUCache<number[], number>(null, {
		maxlen: 3,
		map: () => new EquivMap(),
	});
	const f = memoize1<number[], number>(
		(x) => (calls.push(x), x[0] + x[1]),
		cache
	);
	expect(f([1, 2])).toBe(3);
	expect(f([3, 4])).toBe(7);
	expect(f([3, 4])).toBe(7);
	expect(f([1, 2])).toBe(3);
	expect(f([5, 6])).toBe(11);
	expect(f([7, 8])).toBe(15);
	expect(f([3, 4])).toBe(7); // <-- recompute
	expect(calls).toEqual([
		[1, 2],
		[3, 4],
		[5, 6],
		[7, 8],
		[3, 4],
	]);
	expect([...cache.keys()]).toEqual([
		[5, 6],
		[7, 8],
		[3, 4],
	]);
});

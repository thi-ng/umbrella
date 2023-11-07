import { EquivMap } from "@thi.ng/associative";
import { LRUCache } from "@thi.ng/cache";
import { expect, test } from "bun:test";
import { memoize1 } from "../src/index.js";

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
	const cache = new LRUCache(null, {
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

import { expect, test } from "bun:test";
import { rseq } from "../src/index.js";

test("basics", () => {
	expect<any>(rseq(null)).toBe(undefined);
	expect<any>(rseq([])).toBe(undefined);
	expect<any>(rseq([1])!.first()).toBe(1);
	expect<any>(rseq([1])!.next()).toBe(undefined);
	expect<any>(rseq([1, 2])!.first()).toBe(2);
	expect<any>(rseq([1, 2])!.next()!.first()).toBe(1);
	expect<any>(rseq([1, 2])!.next()!.next()).toBe(undefined);
	expect<any>(rseq([1, 2, 3])!.next()!.next()!.first()).toBe(1);
});

test("range", () => {
	expect<any>(rseq([0, 1, 2, 3], 2, 2)).toBe(undefined);
	expect<any>(rseq([0, 1, 2, 3], 2, 3)).toBe(undefined);
	expect<any>(rseq([0, 1, 2, 3], 3, 1)!.first()).toBe(3);
	expect<any>(rseq([0, 1, 2, 3], 3, 1)!.next()!.first()).toBe(2);
	expect<any>(rseq([0, 1, 2, 3], 3, 1)!.next()!.next()).toBe(undefined);
});

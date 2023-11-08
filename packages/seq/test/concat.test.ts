import { expect, test } from "bun:test";
import { aseq, concat, concatA, iterator, rseq } from "../src/index.js";

test("concat", () => {
	expect(concat(null)).toBeUndefined();
	expect(concat(aseq([]))).toBeUndefined();
	expect([...iterator(concat(aseq([]), null, undefined))]).toEqual([]);
	expect<any>([...iterator(concat(aseq([null])))]).toEqual([null]);
	expect<any>([...iterator(concat(aseq([undefined])))]).toEqual([undefined]);
	expect([
		...iterator(
			concat(aseq([]), aseq([1, 2, 3]), null, rseq([1, 2, 3]), undefined)
		),
	]).toEqual([1, 2, 3, 3, 2, 1]);
});

test("concatA", () => {
	expect(concatA(null, undefined, [])).toBeUndefined();
	expect<any>([...iterator(concatA([null]))]).toEqual([null]);
	expect<any>([...iterator(concatA([undefined]))]).toEqual([undefined]);
	expect([...iterator(concatA("abc"))]).toEqual(["a", "b", "c"]);
	expect([
		...iterator(concatA([], [1, 2, 3], null, [3, 2, 1], undefined)),
	]).toEqual([1, 2, 3, 3, 2, 1]);
});

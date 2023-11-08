import { expect, test } from "bun:test";
import { SparseVec } from "../src/index.js";

test("fromDense", () => {
	const a = SparseVec.fromDense([0, 1, 1, 0, 1, 1, 0, 0]);
	expect(a.m).toBe(8);
	expect(a.data).toEqual([1, 1, 2, 1, 4, 1, 5, 1]);
	const b = SparseVec.fromDense([2, 0, 2, 0, 0, 0, 0, 2]);
	expect(b.m).toBe(8);
	expect(b.data).toEqual([0, 2, 2, 2, 7, 2]);
});

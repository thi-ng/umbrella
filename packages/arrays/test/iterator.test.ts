import { expect, test } from "bun:test";
import { arrayIterator } from "../src/index.js";

test("arrayIterator", () => {
	expect([...arrayIterator(null)]).toEqual([]);
	expect([...arrayIterator([])]).toEqual([]);
	expect([...arrayIterator([1])]).toEqual([1]);
	expect([...arrayIterator([1, 2, 3, 4], 2)]).toEqual([3, 4]);
	expect([...arrayIterator([1, 2, 3, 4], 2, 3)]).toEqual([3]);
	expect([...arrayIterator([1, 2, 3, 4], 3, -1)]).toEqual([4, 3, 2, 1]);
});

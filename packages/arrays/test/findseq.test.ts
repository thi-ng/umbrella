import { expect, test } from "bun:test";
import { findSequence } from "../src/index.js";

test("findSequence basic", () => {
	expect(findSequence([1, 2, 3], [1, 2, 3])).toBe(0);
	expect(findSequence([1, 1, 1, 2, 3, 4], [1, 2, 3])).toBe(2);
	expect(findSequence([1, 1, 1, 2, 3, 4], [1, 2, 3, 4])).toBe(2);
	expect(findSequence([1, 1, 1, 2, 3, 4], [1, 2, 3, 4, 5])).toBe(-1);
	expect(findSequence([1, 1, 1, 2, 3, 4], [1, 1, 2, 3, 4])).toBe(1);
	expect(findSequence([1, 2, 3], [1, 2, 3, 4])).toBe(-1);
});

test("findSequence rep", () => {
	expect(findSequence([1, 2, 3, 1, 2, 3, 4], [1, 2, 3, 4])).toBe(3);
	expect(findSequence([1, 2, 3, 1, 2, 3, 4, 1, 2, 3], [1, 2, 3], 1)).toBe(3);
	expect(findSequence([1, 2, 3, 1, 2, 3, 4, 1, 2, 3], [1, 2, 3], 3)).toBe(3);
	expect(findSequence([1, 2, 3, 1, 2, 3, 4, 1, 2, 3], [1, 2, 3], 4)).toBe(7);
});

test("findSequence empty", () => {
	expect(findSequence([1, 2, 3, 1, 2, 3, 4], [])).toBe(-1);
});

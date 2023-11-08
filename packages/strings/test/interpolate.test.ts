import { expect, test } from "bun:test";
import { interpolateKeys } from "../src/index.js";

test("basic", () => {
	expect(interpolateKeys("{a0}{b.b}{_c}", { a0: 1, "b.b": 2, _c: 3 })).toBe(
		"123"
	);
});

test("invalid key", () => {
	expect(() => interpolateKeys("{a}", {})).toThrow();
});

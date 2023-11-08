import { expect, test } from "bun:test";
import { keyPermutations } from "../src/index.js";

test("basic", () => {
	expect(
		new Set([
			...keyPermutations({
				a: [1, 2],
				b: [true, false],
				c: ["X", "Y"],
			}),
		])
	).toEqual(
		new Set([
			{ a: 1, b: true, c: "X" },
			{ a: 1, b: true, c: "Y" },
			{ a: 1, b: false, c: "X" },
			{ a: 1, b: false, c: "Y" },
			{ a: 2, b: true, c: "X" },
			{ a: 2, b: true, c: "Y" },
			{ a: 2, b: false, c: "X" },
			{ a: 2, b: false, c: "Y" },
		])
	);
});

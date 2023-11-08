import { expect, test } from "bun:test";
import { reduce, reductions } from "@thi.ng/transducers";
import { patchArray, patchObj } from "../src/index.js";

test("patchArray", () => {
	expect(
		reduce(
			reductions(patchArray<number>()),
			[[1, 2, 3]],
			[
				["insert", 0, [10, 11]],
				["update", 1, (x, n) => x * n, 10],
				["delete", 3],
				["set", 2, 200],
			]
		)
	).toEqual([
		[1, 2, 3],
		[10, 11, 1, 2, 3],
		[10, 110, 1, 2, 3],
		[10, 110, 1, 3],
		[10, 110, 200, 3],
	]);
});

test("patchObj", () => {
	expect(
		reduce(
			reductions(patchObj()),
			[{ x: 23 }],
			[
				["set", ["a", "b"], 1],
				["update", "a.b", (x, n) => x + n, 10],
				["delete", "x"],
			]
		)
	).toEqual([
		{ x: 23 },
		{ x: 23, a: { b: 1 } },
		{ x: 23, a: { b: 11 } },
		{ a: { b: 11 } },
	]);
});

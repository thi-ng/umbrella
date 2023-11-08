import { expect, test } from "bun:test";
import { renameTransformedKeys } from "../src/index.js";

test("renameTransformedKeys", () => {
	expect(
		renameTransformedKeys(
			{ a: 1, b: 2, c: null },
			{
				a: "aa",
				b: ["bb", (x, src) => x * 10 + src.a],
				c: "cc",
			}
		)
	).toEqual({ aa: 1, bb: 21 });
	expect(renameTransformedKeys(null, { a: "aa" })).toEqual({});
});

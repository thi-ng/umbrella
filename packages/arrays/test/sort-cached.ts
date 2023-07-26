import { identity } from "@thi.ng/api";
import { compare, reverse } from "@thi.ng/compare";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { sortByCachedKey } from "../src/index.js";

group("sortCached", {
	"key fn": () => {
		assert.deepStrictEqual(
			sortByCachedKey(["a", "bbbb", "ccc", "dd"], (x) => x),
			["a", "bbbb", "ccc", "dd"]
		);
		assert.deepStrictEqual(
			sortByCachedKey(
				["a", "bbbb", "ccc", "dd"],
				identity,
				reverse(compare)
			),
			["dd", "ccc", "bbbb", "a"]
		);
		assert.deepStrictEqual(
			sortByCachedKey(
				["a", "bbbb", "ccc", "dd"],
				(x) => x.length,
				(a, b) => b - a
			),
			["bbbb", "ccc", "dd", "a"]
		);
	},

	"key array": () => {
		assert.deepStrictEqual(
			sortByCachedKey(["a", "b", "c", "d"], [3, 2, 1, 0]),
			["d", "c", "b", "a"]
		);
	},

	"wrong key length": () =>
		assert.throws(() => sortByCachedKey(["a", "b", "c", "d"], [])),
});

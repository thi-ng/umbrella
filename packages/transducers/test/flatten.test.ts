import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { flatten, range } from "../src/index.js";

group("flatten", {
	"empty arrays": () => {
		assert.deepStrictEqual([...flatten([])], []);
		assert.deepStrictEqual([...flatten([[], []])], []);
	},

	arrays: () => {
		assert.deepStrictEqual([...flatten([undefined])], [undefined]);
		assert.deepStrictEqual(
			[...flatten([[undefined], null])],
			[undefined, null]
		);
	},

	strings: () => {
		assert.deepStrictEqual([...flatten(["", "a"])], ["", "a"]);
		assert.deepStrictEqual([...flatten([[], ["a"], ""])], ["a", ""]);
	},

	"strings (atomic)": () => {
		assert.deepStrictEqual([...flatten([["abc"]])], ["abc"]);
		assert.deepStrictEqual([...flatten(["abc"])], ["abc"]);
		assert.deepStrictEqual([...flatten("abc")], ["abc"]);
		assert.deepStrictEqual([...flatten([""])], [""]);
		assert.deepStrictEqual([...flatten("")], [""]);
	},

	iterators: () => {
		assert.deepStrictEqual([...flatten(range(0))], []);
		assert.deepStrictEqual([...flatten([range(0)])], []);
		assert.deepStrictEqual([...flatten([range(2), range(0)])], [0, 1]);
	},
});

import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { ArraySet, intersection } from "../src/index.js";

group("intersection", {
	"native (numbers)": () => {
		const a = new Set([1, 2, 3, 4]);
		const b = new Set([3, 4, 5, 6]);
		assert.deepStrictEqual(intersection(a, b), new Set([3, 4]));
	},

	"array (numbers)": () => {
		const a = new ArraySet([1, 2, 3, 4]);
		const b = new ArraySet([3, 4, 5, 6]);
		assert.deepStrictEqual(intersection(a, b), new ArraySet([3, 4]));
	},

	"native (obj)": () => {
		const a = new Set([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
		const b = new Set([{ a: 3 }, { a: 4 }, { a: 5 }]);
		const i = intersection(a, b);
		assert.deepStrictEqual(i, new Set()); // verifies that it doesn't work w/ native sets!
		assert.notStrictEqual(i, a);
		assert.notStrictEqual(i, b);
	},

	"array (obj)": () => {
		const a = new ArraySet([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }]);
		const b = new ArraySet([{ a: 3 }, { a: 4 }, { a: 5 }]);
		const i = intersection(a, b);
		assert.deepStrictEqual(i, new ArraySet([{ a: 3 }, { a: 4 }]));
	},

	"w/ out": () => {
		assert.deepStrictEqual(
			intersection(new Set([1, 2, 3]), new Set([2, 4]), new Set([5])),
			new Set([2, 5])
		);
	},
});

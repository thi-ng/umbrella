import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { aseq, concat, concatA, iterator, rseq } from "../src/index.js";

group("concat / iterator", {
	concat: () => {
		assert.strictEqual(concat(null), undefined);
		assert.strictEqual(concat(aseq([])), undefined);
		assert.deepStrictEqual(
			[...iterator(concat(aseq([]), null, undefined))],
			[]
		);
		assert.deepStrictEqual([...iterator(concat(aseq([null])))], [null]);
		assert.deepStrictEqual(
			[...iterator(concat(aseq([undefined])))],
			[undefined]
		);
		assert.deepStrictEqual(
			[
				...iterator(
					concat(
						aseq([]),
						aseq([1, 2, 3]),
						null,
						rseq([1, 2, 3]),
						undefined
					)
				),
			],
			[1, 2, 3, 3, 2, 1]
		);
	},

	concatA: () => {
		assert.strictEqual(concatA(null, undefined, []), undefined);
		assert.deepStrictEqual([...iterator(concatA([null]))], [null]);
		assert.deepStrictEqual(
			[...iterator(concatA([undefined]))],
			[undefined]
		);
		assert.deepStrictEqual([...iterator(concatA("abc"))], ["a", "b", "c"]);
		assert.deepStrictEqual(
			[...iterator(concatA([], [1, 2, 3], null, [3, 2, 1], undefined))],
			[1, 2, 3, 3, 2, 1]
		);
	},
});

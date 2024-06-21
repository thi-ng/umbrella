import type { Fn, Fn0, IObjectOf } from "@thi.ng/api";
import type { Reducer } from "./api.js";
import { groupByObj } from "./group-by-obj.js";
import { push } from "./push.js";

/** @internal */
const __branchPred =
	<T>(key: Fn<T, number>, b: number, l: PropertyKey, r: PropertyKey) =>
	(x: T) =>
		key(x) & b ? r : l;

/**
 * Creates a bottom-up, unbalanced binary tree of desired depth and choice of
 * data structures. Any value can be indexed, as long as a numeric
 * representation (key) can be obtained. This numeric key is produced by the
 * supplied `key` function. IMPORTANT: the returned values MUST be unsigned and
 * less than the provided bit length (i.e. in the `[0,2**bits)` interval).
 *
 * By default the tree is constructed using plain objects for branches, with
 * left branches stored as "l" and right ones as "r". The original values are
 * stored at the lowest tree level using a customizable nested reducer. By
 * default leaves are collected in arrays (using the {@link push} reducer), but
 * any suitable reducer can be used (e.g. {@link conj} to collect values into
 * sets).
 *
 * Index by lowest 4-bits of ID value:
 *
 * @example
 * ```ts tangle:../export/group-binary.ts
 * import { groupBinary, reduce } from "@thi.ng/transducers";
 *
 * const tree = reduce(
 *   groupBinary<{ id: number }>(4, x => x.id & 0xf),
 *   [{ id: 3 }, { id: 8 }, { id: 15 }, { id: 0 }]
 * );
 *
 * console.log(tree.l.l.l.l);
 * // [ { id: 0 } ]
 *
 * console.log(tree.r.r.r.r);
 * // [ { id: 15 } ]
 *
 * console.log(tree.l.l.r.r);
 * // [ { id: 3 } ]
 * ```
 *
 * Collecting as array:
 *
 * @example
 * ```ts tangle:../export/group-binary-2.ts
 * import { groupBinary, reduce } from "@thi.ng/transducers";
 *
 * const tree = reduce(
 *   groupBinary<number>(4, (x) => x, undefined, undefined, 0, 1),
 *   [1, 2, 3, 4, 5, 6, 7]
 * );
 *
 * console.log(tree[0][1][0][1]); // 0101 == 5 in binary
 * // [ 5 ]
 *
 * console.log(tree[0][1][1]);    // 011* == branch
 * // [ [ 6 ], [ 7 ] ]
 * ```
 *
 * Using {@link frequencies} as leaf reducer:
 *
 * @example
 * ```ts tangle:../export/group-binary-3.ts
 * import { frequencies, groupBinary, reduce } from "@thi.ng/transducers";
 *
 * const tree = reduce(
 *   groupBinary<string>(3, (x) => x.length, undefined, frequencies()),
 *   "aa bbb dddd ccccc bbb eeee fff".split(" ")
 * );
 *
 * console.log(tree);
 * // {
 * //   l: {
 * //     r: {
 * //       l: Map(1) { "aa": 1 },
 * //       r: Map(2) { "bbb": 2, "fff": 1 },
 * //     },
 * //   },
 * //   r: {
 * //     l: {
 * //       l: Map(2) { "dddd": 1, "eeee": 1 },
 * //       r: Map(1) { "ccccc": 1 },
 * //     },
 * //   },
 * // }
 * ```
 *
 * @param bits - index range (always from 0)
 * @param key - key function
 * @param branch - function to create a new branch container (object or array)
 * @param leaf - reducer for leaf collection
 * @param left - key for storing left branches (e.g. `0` for arrays)
 * @param right - key for storing right branches (e.g. `1` for arrays)
 */
export const groupBinary = <T>(
	bits: number,
	key: Fn<T, number>,
	branch?: Fn0<IObjectOf<T[]>>,
	leaf?: Reducer<T, any>,
	left: PropertyKey = "l",
	right: PropertyKey = "r"
): Reducer<T, any> => {
	const init = branch || (() => ({}));
	let rfn: Reducer<T, any> = groupByObj({
		key: __branchPred(key, 1, left, right),
		group: leaf || push(),
	});
	for (let i = 2, maxIndex = 1 << bits; i < maxIndex; i <<= 1) {
		rfn = groupByObj({
			key: __branchPred(key, i, left, right),
			group: [init, rfn[1], rfn[2]],
		});
	}
	return [init, rfn[1], rfn[2]];
};

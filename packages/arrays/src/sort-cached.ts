import type { Comparator, Fn } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import { compare } from "@thi.ng/compare/compare";
import { assert } from "@thi.ng/errors/assert";
import { quickSort } from "./quicksort.js";
import { multiSwap } from "./swap.js";

/**
 * Takes a `src` array and `key` array of function to provide the sort key of
 * each item. If a function, it will be first applied to pre-compute a new array
 * of all sort keys. Then uses {@link quickSort} to sort `src` array, based on
 * the ordering of cached keys and the optionally given comparator. Returns
 * `src`.
 *
 * @remarks
 * This function is primarily intended for use cases where an array needs to be
 * sorted based on the item order of another array, or where sort keys are
 * derived from non-trivial computations and need to be cached, rather than be
 * re-evaluated multiple times from within a comparator.
 *
 * @example
 * ```ts tangle:../export/sort-cached.ts
 * import { sortByCachedKey } from "@thi.ng/arrays";
 *
 * // sort by length in descending order
 * console.log(
 *   sortByCachedKey(["a","bbbb","ccc","dd"], (x) => x.length, (a, b) => b - a)
 * );
 * // [ 'bbbb', 'ccc', 'dd', 'a' ]
 *
 * console.log(
 *   sortByCachedKey(["a", "b", "c", "d"], [3, 2, 1, 0])
 * );
 * // [ 'd', 'c', 'b', 'a' ]
 * ```
 *
 * @param src -
 * @param key -
 * @param cmp -
 */
export const sortByCachedKey = <T, K>(
	src: T[],
	key: K[] | Fn<T, K>,
	cmp: Comparator<K> = compare
) => {
	const keys = isFunction(key) ? src.map(key) : key;
	assert(keys.length === src.length, `keys.length != src.length`);
	quickSort(keys, cmp, multiSwap(src));
	return src;
};

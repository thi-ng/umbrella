import type { Predicate } from "@thi.ng/api";

/**
 * Similar to JS native `filter()`, but for filtering multiple arrays at once.
 * All arrays are assumed to have the same length as the first. Applies given
 * predicate `pred` to first array ONLY. If predicate is truthy for the current
 * index, the values for that index in all arrays will be copied to their
 * filtered results. Function returns result arrays as tuple.
 *
 * @example
 * ```ts tangle:../export/filter-all.ts
 * import { filterAll } from "@thi.ng/arrays";
 *
 * const [a, b, c] = filterAll(
 *   (x) => x==="a",
 *   // the predicate is applied to this array
 *   ["a", "b", "a"],
 *   // any number of additional arrays...
 *   [1, 2, 3],
 *   [{ id: 123 }, { id: 456 }, { id: 789 }]
 * );
 *
 * console.log("a", a);
 * // [ "a", "a" ]
 *
 * console.log("b", b);
 * // [ 1, 3 ]
 *
 * console.log("c", c);
 * // [{ id: 123 }, { id: 789 }]
 * ```
 *
 * @param pred
 * @param xs
 */
export const filterAll = <A, Xs extends [A[], ...any[][]]>(
	pred: Predicate<A>,
	...xs: Xs
): Xs => {
	const res = <any>new Array(xs.length + 1).fill(0).map(() => []);
	const a = xs[0];
	for (let i = 0, n = a.length, m = xs.length; i < n; i++) {
		if (pred(a[i])) {
			for (let j = 0; j < m; j++) res[j].push(xs[j][i]);
		}
	}
	return res;
};

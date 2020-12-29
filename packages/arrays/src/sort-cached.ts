import type { Comparator, Fn } from "@thi.ng/api";
import { compare } from "@thi.ng/compare";
import { quickSort } from "./quicksort";
import { multiSwap } from "./swap";

/**
 * Takes a `src` array and `key` function to obtain the sort key of each item.
 * Applies `key` to pre-compute a new array of all sort keys and then uses
 * {@link quickSort} to sort `src` array, based on the ordering of cached keys
 * and the optionally given comparator. Returns `src`.
 *
 * @remarks
 * This function is primarily intended for use cases where sort keys are derived
 * from non-trivial computations and need to be cached, rather than be
 * re-evaluated multiple times from within a comparator.
 *
 * @example
 * ```ts
 * // sort by length in descending order
 * sortByCachedKey(["a","bbbb","ccc","dd"], (x) => x.length, (a, b) => b - a);
 * // [ 'bbbb', 'ccc', 'dd', 'a' ]
 * ```
 *
 * @param src
 * @param key
 * @param cmp
 */
export const sortByCachedKey = <T, K>(
    src: T[],
    key: Fn<T, K>,
    cmp: Comparator<K> = compare
) => (quickSort(src.map(key), cmp, multiSwap(src)), src);

import { compare } from "@thi.ng/compare/compare";
import { fillRange } from "./fill-range.js";
import { sortByCachedKey } from "./sort-cached.js";

/**
 * Returns a new array of numeric indices in same order as sorted values of
 * `src` using given (optional) comparator (default: thi.ng/compare). The `src`
 * array will remain unmodified.
 *
 * @remarks
 * Also see {@link swizzle} to read an array in custom order.
 *
 * @example
 * ```ts
 * const src = ["a", "c", "d", "b"];
 *
 * argSort(src)
 * // [ 0, 3, 1, 2 ]
 *
 * // src[0] => "a"
 * // src[3] => "b"
 * // src[1] => "c"
 * // src[2] => "d"
 *
 * swizzle(argSort(src))(src)
 * // [ 'a', 'b', 'c', 'd' ]
 * ```
 *
 * @param src -
 * @param cmp -
 */
export const argSort = <T>(src: T[], cmp = compare) =>
	sortByCachedKey(fillRange(new Array(src.length)), src.slice(), cmp);

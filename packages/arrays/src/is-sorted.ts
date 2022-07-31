import type { Comparator } from "@thi.ng/api";
import { compare } from "@thi.ng/compare/compare";

/**
 * Returns true if the given array and its elements in the selected
 * index range (entire array, by default) are in the order defined by
 * the given comparator ({@link @thi.ng/compare#compare} by default).
 *
 * @remarks
 * Always returns true, if effective index range (or array length) has
 * less than two elements. No bounds checking.
 *
 * @example
 * ```ts
 * isSorted([3, 2, 1])
 * // false
 *
 * // w/ custom comparator
 * isSorted([3, 2, 1], (a, b) => b - a)
 * // true
 * ```
 *
 * @param arr - array
 * @param cmp - comparator
 * @param start - start index
 * @param end - end index
 */
export const isSorted = <T>(
	arr: ArrayLike<T>,
	cmp: Comparator<T> = compare,
	start = 0,
	end = arr.length
) => {
	let prev = arr[start];
	while (++start < end) {
		const curr = arr[start];
		if (cmp(prev, curr) > 0) return false;
		prev = curr;
	}
	return true;
};

// SPDX-License-Identifier: Apache-2.0
import type { Comparator } from "@thi.ng/api";

/**
 * Returns a comparator which applies given comparators in given order for as
 * long as the current comparator returns 0. In other words, returns the result
 * of the first comparator with non-zero result, or if none does, returns zero.
 *
 * @param cmp
 */
export const composeComparators = <T = any>(
	cmp: Comparator<T>,
	...xs: Comparator<T>[]
): Comparator<T> => {
	if (xs.length) {
		const fns = [cmp, ...xs];
		const n = fns.length;
		return (a, b) => {
			for (let i = 0; i < n; i++) {
				const res = fns[i](a, b);
				if (res !== 0) return res;
			}
			return 0;
		};
	}
	return cmp;
};

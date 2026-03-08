// SPDX-License-Identifier: Apache-2.0
import type { Comparator } from "@thi.ng/api";

/**
 * Returns a comparator which applies given comparators in given order for as
 * long as the current comparator returns 0. In other words, returns the result
 * of the first comparator with non-zero result, or if none does, returns zero.
 *
 * @remarks
 * Provides iteration-free fast past paths for up to 4 comparators.
 *
 * @param cmp
 */
export const composeComparators = <T = any>(
	cmp: Comparator<T>,
	...xs: Comparator<T>[]
): Comparator<T> => {
	const [cmp2, cmp3, cmp4] = xs;
	switch (xs.length) {
		case 0:
			return cmp;
		case 1:
			return (a, b) => cmp(a, b) || cmp2(a, b);
		case 2:
			return (a, b) => cmp(a, b) || cmp2(a, b) || cmp3(a, b);
		case 3:
			return (a, b) =>
				cmp(a, b) || cmp2(a, b) || cmp3(a, b) || cmp4(a, b);
		default: {
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
	}
};

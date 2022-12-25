import type { Comparator } from "@thi.ng/api";
import { compare } from "@thi.ng/compare/compare";
import { swap } from "./swap.js";

/**
 * Implementation of the Floyd-Rivest selection algorithm to partially find &
 * sort the `k`th smallest elements in given array, according to supplied
 * comparator.
 *
 * @remarks
 * `k` is the desired index value, where `buf[k]` is the `(k+1)`th smallest
 * element when `left=0` (default).
 *
 * **IMPORTANT:** Mutates (partially sorts) given array such that all items in
 * the `[left, k]` interval are the smallest.
 *
 * @example
 * ```ts
 * floydRivest([5, 3, -1, -10, 20, 7, 0, 4, 2], 3);
 * // [ -10, 0, -1, 2, 3,  4, 5, 20, 7 ]
 * ```
 *
 * Based on pseudo-code from:
 * - https://en.wikipedia.org/wiki/Floyd%E2%80%93Rivest_algorithm
 *
 * @param buf
 * @param k
 * @param cmp
 * @param left
 * @param right
 */
export const floydRivest = <T>(
	buf: T[],
	k = 1,
	cmp: Comparator<T> = compare,
	left = 0,
	right = buf.length - 1
) => {
	while (right > left) {
		// constants 600 & 0.5 are from original paper
		if (right - left > 600) {
			const n = right - left + 1;
			const i = k - left + 1;
			const z = Math.log(n);
			const s = 0.5 * Math.exp(z * (2 / 3));
			const sd =
				0.5 * Math.sqrt(z * s * ((n - s) / n)) * Math.sign(i - n / 2);
			floydRivest(
				buf,
				k,
				cmp,
				Math.max(left, (k - (i * s) / n + sd) | 0),
				Math.min(right, (k + ((n - i) * s) / n + sd) | 0)
			);
		}

		const t = buf[k];
		let i = left;
		let j = right;

		swap(buf, left, k);
		if (cmp(buf[right], t) > 0) swap(buf, right, left);

		while (i < j) {
			swap(buf, i, j);
			i++;
			j--;
			while (compare(buf[i], t) < 0) i++;
			while (compare(buf[j], t) > 0) j--;
		}

		if (compare(buf[left], t) === 0) {
			swap(buf, left, j);
		} else {
			j++;
			swap(buf, j, right);
		}

		if (j <= k) left = j + 1;
		if (k <= j) right = j - 1;
	}
	return buf;
};

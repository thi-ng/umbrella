import type { DistanceFn } from "./api.js";

/**
 * Bray-Curtis **dissimilarity** metric. Result always in [0..1] interval.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Bray%E2%80%93Curtis_dissimilarity
 *
 * @example
 * ```ts
 * import { distBrayCurtis } from "@thi.ng/vectors";
 *
 * distBrayCurtis([6, 7, 4], [10, 0, 6])
 * // 0.393939...
 * ```
 *
 * @param a -
 * @param b -
 */
export const distBrayCurtis: DistanceFn = (a, b) => {
	let c = 0;
	let s = 0;
	for (let i = a.length; i-- > 0; ) {
		c += Math.abs(a[i] - b[i]);
		s += Math.abs(a[i] + b[i]);
	}
	return s > 0 ? c / s : 0;
};

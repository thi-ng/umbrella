// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec, Vec } from "./api.js";
import { __ensureInputs } from "./ensure.js";

/**
 * Takes an array of vectors (of uniform dimensions) and computes the
 * componentwise medians (in accordance to the Manhattan-distance formulation of
 * the k-medians problem). Writes result to `out` (or a new vector).
 *
 * @example
 * ```ts tangle:../export/median.ts
 * import { median } from "@thi.ng/vectors";
 *
 * console.log(
 *   median([], [[3, 10, 400], [4, 30, 100], [1, 40, 200], [2, 20, 300]])
 * );
 * // [ 3, 30, 300 ]
 * ```
 *
 * @param out -
 * @param src -
 */
export const median = (out: Vec | null, src: ReadonlyVec[]) => {
	__ensureInputs(src);
	out = out || [];
	const m = src.length >> 1;
	for (let i = src[0].length; i-- > 0; ) {
		out[i] = src.map((x) => x[i]).sort((a, b) => a - b)[m];
	}
	return out;
};

/**
 * Computes the median component of given vector. Returns 0 if vector is empty.
 *
 * @example
 * ```ts tangle:../export/vmedian.ts
 * import { vmedian } from "@thi.ng/vectors";
 *
 * console.log(
 *   vmedian([10, 20, 5, 15])
 * );
 * // 10
 * ```
 *
 * @param a -
 */
export const vmedian = (a: ReadonlyVec) => {
	if (!a.length) return 0;
	a = [...a].sort((a, b) => a - b);
	return a[a.length >> 1];
};

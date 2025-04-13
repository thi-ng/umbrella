// SPDX-License-Identifier: Apache-2.0
import type { DistanceFn } from "./api.js";

/**
 * Cosine **similarity** metric. Result always in `[-1,1]` interval.
 *
 * @remarks
 * Similar to: `dot(a, b) / (magSq(a) * magSq(b))`. Returns zero if one of the
 * vectors is a zero-vector.
 *
 * Reference: https://en.wikipedia.org/wiki/Cosine_similarity
 *
 * @example
 * ```ts tangle:../export/dist-cosine.ts
 * import { distCosine } from "@thi.ng/vectors";
 *
 * console.log(
 *   distCosine([0, 1, 1, 0], [1, 1, 0, 0])
 * );
 * // 0.499999...
 * ```
 *
 * @param a -
 * @param b -
 */
export const distCosine: DistanceFn = (a, b) => {
	let asum = 0;
	let bsum = 0;
	let dot = 0;
	for (let i = a.length; i-- > 0; ) {
		const aa = a[i];
		const bb = b[i];
		asum += aa * aa;
		bsum += bb * bb;
		dot += aa * bb;
	}
	return asum && bsum ? dot / (Math.sqrt(asum) * Math.sqrt(bsum)) : 0;
};

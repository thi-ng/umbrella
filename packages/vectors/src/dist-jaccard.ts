// SPDX-License-Identifier: Apache-2.0
import type { DistanceFn } from "./api.js";

/**
 * Returns the inverse {@link jaccardSimilarity}, i.e. as distance metric rather
 * than similarity. Returns a value in `[0,1]` interval: 0.0 if `a` and `b` are
 * equal, or 1.0 if none of the components match.
 *
 * @remarks
 * The sizes of both input vectors MUST be equal. All non-zero vector component
 * values are treated equal.
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/Jaccard_index
 * - https://en.wikipedia.org/wiki/One-hot
 *
 * @example
 * ```ts tangle:../export/dist-jaccard.ts
 * import { distJaccard } from "@thi.ng/vectors";
 *
 * console.log(distJaccard([0, 0, 0, 0], [1, 1, 1, 1]));
 * // 1
 *
 * console.log(distJaccard([0, 1, 0, 0], [1, 1, 1, 1]));
 * // 0.75
 *
 * console.log(distJaccard([0, 1, 1, 0], [0, 1, 1, 0]));
 * // 0
 * ```
 *
 * @param a -
 * @param b -
 */
export const distJaccard: DistanceFn = (a, b) => 1 - jaccardSimilarity(a, b);

/**
 * Returns the Jaccard similarity of given multi-hot vectors, a value in the
 * `[0,1]` interval: 1.0 if `a` and `b` are equal, or 0.0 if none of the
 * components match.
 *
 * @remarks
 * The sizes of both input vectors MUST be equal. All non-zero vector component
 * values are treated equal.
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/Jaccard_index
 * - https://en.wikipedia.org/wiki/One-hot
 *
 * @example
 * ```ts tangle:../export/jaccard-similarity.ts
 * import { jaccardSimilarity } from "@thi.ng/vectors";
 *
 * console.log(jaccardSimilarity([0, 0, 0, 0], [1, 1, 1, 1]));
 * // 0
 *
 * console.log(jaccardSimilarity([0, 1, 0, 0], [1, 1, 1, 1]));
 * // 0.25
 *
 * console.log(jaccardSimilarity([0, 1, 1, 0], [0, 1, 1, 0]));
 * // 1
 * ```
 *
 * @param a -
 * @param b -
 */
export const jaccardSimilarity: DistanceFn = (a, b) => {
	let numUnion = 0;
	let numIsec = 0;
	for (let i = a.length; i-- > 0; ) {
		const aa = a[i] !== 0;
		const bb = b[i] !== 0;
		numUnion += ~~(aa || bb);
		numIsec += ~~(aa && bb);
	}
	return numUnion > 0 ? numIsec / numUnion : 0;
};

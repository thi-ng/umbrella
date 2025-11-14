// SPDX-License-Identifier: Apache-2.0
import type { SparseVec } from "./vec.js";

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
 * @param a -
 * @param b -
 */
export const jaccardSimilarity = (
	{ data: adata }: SparseVec,
	{ data: bdata }: SparseVec
) => {
	const an = adata.length;
	const bn = bdata.length;
	let numIsec = 0;
	for (let i = 0, j = 0; i < an && j < bn; ) {
		const apos = adata[i];
		const bpos = bdata[j];
		if (apos === bpos) {
			numIsec++;
			i += 2;
			j += 2;
		} else if (apos < bpos) {
			i += 2;
		} else {
			j += 2;
		}
	}
	const numUnion = ((an + bn) >>> 1) - numIsec;
	return numUnion > 0 ? numIsec / numUnion : 0;
};

/**
 * Cosine **similarity** metric. Result always in `[-1,1]` interval (or in [0,1]
 * range if `a` and `b` are multi-hot vectors).
 *
 * @remarks
 * Similar to: `dot(a, b) / (magSq(a) * magSq(b))`. Returns zero if one of the
 * vectors is a zero-vector.
 *
 * Reference: https://en.wikipedia.org/wiki/Cosine_similarity
 *
 * @param a -
 * @param b -
 */
export const cosineSimilarity = (a: SparseVec, b: SparseVec) => {
	const dot = a.dot(b);
	return dot ? dot / (a.mag() * b.mag()) : 0;
};

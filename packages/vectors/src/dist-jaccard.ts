import type { DistanceFn } from "./api.js";

/**
 * Returns the inverse Jaccard similarity, i.e. as distance rather than
 * similarity. Returns a value in [0..1] interval: 0.0 if `a` and `b` are equal,
 * or 1.0 if none of the components match.
 *
 * @remarks
 * The sizes of both input vectors MUST be equal. All non-zero vector component
 * values are treated equal.
 *
 * Reference: https://en.wikipedia.org/wiki/Jaccard_index
 *
 * @param a -
 * @param b -
 */
export const distJaccard: DistanceFn = (a, b) => {
	let numUnion = 0;
	let numIsec = 0;
	for (let i = a.length; i-- > 0; ) {
		const aa = a[i] !== 0;
		const bb = b[i] !== 0;
		numUnion += ~~(aa || bb);
		numIsec += ~~(aa && bb);
	}
	return numUnion ? 1 - numIsec / numUnion : 0;
};

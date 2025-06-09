import { distCosine } from "@thi.ng/vectors/dist-cosine";
import { jaccardSimilarity as $jaccard } from "@thi.ng/vectors/dist-jaccard";
import { distSq as $distSq } from "@thi.ng/vectors/distsq";
import { dot as $dot } from "@thi.ng/vectors/dot";

/**
 * Computes cosine similarity of the given dense multi-hot vectors.
 *
 * @remarks
 * Re-export of [`distCosine()` in
 * thi.ng/vectors](https://docs.thi.ng/umbrella/vectors/functions/distCosine.html)
 *
 * @param a
 * @param b
 */
export const cosineSimilarityDense = distCosine;

/**
 * Computes cosine similarity of given sparse multi-hot vectors.
 *
 * @param a
 * @param b
 */
export const cosineSimilaritySparse = (
	a: ArrayLike<number>,
	b: ArrayLike<number>
) => {
	const dot = dotProductSparse(a, b);
	return dot > 0 ? dot / (Math.sqrt(a.length) * Math.sqrt(b.length)) : 0;
};

/**
 * Computes Jaccard similarity of given dense multi-hot vectors.
 *
 * @remarks
 * Re-export of [`jaccardSimilarity()` in
 * thi.ng/vectors](https://docs.thi.ng/umbrella/vectors/functions/jaccardSimilarity.html)
 *
 * @param a
 * @param b
 */
export const jaccardSimilarityDense = $jaccard;

/**
 * Computes Jaccard similarity of given sparse multi-hot vectors.
 *
 * @param a
 * @param b
 */
export const jaccardSimilaritySparse = (
	a: ArrayLike<number>,
	b: ArrayLike<number>
) => {
	const na = a.length;
	const nb = b.length;
	let numIsec = 0;
	let apos: number, bpos: number;
	for (let i = 0, j = 0; i < na && j < nb; ) {
		apos = a[i];
		bpos = b[j];
		if (apos === bpos) {
			numIsec++;
			i++;
			j++;
		} else if (apos < bpos) {
			i++;
		} else {
			j++;
		}
	}
	const numUnion = na + nb - numIsec;
	return numUnion > 0 ? numIsec / numUnion : 0;
};

/**
 * Computes dot product of the given dense vectors.
 *
 * @remarks
 * Re-export of [`dot()` in
 * thi.ng/vectors](https://docs.thi.ng/umbrella/vectors/functions/dot.html)
 *
 * @param a
 * @param b
 */
export const dotProductDense = $dot;

/**
 * Computes dot product of the given sparse multi-hot vectors.
 *
 * @param a
 * @param b
 */
export const dotProductSparse = (
	a: ArrayLike<number>,
	b: ArrayLike<number>
) => {
	let res = 0;
	let apos: number, bpos: number;
	for (let i = 0, j = 0, na = a.length, nb = b.length; i < na && j < nb; ) {
		apos = a[i];
		bpos = b[j];
		if (apos === bpos) {
			res++;
			i++;
			j++;
		} else if (apos < bpos) i++;
		else j++;
	}
	return res;
};

/**
 * Computes the squared L2 distance of the given dense vectors.
 *
 * @remarks
 * Re-export of [`dot()` in
 * thi.ng/vectors](https://docs.thi.ng/umbrella/vectors/functions/dot.html)
 *
 * @param a
 * @param b
 */
export const distSqDense = $distSq;

/**
 * Computes the squared L2 distance of the given sparse multi-hot vectors.
 *
 * @param a
 * @param b
 */
export const distSqSparse = (a: ArrayLike<number>, b: ArrayLike<number>) => {
	let res = 0;
	let apos: number, bpos: number;
	for (let i = 0, j = 0, na = a.length, nb = b.length; i < na && j < nb; ) {
		apos = a[i];
		bpos = b[j];
		if (apos === bpos) {
			i++;
			j++;
		} else {
			res++;
			if (apos < bpos) i++;
			else j++;
		}
	}
	return res;
};

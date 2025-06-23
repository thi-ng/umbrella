// SPDX-License-Identifier: Apache-2.0
import { argSort } from "@thi.ng/arrays/arg-sort";
import { lookup, lookupUnsafe } from "@thi.ng/arrays/lookup";
import { knearest as $knearest } from "@thi.ng/distance/knearest";
import { Untransformed } from "@thi.ng/distance/untransformed";
import { kmeans, type KMeansOpts } from "@thi.ng/k-means";
import { map } from "@thi.ng/transducers/map";
import { max } from "@thi.ng/transducers/max";
import { transduce } from "@thi.ng/transducers/transduce";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { distJaccard } from "@thi.ng/vectors/dist-jaccard";
import { distSq } from "@thi.ng/vectors/distsq";
import { mean } from "@thi.ng/vectors/mean";
import type { Vocab } from "./api.js";
import { toDense } from "./vec.js";

/**
 * Jaccard distance metric wrapper for {@link kmeansDense}
 */
export const JACCARD_DIST_DENSE = new Untransformed<ReadonlyVec>(distJaccard);

/**
 * k-means clustering for dense multi-hot vectors. Uses thi.ng/k-means for
 * actual clustering and squared L2 as default distance metric.
 * Default max. iterations = 100.
 *
 * @remarks
 * Use {@link JACCARD_DIST_DENSE} for alternative distance metric.
 *
 * @param k
 * @param docs
 * @param opts
 */
export const kmeansDense = (
	k: number,
	docs: ReadonlyVec[],
	opts?: Partial<KMeansOpts>
) =>
	kmeans(k, docs, { maxIter: 100, ...opts }).map((cluster) => ({
		...cluster,
		docs: lookupUnsafe(docs, cluster.items),
	}));

/**
 * k-means clustering for sparse multi-hot vectors. First converts vectors into
 * dense versions (using {@link toDense}), then calls {@link kmeansDense} to
 * perform the clustering.
 *
 * @remarks
 * Since sparse vector sizes vary, the number of dimensions used (aka the
 * vocabulary size) MUST be given via `opts`.
 *
 * @param k
 * @param docs
 * @param opts
 */
export const kmeansSparse = (
	k: number,
	docs: ReadonlyVec[],
	opts: Partial<KMeansOpts> & { dim: number }
) =>
	kmeansDense(
		k,
		docs.map((x) => toDense(opts.dim, x)),
		opts
	);

export function clusterBounds(docs: ReadonlyVec[]): {
	centroid: ReadonlyVec;
	radius: number;
};
export function clusterBounds(
	docs: ReadonlyVec[],
	ids: number[]
): { centroid: ReadonlyVec; radius: number };
export function clusterBounds(docs: ReadonlyVec[], ids?: number[]) {
	if (ids) docs = lookup(docs, ids);
	const centroid = mean([], docs);
	return {
		centroid,
		radius: transduce(
			map((x) => distSq(centroid, x)),
			max(),
			docs
		),
	};
}

/**
 * Takes a vocab and array of docs encoded as dense multi-hot vectors. Computes
 * centroid of given docs and then calls {@link centralTermsVec} to return the
 * `k`-most central terms (or less if there're insufficient non-zero vector
 * components).
 *
 * @example
 * ```ts tangle:../export/central-terms.ts
 * import { centralTerms, encodeAllDense } from "@thi.ng/text-analysis";
 *
 * const inputs = [
 *   ["a", "b", "c"],
 *   ["a", "b", "d", "e"],
 *   ["b", "f", "g"],
 *   ["a", "b", "c", "f"],
 *   ["a", "g", "h"]
 * ];
 *
 * // create vocab & encode documents into multi-hot vectors
 * const { vocab, docs } = encodeAllDense(inputs);
 *
 * // extract top-4 common terms
 * console.log(centralTerms(vocab, 4, docs));
 * // [ "b", "a", "g", "f" ]
 * ```
 *
 * @param vocab
 * @param k
 * @param docs
 */
export const centralTerms = (vocab: Vocab, k: number, docs: ReadonlyVec[]) =>
	centralTermsVec(vocab, k, mean([], docs));

/**
 * Takes a vocab and dense vector representing a point in the n-dimensional
 * space of the given vocab. Returns an array of terms corresponding to the `k`
 * largest non-zero components of the vector (or less if there're insufficient
 * non-zero vector components).
 *
 * @remarks
 * Also see {@link centralTerms} (incl. code example).
 *
 * @param vocab
 * @param k
 * @param centroid
 */
export const centralTermsVec = (
	vocab: Vocab,
	k: number,
	centroid: ReadonlyVec
) =>
	vocab.getAllIDs(
		argSort(centroid, (a, b) => b - a)
			.slice(0, k)
			.filter(Boolean)
	);

export const knearest = (
	query: ReadonlyVec,
	k: number,
	r = Infinity,
	dist = JACCARD_DIST_DENSE,
	sorted = false
) => $knearest(query, k, r, dist, sorted);

export const knearestDocs = (
	query: ReadonlyVec,
	k: number,
	docs: ReadonlyVec[],
	r = Infinity,
	dist = JACCARD_DIST_DENSE,
	sorted = false
) => {
	const neighborhood = $knearest<number>(query, k, r, dist, sorted);
	for (let i = 0; i < docs.length; i++) neighborhood.consider(docs[i], i);
	return neighborhood
		.deref()
		.map((n) => <[ReadonlyVec, number]>[docs[n[1]], n[0]]);
};

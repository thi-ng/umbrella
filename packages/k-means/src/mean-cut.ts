// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { mean, vmean } from "@thi.ng/vectors/mean";
import { vmedian } from "@thi.ng/vectors/median";

/**
 * Mean-cut clustering, also usable as {@link kmeans} /
 * {@link KMeansOpts.initial} centroid initialization. Returns up to `k`
 * centroids for given `samples`.
 *
 * @remarks
 * Only recommended for low-dimensional data.
 *
 * @param k
 * @param samples
 */
export const meanCut = <T extends ReadonlyVec>(k: number, samples: T[]) =>
	computeCutWith(vmean, samples, samples[0].length, k).map((x) =>
		mean([], x)
	);

/**
 * Median-cut clustering, also usable as {@link kmeans} /
 * {@link KMeansOpts.initial} centroid initialization. Returns up to `k`
 * centroids for given `samples`.
 *
 * @remarks
 * Only recommended for low-dimensional data.
 *
 * @param k
 * @param samples
 */
export const medianCut = <T extends ReadonlyVec>(k: number, samples: T[]) =>
	computeCutWith(vmedian, samples, samples[0].length, k).map((x) =>
		mean([], x)
	);

/** @internal */
export const computeCutWith = (
	cut: Fn<ReadonlyVec, number>,
	samples: ReadonlyVec[],
	dim: number,
	depth: number
): ReadonlyVec[][] => {
	if (!samples.length) return [];
	if (depth <= 1) return [samples];
	const channels = new Array<number[]>(dim);
	let maxRange = 0,
		maxRangeID = 0,
		i = 0,
		j: number,
		n = samples.length,
		min: number,
		max: number,
		value: number,
		range: number,
		channel: number[];
	for (; i < dim; i++) {
		channel = channels[i] = new Array(n);
		min = Infinity;
		max = -Infinity;
		for (j = 0; j < n; j++) {
			value = channel[j] = samples[j][i];
			if (value < min) min = value;
			if (value > max) max = value;
		}
		range = max - min;
		if (range > maxRange) {
			maxRange = range;
			maxRangeID = i;
		}
	}
	channel = channels[maxRangeID];
	const split = cut(channel);
	const lo: ReadonlyVec[] = [];
	const hi: ReadonlyVec[] = [];
	for (j = 0; j < n; j++) {
		(channel[j] <= split ? lo : hi).push(samples[j]);
	}
	return computeCutWith(cut, lo, dim, depth >> 1).concat(
		computeCutWith(cut, hi, dim, (depth + 1) >> 1)
	);
};

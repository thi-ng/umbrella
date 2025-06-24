// SPDX-License-Identifier: Apache-2.0
import type { IDistance } from "@thi.ng/distance";
import { argmin } from "@thi.ng/distance/argmin";
import { DIST_SQ } from "@thi.ng/distance/squared";
import { assert } from "@thi.ng/errors/assert";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { weightedRandom } from "@thi.ng/random/weighted-random";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { add } from "@thi.ng/vectors/add";
import { median } from "@thi.ng/vectors/median";
import { mulN } from "@thi.ng/vectors/muln";
import { zeroes } from "@thi.ng/vectors/setn";
import type { CentroidStrategy, Cluster, KMeansOpts } from "./api.js";

/**
 * Takes an array of n-dimensional `samples` and attempts to assign them to up
 * to `k` clusters (might produce less), using the behavior defined by
 * (optionally) given `opts`.
 *
 * @remarks
 * https://en.wikipedia.org/wiki/K-medians_clustering
 *
 * @param k -
 * @param samples -
 * @param opts -
 */
export const kmeans = <T extends ReadonlyVec>(
	k: number,
	samples: T[],
	opts: Partial<KMeansOpts> = {}
) => {
	let {
		dim = samples[0].length,
		dist = DIST_SQ,
		maxIter = 32,
		strategy = means,
		exponent,
		initial,
		rnd,
	} = opts;
	const num = samples.length;
	const centroids = Array.isArray(initial)
		? initial
		: initial
		? initial(k, samples, dist, rnd)
		: kmeansPlusPlus(k, samples, dist, rnd, exponent);
	assert(centroids.length > 0, `missing initial centroids`);
	k = centroids.length;
	const clusters = new Uint32Array(num).fill(k);
	let update = true;
	while (update && maxIter-- > 0) {
		update = __assign(samples, centroids, clusters, dist);
		if (!update) break;
		for (let i = 0; i < k; i++) {
			const impl = strategy(dim);
			for (let j = 0; j < num; j++) {
				i === clusters[j] && impl.update(samples[j]);
			}
			const centroid = impl.finish();
			if (centroid) centroids[i] = centroid;
		}
	}
	return __buildClusters(centroids, clusters);
};

/**
 * k-means++ initialization / selection of initial cluster centroids. Default
 * centroid initialization method for {@link kmeans}.
 *
 * @remarks
 * Might return fewer than `k` centroid IDs if the requested number cannot be
 * fulfilled (e.g. due to lower number of samples and/or distance metric).
 * Throws an error if `samples` are empty.
 *
 * The optional `exponent` (default: 2) is applied to scale the distances to
 * nearest centroid, which will be used to control the weight distribution for
 * choosing next centroid. A higher exponent means that points with larger
 * distances will be more prioritized in the random selection.
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/K-means%2B%2B
 * - http://ilpubs.stanford.edu:8090/778/1/2006-13.pdf
 * - http://vldb.org/pvldb/vol5/p622_bahmanbahmani_vldb2012.pdf (TODO)
 *
 * @param k -
 * @param samples -
 * @param dist -
 * @param rnd -
 * @param exponent -
 */
export const kmeansPlusPlus = <T extends ReadonlyVec>(
	k: number,
	samples: T[],
	dist: IDistance<ReadonlyVec> = DIST_SQ,
	rnd: IRandom = SYSTEM,
	exponent = 2
) => {
	const num = samples.length;
	assert(num > 0, `missing samples`);
	k = Math.min(k, num);
	const centroidIDs = [rnd.int() % num];
	const centroids = [samples[centroidIDs[0]]];
	const indices = new Array(num).fill(0).map((_, i) => i);
	const metric = dist.metric;
	while (centroidIDs.length < k) {
		let psum = 0;
		const probs = samples.map((p) => {
			const d =
				dist.from(metric(p, centroids[argmin(p, centroids, dist)!])) **
				exponent;
			psum += d;
			return d;
		});
		if (!psum) break;
		let id: number;
		do {
			id = weightedRandom(indices, probs, rnd)();
		} while (centroidIDs.includes(id));
		centroidIDs.push(id);
		centroids.push(samples[id]);
	}
	return centroids;
};

/** @internal */
const __assign = <T extends ReadonlyVec>(
	samples: T[],
	centroids: ReadonlyVec[],
	assignments: Uint32Array,
	dist: IDistance<ReadonlyVec>
) => {
	let update = false;
	for (let i = samples.length; i-- > 0; ) {
		const id = argmin(samples[i], centroids, dist)!;
		if (id !== assignments[i]) {
			assignments[i] = id;
			update = true;
		}
	}
	return update;
};

/** @internal */
const __buildClusters = (
	centroids: ReadonlyVec[],
	assignments: Uint32Array
) => {
	const clusters: Cluster[] = [];
	for (let i = 0, n = assignments.length; i < n; i++) {
		const id = assignments[i];
		(
			clusters[id] ||
			(clusters[id] = {
				id,
				centroid: centroids[id],
				items: [],
			})
		).items.push(i);
	}
	return clusters.filter((x) => !!x);
};

/**
 * Default centroid strategy forming new centroids by averaging the position of
 * participating samples.
 *
 * @param dim -
 */
export const means: CentroidStrategy = (dim) => {
	const acc = zeroes(dim);
	let n = 0;
	return {
		update: (p) => {
			add(acc, acc, p);
			n++;
		},
		finish: () => (n ? mulN(acc, acc, 1 / n) : undefined),
	};
};

/**
 * Centroid strategy forming new centroids via componentwise medians.
 *
 * @remarks
 * https://en.wikipedia.org/wiki/K-medians_clustering
 */
export const medians: CentroidStrategy = () => {
	const acc: ReadonlyVec[] = [];
	return {
		update: (p) => acc.push(p),
		finish: () => (acc.length ? median([], acc) : undefined),
	};
};

/**
 * Means centroid strategy for decimal degree lat/lon positions (e.g. WGS84).
 * Unlike the default {@link means} strategy, this one treats latitude values
 * correctly in terms of the ±180 deg boundary and ensures samples on either
 * side of the Pacific are forming correct centroids.
 *
 * @remarks
 * When using this strategy, you should also use the
 * [`HAVERSINE_LATLON`](https://docs.thi.ng/umbrella/distance/variables/HAVERSINE_LATLON.html)
 * distance metric for {@link KMeansOpts.dist}.
 *
 * @example
 * ```ts
 * import { kmeans, meansLatLon } from "@thi.ng/k-means";
 * import { HAVERSINE_LATLON } from "@thi.ng/distance";
 *
 * kmeans(3, [...], { strategy: meansLatLon, dist: HAVERSINE_LATLON })
 * ```
 *
 * https://en.wikipedia.org/wiki/World_Geodetic_System
 */
export const meansLatLon: CentroidStrategy = () => {
	let lat = 0;
	let lon = 0;
	let n = 0;
	return {
		update: ([$lat, $lon]) => {
			lat += $lat < 0 ? $lat + 360 : $lat;
			lon += $lon;
			n++;
		},
		finish: () => {
			if (!n) return;
			lat /= n;
			if (lat > 180) lat -= 360;
			lon /= n;
			return [lat, lon];
		},
	};
};

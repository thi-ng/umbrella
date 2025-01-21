// SPDX-License-Identifier: Apache-2.0
import type { Fn, Fn0, Maybe } from "@thi.ng/api";
import type { IDistance } from "@thi.ng/distance";
import type { IRandom } from "@thi.ng/random";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export interface KMeansOpts {
	/**
	 * Array of initial centroids (i.e. indices of selected points in `samples`
	 * array given to {@link kmeans}) or a function producing such. If omitted,
	 * {@link initKmeanspp} is used as default.
	 */
	initial: number[] | KMeansInit<ReadonlyVec>;
	/**
	 * Distance function/metric to use for finding nearest centroid.
	 */
	dist: IDistance<ReadonlyVec>;
	/**
	 * Max. iteration count
	 */
	maxIter: number;
	/**
	 * PRNG instance to use for random centroid selection
	 */
	rnd: IRandom;
	/**
	 * Centroid refinement strategy (default: {@link means}).
	 */
	strategy: CentroidStrategy;
}

/**
 * k-means initialization function, e.g. {@link initKmeanspp}.
 */
export type KMeansInit<T extends ReadonlyVec> = (
	k: number,
	samples: T[],
	dist?: IDistance<ReadonlyVec>,
	rnd?: IRandom
) => number[];

export type CentroidStrategy = Fn<
	number,
	{
		update: Fn<ReadonlyVec, void>;
		finish: Fn0<Maybe<Vec>>;
	}
>;

export interface Cluster {
	/**
	 * Cluster ID
	 */
	id: number;
	/**
	 * Cluster centroid
	 */
	centroid: ReadonlyVec;
	/**
	 * Indices of original `samples` array belonging to this cluster
	 */
	items: number[];
}

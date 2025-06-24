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
	initial: ReadonlyVec[] | KMeansInit;
	/**
	 * Distance function/metric to use for finding nearest centroid.
	 */
	dist: IDistance<ReadonlyVec>;
	/**
	 * Sample dimensions. If omitted uses length of first sample vector.
	 */
	dim: number;
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
	/**
	 * Only used if no {@link KMeansOpts.initial} is given and the
	 * {@link initKmeanspp} default is used. There the `exponent` is applied to
	 * scale the distances to nearest centroid, which will be used to control
	 * the weight distribution for choosing next centroid. A higher exponent
	 * means that points with larger distances will be more prioritized in the
	 * random selection.
	 */
	exponent: number;
}

/**
 * k-means initialization function, e.g. {@link initKmeanspp}.
 */
export type KMeansInit = (
	k: number,
	samples: ReadonlyVec[],
	dist?: IDistance<ReadonlyVec>,
	rnd?: IRandom
) => ReadonlyVec[];

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

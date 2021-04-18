import type { Fn, Fn0 } from "@thi.ng/api";
import type { IDistance } from "@thi.ng/distance";
import type { IRandom } from "@thi.ng/random";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export interface KMeansOpts {
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

export type CentroidStrategy = Fn<
    number,
    {
        update: Fn<ReadonlyVec, void>;
        finish: Fn0<Vec | undefined>;
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

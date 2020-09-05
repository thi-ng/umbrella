import type { Fn } from "@thi.ng/api";
import type { ISpatialSet } from "@thi.ng/geom-api";
import type { IRandom } from "@thi.ng/random";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export type PointGenerator = Fn<IRandom, Vec>;
export type DensityFunction = Fn<ReadonlyVec, number>;

/**
 * Options for {@link samplePoisson}.
 */
export interface PoissonOpts {
    /**
     * Point generator function. Responsible for producing a new
     * candidate point within user defined bounds using provided RNG.
     */
    points: PointGenerator;
    /**
     * Density field function. Called for each new candidate point
     * created by point generator and should return the poisson disc
     * exclusion radius for the given point location. The related
     * candidate point can only be placed if no other points are already
     * existing within the given radius/distance. If this option is
     * given as number, uses this value to create a uniform distance
     * field.
     */
    density: DensityFunction | number;
    /**
     * Spatial indexing implementation for nearest neighbor searches of
     * candidate points. Currently only {@link @thi.ng/geom-accel} types
     * are supported and must be pre-initialized. The data structure is
     * used to store all successful sample points.
     *
     * Pre-seeding the data structure allows already indexed points to
     * participate in the sampling process and so can be used to define
     * exclusion zones. It also can be used as mechanism for progressive
     * sampling, i.e. generating a large number of samples and
     * distributing the process over multiple invocations of smaller
     * sample sizes (see `max` option) to avoid long delays.
     */
    index: ISpatialSet<ReadonlyVec>;
    /**
     * Max number of samples to produce. Must be given, no default.
     */
    max: number;
    /**
     * Step distance for the random walk each failed candidate point is
     * undergoing. This distance should be adjusted depending on overall
     * sampling area/bounds.
     *
     * @defaultValue 1
     */
    jitter?: number;
    /**
     * Number of random walk steps performed before giving up on a
     * candidate point. Increasing this value improves overall quality.
     *
     * @defaultValue 1
     */
    iter?: number;
    /**
     * Number of allowed failed consecutive candidate points before
     * stopping entire sampling process (most likely due to not being
     * able to place any further points). As with the `iter` param,
     * increasing this value improves overall quality, especially in
     * dense regions with small radii.
     *
     * @defaultValue 500
     */
    quality?: number;
    /**
     * Random number generator instance.
     *
     * @defaultValue {@link @thi.ng/random#SYSTEM} (aka Math.random)
     */
    rnd?: IRandom;
}

export interface StratifiedGridOpts {
    /**
     * nD vector defining grid size (in cells)
     */
    dim: ReadonlyVec;
    /**
     * Number of samples per grid cell
     *
     * @defaultValue 1
     */
    samples?: number;
    /**
     * Random number generator instance.
     *
     * @defaultValue {@link @thi.ng/random#SYSTEM} (aka Math.random)
     */
    rnd?: IRandom;
}

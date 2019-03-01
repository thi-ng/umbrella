import { isNumber } from "@thi.ng/checks";
import { ISpatialAccel } from "@thi.ng/geom-api";
import { IRandom, SYSTEM } from "@thi.ng/random";
import { jitter as _jitter, ReadonlyVec, Vec } from "@thi.ng/vectors";

export type PointGenerator = (rnd: IRandom) => Vec;
export type DensityFunction = (pos: ReadonlyVec) => number;

/**
 * Options for `samplePoisson()`.
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
     * candidate points. Currently only `KdTree` from the
     * thi.ng/geom-accel package is available and must be
     * pre-initialized to given dimensions prior to calling
     * `samplePoisson()`.
     *
     * The data structure is used to store all successful sample points
     * (as keys) incl. their exclusion radius (as value).
     *
     * Furthermore, pre-seeding the data structure allows already
     * indexed points to participate in the sampling process and act as
     * exclusion zones. It also can be used as mechanism for progressive
     * sampling, i.e. generating a large number of samples and
     * distributing the process over multiple invocations of smaller
     * sample sizes (see `max` option) to avoid long delays.
     */
    index: ISpatialAccel<ReadonlyVec, number>;
    /**
     * Max number of samples to produce. Must be given, no default.
     */
    max: number;
    /**
     * Step distance for the random walk each failed candidate point is
     * undergoing. This distance should be adjusted depending on overall
     * sampling area/bounds. Default: 1
     */
    jitter?: number;
    /**
     * Number of random walk steps performed before giving up on a
     * candidate point. Increasing this value improves overall quality.
     * Default: 1
     */
    iter?: number;
    /**
     * Number of allowed failed consecutive candidate points before
     * stopping entire sampling process (most likely due to not being
     * able to place any further points). As with the `iter` param,
     * increasing this value improves overall quality, especially in
     * dense regions with small radii. Default: 500
     */
    quality?: number;
    /**
     * Random number generator instance. Default thi.ng/random/SYSTEM
     * (aka Math.random)
     */
    rnd?: IRandom;
}

export const samplePoisson = (opts: Partial<PoissonOpts>) => {
    opts = {
        rnd: SYSTEM,
        iter: 1,
        jitter: 1,
        quality: 500,
        ...opts
    };
    const { points, index, rnd, jitter, quality, density: _d } = opts;
    const density = isNumber(_d) ? () => _d : _d;
    const iter = Math.max(opts.iter, 1);
    const samples: Vec[] = [];
    let failed = 0;
    let pos: Vec;
    let d: number;
    let i: number;

    outer: for (let num = opts.max; num > 0; ) {
        pos = points(rnd);
        d = density(pos);
        i = iter;
        while (i-- > 0) {
            if (!index.has(pos, d)) {
                index.add(pos, d);
                samples.push(pos);
                failed = 0;
                num--;
                continue outer;
            }
            _jitter(null, pos, jitter, rnd);
        }
        if (++failed > quality) {
            break;
        }
    }

    return samples;
};

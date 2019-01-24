import { isNumber } from "@thi.ng/checks";
import { ISpatialAccel } from "@thi.ng/geom-api";
import { IRandom, SYSTEM } from "@thi.ng/random";
import { jitter as _jitter, ReadonlyVec, Vec } from "@thi.ng/vectors";

export type PointGenerator = (rnd: IRandom) => Vec;
export type DensityFunction = (pos: ReadonlyVec) => number;

export interface PoissonOpts {
    /**
     * Point generator function. Responsible for producing a new
     * candidate point within user defined bounds using provided RNG.
     */
    points: PointGenerator;
    /**
     * Density field function. Called for each new sample point created
     * by point generator and should return the exclusion radius for
     * given point location. If this option is given as number, uses
     * this value to create a uniform distance field.
     */
    density: DensityFunction | number;
    /**
     * Spatial indexing implementation. Currently only KdTree from
     * thi.ng/geom-accel package is supported and must be
     * pre-initialized to given dimensions. Furthermore, pre-seeding the
     * tree allows already indexed points to participate in the sampling
     * process and act as exclusion zones.
     */
    accel: ISpatialAccel<ReadonlyVec, any>;
    /**
     * Max number of samples to produce.
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
     * candidate point. Default: 5
     */
    iter?: number;
    /**
     * Number of allowed failed continuous candidate points before
     * stopping entire sampling process. Increasing this value improves
     * overall quality, especially in dense regions with small radii.
     * Default: 500
     */
    quality?: number;
    /**
     * Random number generator instance. Default thi.ng/random/SYSTEM
     * (aka Math.random)
     */
    rnd?: IRandom;
}

export const samplePoisson =
    (opts: Partial<PoissonOpts>) => {
        opts = {
            rnd: SYSTEM,
            iter: 5,
            jitter: 1,
            quality: 500,
            ...opts
        };
        const { points, accel, rnd, iter, jitter, quality } = opts;
        const density = isNumber(opts.density) ?
            ((x) => () => x)(opts.density) :
            opts.density;
        const samples: Vec[] = [];
        let failed = 0;
        outer:
        for (let num = opts.max; num >= 0;) {
            const pos = points(rnd);
            const r = density(pos);
            let i = iter;
            while (i-- > 0) {
                _jitter(null, pos, jitter, rnd);
                if (!accel.has(pos, r)) {
                    accel.addKey(pos);
                    samples.push(pos);
                    failed = 0;
                    num--;
                    continue outer;
                }
            }
            if (++failed > quality) {
                break;
            }
        }
        return samples;
    };

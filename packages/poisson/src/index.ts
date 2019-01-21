import { isNumber } from "@thi.ng/checks";
import { KdTree } from "@thi.ng/geom-accel";
import { IRandom, SYSTEM } from "@thi.ng/random";
import { jitter as _jitter, ReadonlyVec, Vec } from "@thi.ng/vectors";

export type PointGenerator = (rnd: IRandom) => Vec;
export type DensityFunction = (pos: ReadonlyVec) => number;

export interface PoissonOpts {
    points: PointGenerator;
    density: DensityFunction | number;
    accel: KdTree<ReadonlyVec, any>;
    max: number;
    maxSelect?: number;
    jitter?: number;
    iter?: number;
    quality?: number;
    rnd?: IRandom;
}

export const samplePoisson =
    (opts: Partial<PoissonOpts>) => {
        opts = {
            rnd: SYSTEM,
            iter: 100,
            max: 1000,
            jitter: 1,
            maxSelect: 8,
            quality: 200,
            ...opts
        };
        const { points, accel, rnd, maxSelect, iter, jitter, quality } = opts;
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
                if (accel.selectKeys(pos, maxSelect, r).length === 0) {
                    accel.add(pos, null);
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

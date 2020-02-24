import { isNumber, isPlainObject } from "@thi.ng/checks";
import { DEFAULT_SAMPLES, SamplingOpts } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample";
import { pointAtTheta } from "./point-at";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export const sample = (
    pos: ReadonlyVec,
    r: ReadonlyVec,
    axis: number,
    start: number,
    end: number,
    opts?: number | Partial<SamplingOpts>
): Vec[] => {
    if (isPlainObject(opts) && (<any>opts).dist !== undefined) {
        return new Sampler(
            sample(
                pos,
                r,
                axis,
                start,
                end,
                (<SamplingOpts>opts).num || DEFAULT_SAMPLES
            )
        ).sampleUniform((<any>opts).dist, (<any>opts).last !== false);
    }
    opts = isNumber(opts)
        ? { num: opts, last: true }
        : { num: DEFAULT_SAMPLES, ...opts };
    let delta = end - start;
    let num = opts.theta ? Math.round(delta / opts.theta) : opts.num!;
    delta /= num;
    opts.last !== false && num++;
    const pts: Vec[] = new Array(num);
    for (let i = 0; i < num; i++) {
        pts[i] = pointAtTheta(pos, r, axis, start + i * delta);
    }
    return pts;
};

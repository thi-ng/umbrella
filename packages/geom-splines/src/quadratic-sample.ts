import { isNumber, isPlainObject } from "@thi.ng/checks";
import { DEFAULT_SAMPLES, SamplingOpts } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample";
import {
    mixQuadratic,
    ReadonlyVec,
    set,
    Vec
} from "@thi.ng/vectors";

export const sampleQuadratic = (
    points: ReadonlyVec[],
    opts?: number | Partial<SamplingOpts>
): Vec[] => {
    if (isPlainObject(opts) && (<SamplingOpts>opts).dist !== undefined) {
        return new Sampler(
            sampleQuadratic(points, (<SamplingOpts>opts).num || DEFAULT_SAMPLES)
        ).sampleUniform(
            (<SamplingOpts>opts).dist,
            (<SamplingOpts>opts).last !== false
        );
    }
    opts = isNumber(opts)
        ? {
              num: opts,
              last: true
          }
        : {
              num: DEFAULT_SAMPLES,
              ...opts
          };
    const res: Vec[] = [];
    const delta = 1 / opts.num;
    const [a, b, c] = points;
    for (let t = 0; t < opts.num; t++) {
        res.push(mixQuadratic([], a, b, c, t * delta));
    }
    opts.last && res.push(set([], c));
    return res;
};

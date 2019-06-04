import { isNumber, isPlainObject } from "@thi.ng/checks";
import { DEFAULT_SAMPLES, SamplingOpts } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample";
import {
    mixCubic,
    ReadonlyVec,
    set,
    Vec
} from "@thi.ng/vectors";

export const sampleCubic = (
    pts: ReadonlyVec[],
    opts?: number | Partial<SamplingOpts>
): Vec[] => {
    if (isPlainObject(opts) && (<SamplingOpts>opts).dist !== undefined) {
        return new Sampler(
            sampleCubic(pts, (<SamplingOpts>opts).num || DEFAULT_SAMPLES)
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
    const [a, b, c, d] = pts;
    const delta = 1 / opts.num;
    for (let t = 0; t < opts.num; t++) {
        res.push(mixCubic([], a, b, c, d, t * delta));
    }
    opts.last && res.push(set([], d));
    return res;
};

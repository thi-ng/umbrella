import { isNumber, isPlainObject } from "@thi.ng/checks";
import { DEFAULT_SAMPLES, SamplingOpts } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample";
import { ReadonlyVec, set, Vec } from "@thi.ng/vectors";
import type { Fn3, Fn2 } from "@thi.ng/api";

export const __sample = (sample: Fn3<Vec[], ReadonlyVec[], number, void>) =>
    function $(
        pts: ReadonlyVec[],
        opts?: number | Partial<SamplingOpts>
    ): Vec[] {
        if (isPlainObject(opts) && (<SamplingOpts>opts).dist !== undefined) {
            return new Sampler(
                $(pts, (<SamplingOpts>opts).num || DEFAULT_SAMPLES)
            ).sampleUniform(
                (<SamplingOpts>opts).dist,
                (<SamplingOpts>opts).last !== false
            );
        }
        opts = isNumber(opts)
            ? {
                  num: opts,
                  last: true,
              }
            : {
                  num: DEFAULT_SAMPLES,
                  ...opts,
              };
        const res: Vec[] = [];
        sample(res, pts, opts.num!);
        opts.last && res.push(set([], pts[pts.length - 1]));
        return res;
    };

export const __sampleArray = (
    fn: Fn2<ReadonlyVec[], Partial<SamplingOpts>, Vec[]>
) => (
    segments: ReadonlyVec[][],
    closed = false,
    opts: number | Partial<SamplingOpts>
) => {
    const _opts = isNumber(opts) ? { num: opts } : opts;
    const n = segments.length - 1;
    return Array.prototype.concat.apply(
        [],
        segments.map((seg, i) => {
            const last = !closed && i === n;
            return fn(seg, { ..._opts, last });
        })
    );
};

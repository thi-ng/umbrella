import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { DEFAULT_SAMPLES, SamplingOpts } from "@thi.ng/geom-api/sample";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { copyVectors } from "@thi.ng/vectors/copy";
import { Sampler } from "./sampler";

export const resample = (
    pts: ReadonlyVec[],
    opts?: number | Partial<SamplingOpts>,
    closed = false,
    copy = false
) => {
    if (opts !== undefined) {
        const sampler = new Sampler(pts, closed);
        return isPlainObject(opts)
            ? closed
                ? opts.dist
                    ? sampler.sampleUniform(opts.dist, opts.last)
                    : sampler.sampleFixedNum(
                          opts.num || DEFAULT_SAMPLES,
                          opts.last
                      )
                : opts.dist
                ? sampler.sampleUniform(opts.dist, opts.last !== false)
                : sampler.sampleFixedNum(
                      opts.num || DEFAULT_SAMPLES,
                      opts.last !== false
                  )
            : sampler.sampleFixedNum(opts || DEFAULT_SAMPLES, !closed);
    }
    return copy ? copyVectors(pts) : pts;
};

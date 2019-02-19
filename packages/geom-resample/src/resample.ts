import { isPlainObject } from "@thi.ng/checks";
import { copyVectors, ReadonlyVec } from "@thi.ng/vectors";
import { DEFAULT_SAMPLES, SamplingOpts } from "@thi.ng/geom-api";
import { Sampler } from "./sampler";

export const resample = (
    pts: ReadonlyVec[],
    opts: number | Partial<SamplingOpts>,
    closed = false,
    copy = false
) => {
    if (opts !== undefined) {
        const sampler = new Sampler(pts, closed);
        return isPlainObject(opts) ?
            closed ?
                opts.dist ?
                    sampler.sampleUniform(opts.dist, opts.last) :
                    sampler.sampleFixedNum(opts.num, opts.last) :
                opts.dist ?
                    sampler.sampleUniform(opts.dist, opts.last !== false) :
                    sampler.sampleFixedNum(opts.num, opts.last !== false) :
            sampler.sampleFixedNum(opts || DEFAULT_SAMPLES, !closed);
    }
    return copy ?
        copyVectors(pts) :
        pts;
};
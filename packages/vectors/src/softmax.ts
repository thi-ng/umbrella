import type { ReadonlyVec, Vec } from "./api.js";
import { divN } from "./divn.js";
import { exp } from "./exp.js";
import { sum } from "./sum.js";

/**
 * Computes softmax (aka normalized exp) of input vector `src` and writes
 * results to `out` (or if null, back into `src`).
 *
 * @remarks
 * Computes elementwise: `s[i] = exp(src[i]) / sum(exp(src))`. The result
 * vector's elements will sum to 1.0.
 *
 * This function is often used as the last activation function in a neural
 * network to normalize the output to a probability distribution over predicted
 * output classes.
 *
 * References:
 * - https://en.wikipedia.org/wiki/Softmax_function
 * - https://victorzhou.com/blog/softmax/
 *
 * @param out - 
 * @param src - 
 */
export const softMax = (out: Vec | null, src: ReadonlyVec) => {
    const e = exp([], src);
    return divN(out || src, e, sum(e));
};

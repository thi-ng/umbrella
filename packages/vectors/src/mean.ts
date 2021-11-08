import { add } from "./add.js";
import type { ReadonlyVec, Vec } from "./api.js";
import { __ensureInputs } from "./internal/ensure.js";
import { mulN } from "./muln.js";
import { set } from "./set.js";
import { sum } from "./sum.js";

/**
 * Takes an array of vectors (of uniform dimensions) and computes the
 * componentwise mean. Writes result to `out` (or a new vector).
 *
 * @remarks
 * Also see {@link median}.
 *
 * @example
 * ```ts
 * mean([], [[3, 10, 400], [4, 30, 100], [1, 40, 200], [2, 20, 300]])
 * // [ 2.5, 25, 250 ]
 * ```
 *
 * @param out
 * @param src
 */
export const mean = (out: Vec | null, src: ReadonlyVec[]) => {
    __ensureInputs(src);
    out = set(out || [], src[0]);
    for (let i = src.length; i-- > 1; ) {
        add(out, out, src[i]);
    }
    return mulN(out, out, 1 / src.length);
};

/**
 * Computes the mean of components of given vector.
 *
 * @example
 * ```ts
 * vmean([5, 10, 15, 20])
 * // 12.5
 * ```
 *
 * @param a
 */
export const vmean = (a: ReadonlyVec) => sum(a) / a.length;

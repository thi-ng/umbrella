import { addW4 } from "./addw.js";
import type { ReadonlyVec, Vec } from "./api.js";

/**
 * Vector version of {@link @thi.ng/math#mixCubic}.
 *
 * @param out - result
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 * @param t - interpolation coeff [0..1]
 */
export const mixCubic = (
    out: Vec | null,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    d: ReadonlyVec,
    t: number
) => {
    const s = 1 - t;
    const s2 = s * s;
    const t2 = t * t;
    return addW4(out, a, b, c, d, s2 * s, 3 * s2 * t, 3 * t2 * s, t2 * t);
};

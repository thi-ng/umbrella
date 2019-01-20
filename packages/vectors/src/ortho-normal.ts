import { cross3 } from "./cross";
import { sub3 } from "./sub";
import { normalize } from "./normalize";
import { Vec, ReadonlyVec } from "./api";

/**
 * Produces a vector which is perpendicular/normal to the plane spanned
 * by given 3 input vectors. If `normalize` is true (default), the
 * result vector will be normalized.
 *
 * ```
 * orthoNormal3([], [0,0,0], [1,0,0], [0,1,0])
 * // [0,0,1]
 * ```
 *
 * @param out
 * @param a
 * @param b
 * @param c
 * @param normalize
 */
export const orthoNormal3 =
    (out: Vec, a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, doNormalize = true) => {
        out = cross3(null, sub3(out || a, b, a), sub3([], c, a));
        return doNormalize ? normalize(out, out) : out;
    };

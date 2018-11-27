import { VecOpVVV } from "./api";
import { cross3 } from "./cross";
import { sub3 } from "./sub";

/**
 * Produces a vector which is perpendicular/normal to the plane spanned
 * by given 3 input vectors.
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
 */
export const orthoNormal3: VecOpVVV =
    (out, a, b, c) =>
        cross3(out, sub3(out, b, a), sub3([], c, a));

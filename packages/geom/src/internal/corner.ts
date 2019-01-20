import { EPS, sign } from "@thi.ng/math";
import { ReadonlyVec, signedArea2 } from "@thi.ng/vectors";

/**
 * Syntax sugar for `sign(signedArea2(a,b,c))`.
 *
 * @param a
 * @param b
 * @param c
 * @param eps
 */
export const corner =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, eps = EPS) =>
        sign(signedArea2(a, b, c), eps);

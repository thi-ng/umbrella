import { EPS, sign } from "@thi.ng/math";
import type { ReadonlyVec } from "./api";
import { signedArea2 } from "./signed-area";

/**
 * Syntax sugar for `sign(signedArea2(a, b, c))`.
 *
 * - {@link @thi.ng/math#sign}
 * - {@link signedArea2}
 *
 * @param a -
 * @param b -
 * @param c -
 * @param eps - zero tolerance for sign computation
 */
export const corner2 = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    eps = EPS
) => sign(signedArea2(a, b, c), eps);

/**
 * Returns true, if the triangle `a`, `b`, `c` is in clockwise order,
 * i.e. if `corner2(a,b,c)` returned -1.
 *
 * @param a -
 * @param b -
 * @param c -
 * @param eps -
 */
export const clockwise2 = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    eps = EPS
) => corner2(a, b, c, eps) < 0;

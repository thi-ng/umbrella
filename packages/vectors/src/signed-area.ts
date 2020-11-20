import type { FnN6, FnU3 } from "@thi.ng/api";
import type { ReadonlyVec } from "./api";

/**
 * Returns 2x the signed area of the 2D triangle defined by the given points.
 *
 * @remarks
 * This is a useful classifier for many geometry processing tasks. In addition
 * to the triangle area, the result can also be interpreted as follows:
 *
 * - `> 0`: points are ordered counterclockwise
 * - `< 0`: points are ordered clockwise
 * - `0`: points are co-linear
 *
 * Functionally same as: `cross2(sub2([], b, a), sub2([], c, a))`
 *
 * - {@link corner2}
 * - {@link clockwise2}
 * - {@link cross2}
 *
 * @param a -
 * @param b -
 * @param c -
 */
export const signedArea2: FnU3<ReadonlyVec, number> = (a, b, c) => {
    const ax = a[0];
    const ay = a[1];
    return (b[0] - ax) * (c[1] - ay) - (c[0] - ax) * (b[1] - ay);
};

/**
 * Same as {@link signedArea2}, but expects individual vector component args,
 * instead of vectors.
 *
 * @param ax -
 * @param ay -
 * @param bx -
 * @param by -
 * @param cx -
 * @param cy -
 */
export const signedAreaC2: FnN6 = (ax, ay, bx, by, cx, cy) =>
    (bx - ax) * (cy - ay) - (cx - ax) * (by - ay);

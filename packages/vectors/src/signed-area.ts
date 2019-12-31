import { ReadonlyVec } from "./api";

/**
 * Returns area * 2 of the 2D triangle defined by the input vectors.
 * This is a useful classifier for many geometry processing tasks. In
 * addition to the triangle area, the result can also be interpreted as
 * follows:
 *
 * - `> 0`: points are ordered counterclockwise
 * - `< 0`: points are ordered clockwise
 * - `0`: points are co-linear
 *
 * Same as: `cross2(sub2([], b, a), sub2([], c, a))`
 *
 * - {@link corner2}
 * - {@link clockwise2}
 * - {@link cross2}
 *
 * @param a -
 * @param b -
 * @param c -
 */
export const signedArea2 = (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) => {
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
export const signedAreaC2 = (
    ax: number,
    ay: number,
    bx: number,
    by: number,
    cx: number,
    cy: number
) => (bx - ax) * (cy - ay) - (cx - ax) * (by - ay);

import { dot, normalize, ReadonlyVec, sub, Vec } from "@thi.ng/vectors";

/**
 * Returns signed distance between point `p` and plane defined by normal `n` and
 * `w`. In 2D this also works for lines.
 *
 * @remarks
 * If result is > 0 the point lies "above" the plane, if < 0 below the plane or
 * if zero on the plane.
 *
 * @param p
 * @param n
 * @param w
 */
export const distToPlane = (p: ReadonlyVec, n: ReadonlyVec, w: number) =>
    dot(n, p) - w;

/**
 * Returns closest point to `p` on the plane defined by normal `n` and `w`. In
 * 2D this also works for lines.
 *
 * @param p
 * @param normal
 * @param w
 * @param out
 */
export const closestPointPlane = (
    p: ReadonlyVec,
    normal: ReadonlyVec,
    w: number,
    out: Vec = []
) => sub(out, p, normalize(out, normal, distToPlane(p, normal, w)));

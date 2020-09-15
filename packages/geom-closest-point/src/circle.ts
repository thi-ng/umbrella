import { add, direction, ReadonlyVec, Vec } from "@thi.ng/vectors";

/**
 * Returns closest point to `p` on circle defined by origin `c` and radius `r`.
 *
 * @param p
 * @param c
 * @param r
 * @param out
 */
export const closestPointCircle = (
    p: ReadonlyVec,
    c: ReadonlyVec,
    r: number,
    out: Vec = []
) => add(out, c, direction(out, c, p, r));

/**
 * Same as {@link closestPointCircle}.
 */
export const closestPointSphere = closestPointCircle;

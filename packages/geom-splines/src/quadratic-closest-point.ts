import { minError } from "@thi.ng/math";
import { distSq, mixQuadratic, ReadonlyVec, Vec } from "@thi.ng/vectors";

/**
 * Performs recursive search for closest point to `p` on quadratic curve
 * defined by control points `a`,`b`,`c`. The `res` and `recur` params
 * are used to control the recursion behavior. If `eps` is given, the
 * search is terminated as soon as a point with a shorter *squared*
 * distance than `eps` is found.
 *
 * {@link @thi.ng/math#minError}
 *
 * @param p - query point
 * @param a - control point 1
 * @param b - control point 2
 * @param c - control point 3
 * @param res - search steps per iteration
 * @param iter - iterations
 * @param eps - epsilon value
 */
export const closestPointQuadratic = (
    p: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    out: Vec = [],
    res?: number,
    iter?: number,
    eps?: number
) => {
    const fn = (t: number) => mixQuadratic(out, a, b, c, t);
    return fn(minError(fn, distSq, p, res, iter, 0, 1, eps));
};

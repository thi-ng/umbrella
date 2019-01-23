import {
    dot,
    empty,
    magSq,
    mixN,
    ReadonlyVec,
    set,
    sub,
    Vec,
    dist
} from "@thi.ng/vectors";

/**
 * Computes the parametric distance `t` of point `p` projected onto line
 * `a` -> `b`, relative to `a`. I.e. the projection of `p` can then be
 * computed like so:
 *
 * ```
 * maddN([], a, b, closestT(p, a, b))
 * ```
 *
 * If the return value is outside the closed [0,1] interval, the
 * projected point lies outside the line segment. Returns `undefined` if
 * `a` and `b` are coincident.
 *
 * @param p
 * @param a
 * @param b
 */
export const closestT =
    (p: ReadonlyVec, a: ReadonlyVec, b: ReadonlyVec) => {

        const d = sub([], b, a);
        const l = magSq(d);
        return l > 1e-6 ?
            dot(sub([], p, a), d) / l :
            undefined;
    };

/**
 * Returns closest point to `p` on line segment `a` -> `b`. By default,
 * if the result point lies outside the segment, returns a copy of the
 * closest end point. The result is written to the optional `out` vector
 * (or if omitted, a new one is created).
 *
 * If `insideOnly` is true, only returns the closest point iff it
 * actually is inside the segment. The behavior of this configurable via
 * the optional `eps` arg and by default includes both end points. This
 * function uses `closestT` to compute the parametric position of the
 * result point and determine if it lies within the line segment. If
 * `eps > 0`, the end points `a` and `b` will be excluded from the
 * match, effectively shortening the valid line segment from both ends,
 * i.e. the valid interval of the parametric position will be
 * [eps,1-eps]. If the result lies outside this interval, the function
 * returns `undefined`. Likewise, if `a` and `b` are coincident.
 *
 * @param p
 * @param a
 * @param b
 * @param out
 * @param eps
 */
export const closestPointSegment =
    (p: ReadonlyVec, a: ReadonlyVec, b: ReadonlyVec, out?: Vec, insideOnly = false, eps = 0) => {

        const t = closestT(p, a, b);
        if (t !== undefined && (!insideOnly || t >= eps && t <= 1 - eps)) {
            out = out || empty(p);
            return t <= 0 ?
                set(out, a) :
                t >= 1 ?
                    set(out, b) :
                    mixN(out, a, b, t);
        }
    };

/**
 * Returns distance from `p` to closest point on line `a` -> `b`.
 *
 * @param p
 * @param a
 * @param b
 */
export const distToSegment =
    (p: ReadonlyVec, a: ReadonlyVec, b: ReadonlyVec) =>
        dist(p, closestPointSegment(p, a, b) || a);

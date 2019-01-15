import {
    distSq,
    dot,
    empty,
    magSq,
    mixN,
    ReadonlyVec,
    set,
    sub,
    Vec
} from "@thi.ng/vectors3";

export const closestPointRaw =
    (p: ReadonlyVec, pts: Vec[]) => {

        let minD = Infinity;
        let closest: Vec;
        for (let i = pts.length; --i >= 0;) {
            const d = distSq(pts[i], p);
            if (d < minD) {
                minD = d;
                closest = pts[i];
            }
        }
        return closest;
    };

export const closestCoeff =
    (p: ReadonlyVec, a: ReadonlyVec, b: ReadonlyVec) => {

        const d = sub([], b, a);
        const l = magSq(d);
        return l > 1e-6 ?
            dot(sub([], p, a), d) / l :
            undefined;
    };

/**
 * Returns closest point to `p` on segment `a` -> `b`. By default, if
 * the result point lies outside the segment, returns a copy of the
 * closest end point. However, if `insideOnly` is true, only returns the
 * closest point if it actually is inside the segment (incl. end
 * points).
 *
 * @param p
 * @param a
 * @param b
 * @param out
 */
export const closestPointSegment =
    (p: ReadonlyVec, a: ReadonlyVec, b: ReadonlyVec, out?: Vec, insideOnly = false) => {

        const t = closestCoeff(p, a, b);
        if (t !== undefined && (!insideOnly || t >= 0 && t <= 1)) {
            out = out || empty(p);
            return t <= 0.0 ?
                set(out, a) :
                t >= 1.0 ?
                    set(out, b) :
                    mixN(out, a, b, t);
        }
    };

export const closestPointPolyline =
    (p: ReadonlyVec, pts: ReadonlyArray<Vec>, closed = false) => {

        const closest = empty(pts[0]);
        const tmp = empty(closest);
        const n = pts.length - 1;
        let minD = Infinity, i, j;
        if (closed) {
            i = n;
            j = 0;
        } else {
            i = 0;
            j = 1;
        }
        for (; j <= n; i = j, j++) {
            if (closestPointSegment(p, pts[i], pts[j], tmp)) {
                const d = distSq(p, tmp);
                if (d < minD) {
                    minD = d;
                    set(closest, tmp);
                }
            }
        }
        return closest;
    };

/**
 * Returns the index of the start point containing the segment in the
 * polyline array `points` farthest away from `p` with regards to the
 * line segment `a` to `b`. `points` is only checked between indices
 * `from` and `to` (not including the latter).
 *
 * @param a
 * @param b
 * @param points
 * @param from
 * @param to
 */
export const farthestPointSegment =
    (a: Vec, b: Vec, points: Vec[], from = 0, to = points.length) => {
        let maxD = -1;
        let maxIdx;
        const tmp = empty(a);
        for (let i = from; i < to; i++) {
            const p = points[i];
            const d = distSq(p, closestPointSegment(p, a, b, tmp) || a);
            if (d > maxD) {
                maxD = d;
                maxIdx = i;
            }
        }
        return [maxIdx, Math.sqrt(maxD)];
    };

import { IVector } from "@thi.ng/vectors/api";

export const closestPoint =
    <T extends IVector<T>>(p: T, pts: T[]) => {

        let minD = Infinity;
        let closest: T;
        for (let i = pts.length; --i >= 0;) {
            const d = pts[i].distSq(p);
            if (d < minD) {
                minD = d;
                closest = pts[i];
            }
        }
        return closest;
    };

export const closestCoeff =
    <T extends IVector<T>>(p: T, a: T, b: T) => {

        const d = b.subNew(a);
        const l = d.magSq();
        if (l > 1e-6) {
            return p.subNew(a).dot(d) / l;
        }
    };

export const closestPointSegment =
    <T extends IVector<T>>(p: T, a: T, b: T, out: T) => {

        const t = closestCoeff(p, a, b);
        if (t !== undefined) {
            return t <= 0.0 ?
                out.set(a) :
                t >= 1.0 ?
                    out.set(b) :
                    a.mixNewN(b, t, out);
        }
    };

export const closestPointPolyline =
    <T extends IVector<T>>(p: Readonly<T>, pts: ReadonlyArray<T>, closed = false) => {

        const closest = pts[0].empty();
        const tmp = closest.empty();
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
                const d = p.distSq(tmp);
                if (d < minD) {
                    minD = d;
                    closest.set(tmp);
                }
            }
        }
        return closest;
    };

/**
 * Returns the index of the start point containing the segment in the
 * polyline array `points` farthest away from `p` with regards to the
 * line segment `a` to `b`. `points` is only checked between indices
 * `from` and `to`.
 *
 * @param a
 * @param b
 * @param points
 * @param from
 * @param to
 */
export const farthestPointSegment =
    <T extends IVector<T>>(
        a: T,
        b: T,
        points: T[],
        from = 0,
        to = points.length) => {

        let maxD = -1;
        let maxIdx;
        const tmp = a.empty();
        for (let i = from; i < to; i++) {
            const p = points[i];
            const d = p.distSq(closestPointSegment(p, a, b, tmp) || a);
            if (d > maxD) {
                maxD = d;
                maxIdx = i;
            }
        }
        return [maxIdx, Math.sqrt(maxD)];
    };

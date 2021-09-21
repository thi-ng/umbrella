import { intersectLineLine } from "@thi.ng/geom-isec/line-line";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { EPS } from "@thi.ng/math/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { corner2 } from "@thi.ng/vectors/clockwise";

/**
 * Extended version of Sutherland-Hodgeman convex polygon clipping
 * supporting any convex boundary polygon (not only rects). Returns new
 * array of clipped vertices.
 *
 * {@link https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm}
 *
 * @param pts - subject poly vertices
 * @param bounds - clipping boundary vertices
 * @param bc - pre-computed boundary centroid
 * @param eps - edge classification tolerance
 */
export const sutherlandHodgeman = (
    pts: ReadonlyVec[],
    bounds: ReadonlyVec[],
    bc?: ReadonlyVec,
    eps = EPS
) => {
    bc = bc || centroid(bounds);
    for (let ne = bounds.length, j = ne - 1, i = 0; i < ne; j = i, i++) {
        const clipped: Vec[] = [];
        const ca = bounds[j];
        const cb = bounds[i];
        const sign = corner2(ca, cb, bc, eps);
        for (let np = pts.length, k = np - 1, l = 0; l < np; k = l, l++) {
            const p = pts[k];
            const q = pts[l];
            const cqsign = corner2(ca, cb, q, eps);
            if (corner2(ca, cb, p, eps) === sign) {
                clipped.push(
                    cqsign !== sign
                        ? <Vec>intersectLineLine(ca, cb, p, q).isec
                        : q
                );
            } else if (cqsign === sign) {
                clipped.push(<Vec>intersectLineLine(ca, cb, p, q).isec, q);
            }
        }
        if (clipped.length < 2) {
            return [];
        }
        pts = clipped;
    }
    return pts;
};

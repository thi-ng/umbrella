import { intersectLineLine } from "@thi.ng/geom-isec";
import { centroid } from "@thi.ng/geom-poly-utils";
import { EPS } from "@thi.ng/math";
import { corner2, ReadonlyVec } from "@thi.ng/vectors";

/**
 * Extended version of Sutherland-Hodgeman convex polygon clipping
 * supporting any convex boundary polygon (not only rects). Returns new
 * array of clipped vertices.
 *
 * https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm
 *
 * @param pts subject poly vertices
 * @param bounds clipping boundary vertices
 * @param bc pre-computed boundary centroid
 * @param eps edge classification tolerance
 */
export const sutherlandHodgeman = (
    pts: ReadonlyVec[],
    bounds: ReadonlyVec[],
    bc?: ReadonlyVec,
    eps = EPS
) => {
    bc = bc || centroid(bounds);
    for (let ne = bounds.length, j = ne - 1, i = 0; i < ne; j = i, i++) {
        const clipped = [];
        const ca = bounds[j];
        const cb = bounds[i];
        const sign = corner2(ca, cb, bc, eps);
        for (let np = pts.length, k = np - 1, l = 0; l < np; k = l, l++) {
            const p = pts[k];
            const q = pts[l];
            const cqsign = corner2(ca, cb, q, eps);
            if (corner2(ca, cb, p, eps) === sign) {
                clipped.push(
                    cqsign !== sign ? intersectLineLine(ca, cb, p, q).isec : q
                );
            } else if (cqsign === sign) {
                clipped.push(intersectLineLine(ca, cb, p, q).isec, q);
            }
        }
        if (clipped.length < 2) {
            return [];
        }
        pts = clipped;
    }
    return pts;
};

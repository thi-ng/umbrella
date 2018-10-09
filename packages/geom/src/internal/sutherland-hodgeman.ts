import { Vec2 } from "@thi.ng/vectors/vec2";
import { classify } from "./corner";
import { intersectLines2 } from "./line-intersection";

/**
 * Extended version of Sutherland-Hodgeman convex polygon clipping
 * supporting any convex boundary (not only rects). Returns new array of
 * clipped vertices.
 *
 * https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm
 *
 * @param poly subject poly
 * @param bounds clipping boundary
 * @param bc pre-computed boundary centroid
 * @param eps edge classification tolerance
 */
export const clipConvex = (poly: Vec2[], bounds: Vec2[], bc: Vec2, eps = 1e-4) => {
    for (let ne = bounds.length, j = ne - 1, i = 0; i < ne; j = i, i++) {
        const clipped = [];
        const ca = bounds[j];
        const cb = bounds[i];
        const sign = classify(ca, cb, bc, eps);
        for (let np = poly.length, k = np - 1, l = 0; l < np; k = l, l++) {
            const p = poly[k];
            const q = poly[l];
            const cqsign = classify(ca, cb, q, eps);
            if (classify(ca, cb, p, eps) === sign) {
                clipped.push(
                    cqsign !== sign ?
                        intersectLines2(ca, cb, p, q).isec :
                        q
                );
            } else if (cqsign === sign) {
                clipped.push(intersectLines2(ca, cb, p, q).isec, q);
            }
        }
        if (clipped.length < 2) {
            return [];
        }
        poly = clipped;
    }
    return poly;
};

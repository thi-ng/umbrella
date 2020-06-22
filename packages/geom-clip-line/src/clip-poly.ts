import { intersectRayPolylineAll } from "@thi.ng/geom-isec";
import { direction, ReadonlyVec, Vec } from "@thi.ng/vectors";

/**
 * Computes all intersection points of the infinite line defined by `a`,
 * `b` with the given polygon. Returns an array of segments where the
 * line is inside the polygon.
 *
 * @param a
 * @param b
 * @param pts
 */
export const clipLinePoly = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    pts: ReadonlyVec[]
) => {
    const isecs = intersectRayPolylineAll(a, direction([], a, b), pts, true)
        .isec;
    if (!isecs) return;
    const segments: Vec[][] = [];
    for (let i = 0; i < isecs.length; i += 2) {
        segments.push([<Vec>isecs[i], <Vec>isecs[i + 1]]);
    }
    return segments;
};

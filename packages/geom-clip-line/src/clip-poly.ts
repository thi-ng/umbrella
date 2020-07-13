import {
    intersectLinePolylineAll,
    intersectRayPolylineAll,
    pointInPolygon2,
} from "@thi.ng/geom-isec";
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

export const clipLineSegmentPoly = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    pts: ReadonlyVec[]
) => {
    const isecs = intersectLinePolylineAll(a, b, pts, true).isec;
    const isAInside = pointInPolygon2(a, pts);
    const isBInside = pointInPolygon2(b, pts);
    if (!isecs) {
        return isAInside && isBInside ? [[a, b]] : undefined;
    }
    isAInside && (<Vec[]>isecs).unshift(a);
    isBInside && (<Vec[]>isecs).push(b);
    const segments: Vec[][] = [];
    for (let i = 0, n = isecs.length - 1; i < n; i += 2) {
        segments.push([<Vec>isecs[i], <Vec>isecs[i + 1]]);
    }
    return segments;
};

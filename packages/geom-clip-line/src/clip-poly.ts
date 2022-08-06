import { intersectLinePolylineAll } from "@thi.ng/geom-isec/line-poly";
import { pointInPolygon2 } from "@thi.ng/geom-isec/point";
import { intersectRayPolylineAll } from "@thi.ng/geom-isec/ray-poly";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { direction2 } from "@thi.ng/vectors/direction";

/**
 * Computes all intersection points of the infinite line defined by `a`,
 * `b` with the given polygon. Returns an array of segments where the
 * line is inside the polygon.
 *
 * @param a -
 * @param b -
 * @param pts -
 */
export const clipLinePoly = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	pts: ReadonlyVec[]
) => {
	const isecs = intersectRayPolylineAll(
		a,
		direction2([], a, b),
		pts,
		true
	).isec;
	return isecs ? collectSegments(<Vec[]>isecs) : undefined;
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
	return collectSegments(<Vec[]>isecs);
};

const collectSegments = (isecs: Vec[]) => {
	const segments: Vec[][] = [];
	for (let i = 0, n = isecs.length - 1; i < n; i += 2) {
		segments.push([isecs[i], isecs[i + 1]]);
	}
	return segments;
};

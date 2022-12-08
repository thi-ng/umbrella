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
 * @param poly -
 */
export const clipLinePoly = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	poly: ReadonlyVec[]
) => {
	const isecs = intersectRayPolylineAll(
		a,
		direction2([], a, b),
		poly,
		true
	).isec;
	return isecs ? collectSegments(<Vec[]>isecs) : undefined;
};

export const clipLineSegmentPoly = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	poly: ReadonlyVec[]
) => {
	const isecs = intersectLinePolylineAll(a, b, poly, true).isec;
	const isAInside = pointInPolygon2(a, poly);
	const isBInside = pointInPolygon2(b, poly);
	if (!isecs) {
		return isAInside && isBInside ? [[a, b]] : undefined;
	}
	isAInside && (<Vec[]>isecs).unshift(a);
	isBInside && (<Vec[]>isecs).push(b);
	return collectSegments(<Vec[]>isecs);
};

/**
 * Similar to {@link clipLineSegmentPoly}, but for polylines. Returns array of
 * new vertex chunks where the given polyline is inside the given bounding poly.
 *
 * @param pts
 * @param poly
 */
export const clipPolylinePoly = (pts: ReadonlyVec[], poly: ReadonlyVec[]) => {
	let res: ReadonlyVec[][] = [];
	if (pts.length < 2) return res;
	let isAInside = pointInPolygon2(pts[0], poly);
	for (let i = 0, n = pts.length - 1; i < n; i++) {
		const a = pts[i];
		const b = pts[i + 1];
		const isBInside = pointInPolygon2(b, poly);
		const isecs = intersectLinePolylineAll(a, b, poly, true).isec;
		if (!isecs) {
			if (isAInside && isBInside) {
				if (res.length) res[res.length - 1].push(b);
				else res.push([a, b]);
			}
		} else {
			isAInside && (<Vec[]>isecs).unshift(a);
			isBInside && (<Vec[]>isecs).push(b);
			const [first, ...segments] = collectSegments(<Vec[]>isecs);
			if (isAInside) {
				if (res.length) res[res.length - 1].push(first[1]);
				else res.push(first);
			} else {
				res.push(first);
			}
			res.push(...segments);
		}
		isAInside = isBInside;
	}
	return res;
};

const collectSegments = (isecs: Vec[]) => {
	const segments: Vec[][] = [];
	for (let i = 0, n = isecs.length - 1; i < n; i += 2) {
		segments.push([isecs[i], isecs[i + 1]]);
	}
	return segments;
};

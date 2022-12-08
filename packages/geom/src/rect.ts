import type { Attribs } from "@thi.ng/geom-api";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { SQRT2_2, SQRT3 } from "@thi.ng/math/api";
import { add2 } from "@thi.ng/vectors/add";
import { ReadonlyVec, Vec, ZERO2 } from "@thi.ng/vectors/api";
import { dist } from "@thi.ng/vectors/dist";
import { maddN2 } from "@thi.ng/vectors/maddn";
import { max2 } from "@thi.ng/vectors/max";
import { min2 } from "@thi.ng/vectors/min";
import { sub2 } from "@thi.ng/vectors/sub";
import { subN2 } from "@thi.ng/vectors/subn";
import type { Circle } from "./api/circle.js";
import type { Polygon } from "./api/polygon.js";
import { Rect } from "./api/rect.js";
import { __argsVV, __asVec } from "./internal/args.js";

export function rect(pos: Vec, size: number | Vec, attribs?: Attribs): Rect;
export function rect(size: number | Vec, attribs?: Attribs): Rect;
export function rect(attribs?: Attribs): Rect;
export function rect(...args: any[]) {
	return new Rect(...__argsVV(args));
}

export const rectFromMinMax = (min: Vec, max: Vec, attribs?: Attribs) =>
	new Rect(min, sub2([], max, min), attribs);

export const rectFromMinMaxWithMargin = (
	min: Vec,
	max: Vec,
	margin: number,
	attribs?: Attribs
) => rectFromMinMax(min, max, attribs).offset(margin);

export const rectWithCentroid = (
	centroid: Vec,
	size: number | Vec,
	attribs?: Attribs
) => {
	size = __asVec(size);
	return new Rect(maddN2([], size, -0.5, centroid), size, attribs);
};

export const rectWithCentroidAndMargin = (
	centroid: Vec,
	size: number | Vec,
	margin: number,
	attribs?: Attribs
) => rectWithCentroid(centroid, size, attribs).offset(margin);

/**
 * Returns the intersection rect of given inputs or `undefined` if they
 * are non-overlapping.
 *
 * @param a -
 * @param b -
 */
export const intersectionRect = (a: Rect, b: Rect) => {
	const p = max2([], a.pos, b.pos);
	const q = min2(null, add2([], a.pos, a.size), add2([], b.pos, b.size));
	const size = max2(null, sub2(null, q, p), ZERO2);
	return size[0] > 0 && size[1] > 0 ? new Rect(p, size) : undefined;
};

/**
 * Returns square inscribed in given circle instance. The circle can also be
 * given as centroid & radius.
 *
 * @param circle - target circle
 */
export function inscribedSquare(circle: Circle): Rect;
export function inscribedSquare(pos: ReadonlyVec, r: number): Rect;
export function inscribedSquare(...args: any[]) {
	let pos: ReadonlyVec, r: number;
	if (args.length === 1) {
		const c: Circle = args[0];
		pos = c.pos;
		r = c.r;
	} else {
		[pos, r] = args;
	}
	r *= SQRT2_2;
	return rect(subN2([], pos, r), r * 2);
}

/**
 * Returns square inscribed in given (unrotated) hexagon. The hexagon
 * can be given as {@link Polygon} or centroid and edge length.
 *
 * @param hex - target hexagon
 */
export function inscribedSquareHex(hex: Polygon): Rect;
export function inscribedSquareHex(pos: ReadonlyVec, len: number): Rect;
export function inscribedSquareHex(...args: any[]) {
	let pos: ReadonlyVec, l: number;
	if (args.length === 1) {
		const pts = (<Polygon>args[0]).points;
		pos = centroid(pts);
		l = dist(pts[0], pts[1]);
	} else {
		[pos, l] = args;
	}
	l *= 3 - SQRT3;
	return rect(subN2([], pos, l / 2), l);
}

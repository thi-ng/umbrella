import type { Attribs } from "@thi.ng/geom-api";
import { SQRT2_2 } from "@thi.ng/math/api";
import { add3 } from "@thi.ng/vectors/add";
import { ZERO3, type ReadonlyVec, type Vec } from "@thi.ng/vectors/api";
import { maddN3 } from "@thi.ng/vectors/maddn";
import { max3 } from "@thi.ng/vectors/max";
import { min3 } from "@thi.ng/vectors/min";
import { sub3 } from "@thi.ng/vectors/sub";
import { subN3 } from "@thi.ng/vectors/subn";
import { AABB } from "./api/aabb.js";
import type { Sphere } from "./api/sphere.js";
import { __argsVV } from "./internal/args.js";

export function aabb(pos: Vec, size: number | Vec, attribs?: Attribs): AABB;
export function aabb(size: number | Vec, attribs?: Attribs): AABB;
export function aabb(attribs?: Attribs): AABB;
export function aabb(...args: any[]) {
	return new AABB(...__argsVV(args));
}

export const aabbFromMinMax = (min: Vec, max: Vec, attribs?: Attribs) =>
	new AABB(min, sub3([], max, min), attribs);

export const aabbFromMinMaxWithMargin = (
	min: Vec,
	max: Vec,
	margin: number,
	attribs?: Attribs
) => aabbFromMinMax(min, max, attribs).offset(margin);

export const aabbFromCentroid = (centroid: Vec, size: Vec, attribs?: Attribs) =>
	new AABB(maddN3([], size, -0.5, centroid), size, attribs);

export const aabbWithCentroidAndMargin = (
	centroid: Vec,
	size: Vec,
	margin: number,
	attribs?: Attribs
) => aabbFromCentroid(centroid, size, attribs).offset(margin);

/**
 * Returns the intersection AABB of given inputs or `undefined` if they
 * are non-overlapping.
 *
 * @param a -
 * @param b -
 */
export const intersectionAABB = (a: AABB, b: AABB) => {
	const p = max3([], a.pos, b.pos);
	const q = min3(null, add3([], a.pos, a.size), add3([], b.pos, b.size));
	const size = max3(null, sub3(null, q, p), ZERO3);
	return size[0] > 0 && size[1] > 0 && size[2] > 0
		? new AABB(p, size)
		: undefined;
};

/**
 * Returns square inscribed in given circle instance. The circle can also be
 * given as centroid & radius.
 *
 * @param sphere - target sphere
 */
export function inscribedAABB(sphere: Sphere): AABB;
export function inscribedAABB(pos: ReadonlyVec, r: number): AABB;
export function inscribedAABB(...args: any[]) {
	let pos: ReadonlyVec, r: number;
	if (args.length === 1) {
		const c: Sphere = args[0];
		pos = c.pos;
		r = c.r;
	} else {
		[pos, r] = args;
	}
	r *= SQRT2_2;
	return aabb(subN3([], pos, r), r * 2);
}

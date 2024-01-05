import { distSq2, type ReadonlyVec } from "@thi.ng/vectors";
import { sub2 } from "@thi.ng/vectors/sub";
import type { SDFAttribs, SDFn } from "./api.js";
import { withBoundingCircle } from "./bounds.js";
import {
	distArc2,
	distBox2,
	distCircle2,
	distEllipse2,
	distPolygon2,
	distPolyline2,
	distQuadratic2,
	distSegment2,
} from "./dist.js";
import { DEFAULT_MODS, withSDFModifiers } from "./ops.js";

/** @internal */
export const DEFAULT_ATTRIBS: SDFAttribs = {
	...DEFAULT_MODS,
	bounds: false,
	chamfer: 0,
	combine: "union",
	round: 0,
	smooth: 0,
};

/**
 * Syntax sugar for {@link withSDFModifiers}.
 *
 * @param fn
 * @param attribs
 */
export const withSDFAttribs = (fn: SDFn, attribs?: Partial<SDFAttribs>) =>
	attribs ? withSDFModifiers(fn, attribs) : fn;

export const arc2 = (
	center: ReadonlyVec,
	apert: ReadonlyVec,
	ra: number,
	rb: number,
	attribs: Partial<SDFAttribs> = {}
): SDFn => {
	const sdf = withSDFAttribs(
		(p) => distArc2(sub2([], p, center), apert, ra, rb),
		attribs
	);
	return attribs.bounds ? withBoundingCircle(sdf, center, ra + rb) : sdf;
};

export const box2 = (
	center: ReadonlyVec,
	size: ReadonlyVec,
	attribs?: Partial<SDFAttribs>
): SDFn => withSDFAttribs((p) => distBox2(sub2([], p, center), size), attribs);

export const circle2 = (
	center: ReadonlyVec,
	radius: number,
	attribs?: Partial<SDFAttribs>
): SDFn =>
	withSDFAttribs((p) => distCircle2(sub2([], p, center), radius), attribs);

export const ellipse2 = (
	center: ReadonlyVec,
	radii: ReadonlyVec,
	attribs: Partial<SDFAttribs> = {}
): SDFn => {
	const sdf = withSDFAttribs(
		(p) => distEllipse2(sub2([], p, center), radii),
		attribs
	);
	return attribs.bounds
		? withBoundingCircle(sdf, center, Math.max(...radii))
		: sdf;
};

export const line2 = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	attribs?: Partial<SDFAttribs>
): SDFn => withSDFAttribs((p) => distSegment2(p, a, b), attribs);

export const points2 = (
	pts: ReadonlyVec[],
	attribs: Partial<SDFAttribs> = {}
): SDFn => {
	const sdf = withSDFAttribs(
		(p) => pts.reduce((acc, q) => Math.min(acc, distSq2(p, q)), Infinity),
		attribs
	);
	return attribs.bounds ? withBoundingCircle(sdf, pts) : sdf;
};

export const polygon2 = (
	pts: ReadonlyVec[],
	attribs: Partial<SDFAttribs> = {}
): SDFn => {
	const sdf = withSDFAttribs((p) => distPolygon2(p, pts), attribs);
	return attribs.bounds ? withBoundingCircle(sdf, pts) : sdf;
};

export const polyline2 = (
	pts: ReadonlyVec[],
	attribs: Partial<SDFAttribs> = {}
): SDFn => {
	const sdf = withSDFAttribs((p) => distPolyline2(p, pts), attribs);
	return attribs.bounds ? withBoundingCircle(sdf, pts) : sdf;
};

/**
 * SDF for a single quadratic bezier segment. Similar to {@link line2}, by
 * default only computes the _unsigned_ distance to the segment. To obtain the
 * signed distance (for the "interior" region, if any), set the `abs` attribute
 * explicitly to `false`.
 *
 * @remarks
 * See {@link SDFAttribs.abs} for details.
 *
 * @param a
 * @param b
 * @param c
 * @param attribs
 */
export const quadratic2 = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	attribs?: Partial<SDFAttribs>
): SDFn =>
	withSDFAttribs(
		!attribs || attribs.abs !== false
			? (p) => distQuadratic2(p, a, b, c)
			: (p) => distQuadratic2(p, a, b, c, true),
		{ ...attribs, abs: false }
	);

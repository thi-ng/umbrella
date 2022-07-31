import type { FnU2 } from "@thi.ng/api";
import { atan2Abs } from "@thi.ng/math/angle";
import type { ReadonlyVec } from "./api.js";

const $ =
	(u: number, v: number): FnU2<ReadonlyVec, number> =>
	(a, b) =>
		atan2Abs(b[u] - a[u], b[v] - a[v]);

/**
 * Computes direction angle (in radians) of line segment `a` -> `b` in
 * XY plane.
 *
 * @param a -
 * @param b -
 */
export const headingSegmentXY = $(1, 0);

/**
 * Computes direction angle (in radians) of line segment `a` -> `b` in
 * XZ plane.
 *
 * @param a -
 * @param b -
 */
export const headingSegmentXZ = $(2, 0);

/**
 * Computes direction angle (in radians) of line segment `a` -> `b` in
 * ZY plane.
 *
 * @param a -
 * @param b -
 */
export const headingSegmentYZ = $(2, 1);

/**
 * Same as {@link headingSegmentXY}.
 */
export const headingSegment = headingSegmentXY;

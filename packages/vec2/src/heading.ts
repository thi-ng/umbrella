// SPDX-License-Identifier: Apache-2.0
import { atan2Abs } from "@thi.ng/math/angle";
import type { ReadonlyVec, VecOpRoVV } from "@thi.ng/vec-api";

/**
 * Returns orientation angle (in radians) of vector `a` in XY plane.
 *
 * @param a -
 */
export const headingXY = (a: ReadonlyVec) => atan2Abs(a[1], a[0]);

/**
 * Same as {@link headingXY}
 */
export const heading = headingXY;

/**
 * Computes direction angle (in radians) of line segment `a` -> `b` in
 * XY plane.
 *
 * @param a -
 * @param b -
 */
export const headingSegmentXY: VecOpRoVV<number> = (a, b) =>
	atan2Abs(b[1] - a[1], b[0] - a[0]);

/**
 * Same as {@link headingSegmentXY}.
 */
export const headingSegment = headingSegmentXY;

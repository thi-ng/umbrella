// SPDX-License-Identifier: Apache-2.0
import { atan2Abs } from "@thi.ng/math/angle";
import type { ReadonlyVec } from "./api.js";
import type { FnU2 } from "@thi.ng/api";

/**
 * Returns orientation angle (in radians) of 3D vector `a` in XY plane.
 *
 * @param a -
 */
export const headingXY = (a: ReadonlyVec) => atan2Abs(a[1], a[0]);

/**
 * Returns orientation angle (in radians) of 3D vector `a` in XZ plane.
 *
 * @param a -
 */
export const headingXZ = (a: ReadonlyVec) => atan2Abs(a[2], a[0]);

/**
 * Returns orientation angle (in radians) of 3D vector `a` in ZY plane.
 *
 * @param a -
 */
export const headingYZ = (a: ReadonlyVec) => atan2Abs(a[2], a[1]);

const $ =
	(u: number, v: number): FnU2<ReadonlyVec, number> =>
	(a, b) =>
		atan2Abs(b[u] - a[u], b[v] - a[v]);

/**
 * Computes direction angle (in radians) of 3D line segment `a` -> `b` in
 * XY plane.
 *
 * @param a -
 * @param b -
 */
export const headingSegmentXY = $(1, 0);

/**
 * Computes direction angle (in radians) of 3D line segment `a` -> `b` in
 * XZ plane.
 *
 * @param a -
 * @param b -
 */
export const headingSegmentXZ = $(2, 0);

/**
 * Computes direction angle (in radians) of 3D line segment `a` -> `b` in
 * ZY plane.
 *
 * @param a -
 * @param b -
 */
export const headingSegmentYZ = $(2, 1);

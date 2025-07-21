// SPDX-License-Identifier: Apache-2.0
import { atan2Abs } from "@thi.ng/math/angle";
import type { ReadonlyVec } from "./api.js";

/**
 * Returns orientation angle (in radians, `[0,TAU)` interval) of vector `a` in
 * XY plane.
 *
 * @param a -
 */
export const headingXY = (a: ReadonlyVec) => atan2Abs(a[1], a[0]);

/**
 * Returns orientation angle (in radians, `[0,TAU)` interval) of vector `a` in
 * XZ plane.
 *
 * @param a -
 */
export const headingXZ = (a: ReadonlyVec) => atan2Abs(a[2], a[0]);

/**
 * Returns orientation angle (in radians, `[0,TAU)` interval) of vector `a` in
 * ZY plane.
 *
 * @param a -
 */
export const headingYZ = (a: ReadonlyVec) => atan2Abs(a[2], a[1]);

/**
 * Same as {@link headingXY}
 */
export const heading = headingXY;

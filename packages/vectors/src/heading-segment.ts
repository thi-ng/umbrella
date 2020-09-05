import type { FnU2 } from "@thi.ng/api";
import { atan2Abs } from "@thi.ng/math";
import type { ReadonlyVec } from "./api";

/**
 * Computes direction angle (in radians) of line segment `a` -> `b` in
 * XY plane.
 *
 * @param a -
 * @param b -
 */
export const headingSegmentXY: FnU2<ReadonlyVec, number> = (a, b) =>
    atan2Abs(b[1] - a[1], b[0] - a[0]);

/**
 * Computes direction angle (in radians) of line segment `a` -> `b` in
 * XZ plane.
 *
 * @param a -
 * @param b -
 */
export const headingSegmentXZ: FnU2<ReadonlyVec, number> = (a, b) =>
    atan2Abs(b[2] - a[2], b[0] - a[0]);

/**
 * Computes direction angle (in radians) of line segment `a` -> `b` in
 * ZY plane.
 *
 * @param a -
 * @param b -
 */
export const headingSegmentYZ: FnU2<ReadonlyVec, number> = (a, b) =>
    atan2Abs(b[2] - a[2], b[1] - a[1]);

/**
 * Same as {@link headingSegmentXY}.
 */
export const headingSegment = headingSegmentXY;

import type { ReadonlyVec, Vec } from "./api.js";
import { direction } from "./direction.js";
import { perpendicularCCW, perpendicularCW } from "./perpendicular.js";

/**
 * Computes 2D normal by rotating direction vector `a` -> `b`, 90 deg
 * counterclockwise, normalized to length `n` (default: 1). If `out` is
 * null, creates new vector.
 *
 * @param out -
 * @param a -
 * @param b -
 * @param n -
 */
export const normalCCW = (out: Vec, a: ReadonlyVec, b: ReadonlyVec, n = 1) =>
	perpendicularCCW(null, direction(out || [], a, b, n));

/**
 * Computes 2D normal by rotating direction vector `a` -> `b`, 90 deg
 * clockwise, normalized to length `n` (default: 1). If `out` is null,
 * creates new vector.
 *
 * @param out -
 * @param a -
 * @param b -
 * @param n -
 */
export const normalCW = (out: Vec, a: ReadonlyVec, b: ReadonlyVec, n = 1) =>
	perpendicularCW(null, direction(out || [], a, b, n));

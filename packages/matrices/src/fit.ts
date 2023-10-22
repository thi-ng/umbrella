import type { ReadonlyVec } from "@thi.ng/vectors";
import { maddN2, maddN3 } from "@thi.ng/vectors/maddn";
import { mulN2, mulN3 } from "@thi.ng/vectors/muln";
import { safeDiv2, safeDiv3 } from "@thi.ng/vectors/safe-div";
import type { Mat } from "./api.js";
import { concat } from "./concat.js";
import { scale23, scale44 } from "./scale.js";
import { translation23, translation44 } from "./translation.js";

/**
 * Creates a 2x3 matrix which maps coordinates from a 2D source rect (defined by
 * `srcPos` and `srcSize`) to a destination rect (`destPos` & `destSize`).
 * Writes result matrix to `out` or creates new matrix if `out` is null.
 *
 * @param out
 * @param srcPos
 * @param srcSize
 * @param destPos
 * @param destSize
 */
export const fit23 = (
	out: Mat | null,
	srcPos: ReadonlyVec,
	srcSize: ReadonlyVec,
	destPos: ReadonlyVec,
	destSize: ReadonlyVec
) =>
	concat(
		out,
		translation23(null, maddN2([], destSize, 0.5, destPos)),
		scale23(null, safeDiv2([], destSize, srcSize)),
		translation23(null, mulN2(null, maddN2([], srcSize, 0.5, srcPos), -1))
	);

/**
 * Creates a 4x4 matrix which maps coordinates from a 3D source AABB (defined by
 * `srcPos` and `srcSize`) to a destination AABB (`destPos` & `destSize`).
 * Writes result matrix to `out` or creates new matrix if `out` is null.
 *
 * @param out
 * @param srcPos
 * @param srcSize
 * @param destPos
 * @param destSize
 */
export const fit44 = (
	out: Mat | null,
	srcPos: ReadonlyVec,
	srcSize: ReadonlyVec,
	destPos: ReadonlyVec,
	destSize: ReadonlyVec
) =>
	concat(
		out,
		translation44(null, maddN3([], destSize, 0.5, destPos)),
		scale44(null, safeDiv3([], destSize, srcSize)),
		translation44(null, mulN3(null, maddN3([], srcSize, 0.5, srcPos), -1))
	);

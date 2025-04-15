// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { add2, add3 } from "@thi.ng/vectors/add";
import { direction2, direction3 } from "@thi.ng/vectors/direction";

/**
 * Returns closest point to `p` on circle defined by origin `c` and radius `r`.
 *
 * @param p -
 * @param c -
 * @param r -
 * @param out -
 */
export const closestPointCircle = (
	p: ReadonlyVec,
	c: ReadonlyVec,
	r: number,
	out: Vec = []
) => add2(out, c, direction2(out, c, p, r));

/**
 * Same as {@link closestPointCircle}, but for 3D.
 */
export const closestPointSphere = (
	p: ReadonlyVec,
	c: ReadonlyVec,
	r: number,
	out: Vec = []
) => add3(out, c, direction3(out, c, p, r));

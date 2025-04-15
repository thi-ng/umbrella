// SPDX-License-Identifier: Apache-2.0
import { eqDelta } from "@thi.ng/math/eqdelta";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { add2 } from "@thi.ng/vectors/add";
import { distSq } from "@thi.ng/vectors/distsq";
import { maddN2 } from "@thi.ng/vectors/maddn";
import { mag2 } from "@thi.ng/vectors/mag";
import { mulN2 } from "@thi.ng/vectors/muln";
import { perpendicularCCW } from "@thi.ng/vectors/perpendicular";
import { sub2 } from "@thi.ng/vectors/sub";
import { IntersectionType, NONE, type IntersectionResult } from "./api.js";

/**
 * 2D only. Computes intersection between 2 given circles.
 *
 * @remarks
 * Reference:
 * https://mathworld.wolfram.com/Circle-CircleIntersection.html (eq. 5)
 *
 * @param a - circle 1 origin
 * @param b - circle 2 origin
 * @param ar - circle 1 radius
 * @param br - circle 2 radius
 */
export const intersectCircleCircle = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	ar: number,
	br: number
): IntersectionResult => {
	const delta = sub2([], b, a);
	const d = mag2(delta);
	if (eqDelta(d, 0)) {
		return { type: IntersectionType.COINCIDENT };
	}
	if (d <= ar + br && d >= Math.abs(ar - br)) {
		ar *= ar;
		const alpha = (ar - br * br + d * d) / (2 * d);
		const h = Math.sqrt(ar - alpha * alpha);
		const p = maddN2([], delta, alpha / d, a);
		const t = mulN2(null, perpendicularCCW(null, delta), h / d);
		return {
			type: IntersectionType.INTERSECT,
			isec: [add2([], p, t), sub2(null, p, t)],
		};
	}
	return NONE;
};

/**
 * Returns true, if given circles (or spheres) overlap.
 *
 * @param a - circle 1 origin
 * @param b - circle 2 origin
 * @param ar - circle 1 radius
 * @param br - circle 2 radius
 */
export const testCircleCircle = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	ar: number,
	br: number
) => distSq(a, b) <= (ar + br) ** 2;

import {
	IntersectionType,
	type IntersectionResult,
} from "@thi.ng/geom-api/isec";
import { eqDelta } from "@thi.ng/math/eqdelta";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { add } from "@thi.ng/vectors/add";
import { distSq } from "@thi.ng/vectors/distsq";
import { maddN } from "@thi.ng/vectors/maddn";
import { mag } from "@thi.ng/vectors/mag";
import { mulN } from "@thi.ng/vectors/muln";
import { perpendicularCCW } from "@thi.ng/vectors/perpendicular";
import { sub } from "@thi.ng/vectors/sub";
import { NONE } from "./api.js";

/**
 * Computes intersection between 2 given circles.
 *
 * @remarks
 * Reference:
 * https://mathworld.wolfram.com/Circle-CircleIntersection.html (eq. 5)
 *
 * @param a
 * @param b
 * @param ar
 * @param br
 */
export const intersectCircleCircle = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	ar: number,
	br: number
): IntersectionResult => {
	const delta = sub([], b, a);
	const d = mag(delta);
	if (eqDelta(d, 0)) {
		return { type: IntersectionType.COINCIDENT };
	}
	if (d <= ar + br && d >= Math.abs(ar - br)) {
		ar *= ar;
		const alpha = (ar - br * br + d * d) / (2 * d);
		const h = Math.sqrt(ar - alpha * alpha);
		const p = maddN([], delta, alpha / d, a);
		const t = mulN(null, perpendicularCCW(null, delta), h / d);
		return {
			type: IntersectionType.INTERSECT,
			isec: [add([], p, t), sub([], p, t)],
		};
	}
	return NONE;
};

export const testCircleCircle = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	ar: number,
	br: number
) => distSq(a, b) <= Math.pow(ar + br, 2);

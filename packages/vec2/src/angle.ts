import { absInnerAngle, deg, rad } from "@thi.ng/math/angle";
import type { VecOpRoVVO } from "@thi.ng/vec-api";
import { cross2 } from "./cross.js";
import { dot2 } from "./dot.js";
import { defOpV } from "./defop.js";

/**
 * Componentwise computes converts radians to degrees of given 2D vector. Also
 * see {@link radians2}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const degrees2 = defOpV(deg);

/**
 * Componentwise computes converts degrees to radians of given 2D vector. Also
 * see {@link degrees2}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const radians2 = defOpV(rad);

export const angleBetween2: VecOpRoVVO<number, boolean> = (
	a,
	b,
	absInner = false
) => {
	const t = Math.atan2(cross2(a, b), dot2(a, b));
	return absInner ? absInnerAngle(t) : t;
};

import { HALF_PI, PI } from "@thi.ng/math/api";
import { addmN } from "./addmn.js";
import type { ReadonlyVec, Vec, VecOpRoVV } from "./api.js";
import { direction2 } from "./direction.js";
import { headingXY } from "./heading.js";
import { mixN2 } from "./mixn.js";
import { normalize, normalize2 } from "./normalize.js";
import { perpendicularCCW } from "./perpendicular.js";
import { sub } from "./sub.js";

export const bisect2: VecOpRoVV<number> = (a, b) => {
	const theta = (headingXY(a) + headingXY(b)) / 2;
	return theta <= HALF_PI ? theta : PI - theta;
};

/**
 * Returns normalized bisector vector for point `b` in the triangle `a`
 * -> `b` -> `c`. If `out` is null, creates a new result vector. The `n`
 * arg can be used to scale the result vector to given length (default:
 * 1).
 *
 * @param out -
 * @param a -
 * @param b -
 * @param c -
 * @param n -
 */
export const cornerBisector = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	n = 1
) => (
	!out && (out = []),
	normalize(
		out,
		addmN(
			out,
			normalize(out, sub(out, a, b)),
			normalize(null, sub([], c, b)),
			0.5
		),
		n
	)
);

/**
 * 2D version of {@link cornerBisector} which doesn't always bisect the
 * smaller/inside angle, but also doesn't suffer sign/orientation
 * flipping of returned bisector vector.
 *
 * @remarks
 * Instead, the direction of the result is dependent on the orientation
 * of the input triangle. If `a`, `b`, `c` are in CW order, the result
 * will point away from the triangle's centroid. If CCW, the result will
 * point towards the inside.
 *
 * @param out -
 * @param a -
 * @param b -
 * @param c -
 * @param n -
 */
export const cornerBisector2 = (
	out: Vec | null,
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	n = 1
) => (
	!out && (out = []),
	perpendicularCCW(
		out,
		normalize2(
			out,
			mixN2(out, direction2(out, a, b), direction2([], b, c), 0.5),
			n
		)
	)
);

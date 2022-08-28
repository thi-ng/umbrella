import type { FnU3 } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { mixN } from "@thi.ng/vectors/mixn";
import { set } from "@thi.ng/vectors/set";

/**
 * Converts the quadratic curve defined by given control points into a cubic
 * bezier. Returns array of 4 new control points.
 *
 * @param a
 * @param b
 * @param c
 */
export const cubicFromQuadratic: FnU3<ReadonlyVec, Vec[]> = (a, b, c) => [
	set([], a),
	mixN([], a, b, 2 / 3),
	mixN([], c, b, 2 / 3),
	set([], c),
];

/**
 * Splits given cubic curve (defined by given control points) into 2 quadratic
 * curve segments approximating the original curve. The `gamma` param (in [0..1]
 * interval) can be used to control the split point (default: 0.5). Returns
 * array of new curves (each a 3-tuple of control points).
 *
 * @remarks
 * Reference: https://ttnghia.github.io/pdf/QuadraticApproximation.pdf
 *
 * @param a
 * @param b
 * @param c
 * @param d
 * @param gamma
 */
export const quadraticFromCubic = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	c: ReadonlyVec,
	d: ReadonlyVec,
	gamma = 0.5
) => {
	const qb = mixN([], a, b, 1.5 * gamma);
	const qd = mixN([], d, c, 1.5 * (1 - gamma));
	const qc = mixN([], qb, qd, gamma);
	return [
		[set([], a), qb, qc],
		[set([], qc), qd, set([], d)],
	];
};

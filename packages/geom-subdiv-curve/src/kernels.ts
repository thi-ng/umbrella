import type { FnU } from "@thi.ng/api";
import { wrapSides } from "@thi.ng/transducers/wrap-sides";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { addmN } from "@thi.ng/vectors/addmn";
import { addW2, addW3, addW5 } from "@thi.ng/vectors/addw";
import { mag2 } from "@thi.ng/vectors/mag";
import { mixN } from "@thi.ng/vectors/mixn";
import { normalize2 } from "@thi.ng/vectors/normalize";
import { perpendicularCW } from "@thi.ng/vectors/perpendicular";
import { sub2 } from "@thi.ng/vectors/sub";
import type { SubdivKernel } from "./api.js";

/**
 * HOF subdiv kernel function for computing 2 split points from 2 source
 * points, using weighted summation (thi.ng/vectors/addW2)
 *
 * @param u - split coeffs
 * @param v - split coeffs
 */
export const kernel2 =
	([ua, ub]: number[], [va, vb]: number[]) =>
	([a, b]: ReadonlyVec[]) =>
		[addW2([], a, b, ua, ub), addW2([], a, b, va, vb)];

/**
 * HOF subdiv kernel function for computing 2 split points from 3 source
 * points, using weighted summation (thi.ng/vectors/addW3)
 *
 * @param u - split coeffs
 * @param v - split coeffs
 */
export const kernel3 =
	([ua, ub, uc]: number[], [va, vb, vc]: number[]) =>
	([a, b, c]: ReadonlyVec[]) =>
		[addW3([], a, b, c, ua, ub, uc), addW3([], a, b, c, va, vb, vc)];

/**
 * HOF subdiv kernel function for computing 2 split points from 5 source
 * points, using weighted summation (thi.ng/vectors/addW5)
 *
 * @param u - split coeffs
 * @param v - split coeffs
 */
export const kernel5 =
	([ua, ub, uc, ud, ue]: number[], [va, vb, vc, vd, ve]: number[]) =>
	([a, b, c, d, e]: ReadonlyVec[]) =>
		[
			addW5([], a, b, c, d, e, ua, ub, uc, ud, ue),
			addW5([], a, b, c, d, e, va, vb, vc, vd, ve),
		];

/** @internal */
const MIDP = ([a, b]: ReadonlyVec[]) => [a, addmN([], a, b, 0.5)];
/** @internal */
const THIRDS = ([a, b]: ReadonlyVec[]) => [
	a,
	mixN([], a, b, 1 / 3),
	mixN([], a, b, 2 / 3),
];

/** @internal */
const __wrap2 = (pts: ReadonlyVec[]) => wrapSides(pts, 0, 1);
/** @internal */
const __wrap3 = (pts: ReadonlyVec[]) => wrapSides(pts, 1, 1);

/** @internal */
const __subdivOpen =
	(fn: FnU<ReadonlyVec[]>): SubdivKernel["fn"] =>
	(pts, i, n) =>
		i < n - 2 ? fn(pts) : [...fn(pts), pts[1]];

/**
 * Splits each curve / line segment into halves at midpoint. Version for
 * open curves.
 */
export const SUBDIV_MID_OPEN: SubdivKernel = {
	fn: __subdivOpen(MIDP),
	size: 2,
};

/**
 * Splits each curve / line segment into halves at midpoint. Version for
 * closed curves.
 */
export const SUBDIV_MID_CLOSED: SubdivKernel = {
	fn: MIDP,
	pre: __wrap2,
	size: 2,
};

/**
 * Splits each curve / line segment into 3 parts at 1/3 and 2/3. Version for
 * open curves.
 */
export const SUBDIV_THIRDS_OPEN: SubdivKernel = {
	fn: __subdivOpen(THIRDS),
	size: 2,
};

/**
 * Splits each curve / line segment into 3 parts at 1/3 and 2/3. Version for
 * open curves.
 */
export const SUBDIV_THIRDS_CLOSED: SubdivKernel = {
	fn: THIRDS,
	pre: __wrap2,
	size: 2,
};

const CHAIKIN_FIRST = kernel3([1 / 2, 1 / 2, 0], [0, 3 / 4, 1 / 4]);
const CHAIKIN_MAIN = kernel3([1 / 4, 3 / 4, 0], [0, 3 / 4, 1 / 4]);
const CHAIKIN_LAST = kernel3([1 / 4, 3 / 4, 0], [0, 1 / 2, 1 / 2]);

/**
 * Chaikin subdivision scheme for open curves.
 */
export const SUBDIV_CHAIKIN_OPEN: SubdivKernel = {
	fn: (pts, i, n) =>
		i == 0
			? [pts[0], ...CHAIKIN_FIRST(pts)]
			: i === n - 3
			? [...CHAIKIN_LAST(pts), pts[2]]
			: CHAIKIN_MAIN(pts),
	size: 3,
};

/**
 * Chaikin subdivision scheme for closed curves.
 */
export const SUBDIV_CHAIKIN_CLOSED: SubdivKernel = {
	fn: CHAIKIN_MAIN,
	pre: __wrap3,
	size: 3,
};

/**
 * Cubic bezier subdivision scheme for closed curves.
 */
export const SUBDIV_CUBIC_CLOSED: SubdivKernel = {
	fn: kernel3([1 / 8, 3 / 4, 1 / 8], [0, 1 / 2, 1 / 2]),
	pre: __wrap3,
	size: 3,
};

/**
 * Higher-order subdiv kernel. Takes an array of displacement offsets and
 * `closed` flag to indicate if to be used for open/closed curves. Returns a
 * {@link SubdivKernel} which results in `displace.length` points for each
 * original edge and displaces each point by `displace[i] * edgeLength` units
 * along the normal of the edge (positive values for outward displacement).
 *
 * @remarks
 * The first displace value is used for the start point of the edge (aka end
 * point of prev. edge), to keep it in place, use zero for the first value.
 *
 * @param displace
 * @param closed
 */
export const SUBDIV_DISPLACE = (
	displace: number[],
	closed = false
): SubdivKernel => ({
	size: 2,
	pre: closed ? __wrap2 : undefined,
	fn: ([a, b], i, nump) => {
		const num = displace.length;
		const delta = sub2([], b, a);
		const len = mag2(delta);
		const normal = perpendicularCW(null, normalize2([], delta));
		const res = displace.map((x, i) =>
			addW3([], a, delta, normal, 1, i / num, x * len)
		);
		if (!closed && i === nump - 2) res.push(b);
		return res;
	},
});

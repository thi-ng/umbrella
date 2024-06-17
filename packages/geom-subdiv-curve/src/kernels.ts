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
const __wrap2 = (pts: ReadonlyVec[], closed: boolean) =>
	closed ? wrapSides(pts, 0, 1) : pts;

/** @internal */
const __wrap3 = (pts: ReadonlyVec[], closed: boolean) =>
	closed ? wrapSides(pts, 1, 1) : pts;

/**
 * Splits each curve / line segment into halves at midpoint.
 */
export const SUBDIV_MID: SubdivKernel = {
	fn: ([a, b], i, nump, closed) => {
		const res = [a, addmN([], a, b, 0.5)];
		if (!closed && i === nump - 2) res.push(b);
		return res;
	},
	pre: __wrap2,
	size: 2,
};

/**
 * Splits each curve / line segment into 3 parts at 1/3 and 2/3.
 */
export const SUBDIV_THIRDS: SubdivKernel = {
	fn: ([a, b], i, nump, closed) => {
		const res = [a, mixN([], a, b, 1 / 3), mixN([], a, b, 2 / 3)];
		if (!closed && i === nump - 2) res.push(b);
		return res;
	},
	pre: __wrap2,
	size: 2,
};

const CHAIKIN_FIRST = kernel3([1 / 2, 1 / 2, 0], [0, 3 / 4, 1 / 4]);
const CHAIKIN_MAIN = kernel3([1 / 4, 3 / 4, 0], [0, 3 / 4, 1 / 4]);
const CHAIKIN_LAST = kernel3([1 / 4, 3 / 4, 0], [0, 1 / 2, 1 / 2]);

/**
 * Chaikin subdivision scheme for open curves.
 */
export const SUBDIV_CHAIKIN: SubdivKernel = {
	fn: (pts, i, n, closed) =>
		closed
			? CHAIKIN_MAIN(pts)
			: i == 0
			? [pts[0], ...CHAIKIN_FIRST(pts)]
			: i === n - 3
			? [...CHAIKIN_LAST(pts), pts[2]]
			: CHAIKIN_MAIN(pts),
	pre: __wrap3,
	size: 3,
};

const CUBIC_MAIN = kernel3([1 / 8, 3 / 4, 1 / 8], [0, 1 / 2, 1 / 2]);

/**
 * Cubic bezier subdivision scheme. Currently ONLY supported for closed curves.
 */
export const SUBDIV_CUBIC: SubdivKernel = {
	fn: (pts) => CUBIC_MAIN(pts),
	pre: (pts) => wrapSides(pts, 1, 1),
	size: 3,
};

const DLG_MAIN = kernel5(
	[0, 0, 1, 0, 0],
	[0, -1 / 16, 9 / 16, 9 / 16, -1 / 16]
);

/**
 * Subdivision kernel for Dyn-Levin-Gregory subdivision. Currently ONLY
 * supported for closed curves.
 *
 * @remarks
 * Reference:
 * - https://web.archive.org/web/20060816003547/https://algorithmicbotany.org/papers/subgpu.sig2003.pdf
 */
export const SUBDIV_DLG: SubdivKernel = {
	fn: (pts) => DLG_MAIN(pts),
	pre: (pts) => wrapSides(pts, 2, 2),
	size: 5,
};

/**
 * Higher-order subdiv kernel. Takes an array of 2-tuples of `[t,x]` where `t`
 * is the normalized split position (along each edge) and `x` is the normalized
 * displacement amount (relative to edge length). The `closed` flag indicates if
 * to be used for open/closed curves. Returns a {@link SubdivKernel} which
 * results in `displace.length` points for each original edge and displaces each
 * point by `displace[i][1] * edgeLength` units along the normal of the edge.
 *
 * @remarks
 * The original edge end points are always remaining in place. The normalized
 * split positions `t` must be in the open (0,1) interval.
 *
 * @example
 * ```ts tangle:../export/subdiv-displace.ts
 * import { subdivide, SUBDIV_DISPLACE } from "@thi.ng/geom-subdiv-curve";
 *
 * // define subdiv kernel w/ custom displacements
 * const kernel = SUBDIV_DISPLACE([[0.25, 0.25], [0.75, -0.25]]);
 *
 * // subdivide polyline with the kernel
 * console.log(
 *   subdivide([[0,0], [100, 100], [200, 0]], kernel)
 * );
 * // [
 * //   [ 0, 0 ], [ 50, 0 ], [ 50, 100 ], [ 100, 100 ],
 * //   [100, 50 ], [ 200, 50 ], [ 200, 0 ]
 * // ]
 * ```
 *
 * @param displace
 */
export const SUBDIV_DISPLACE = (displace: number[][]): SubdivKernel => ({
	fn: ([a, b], i, nump, closed) => {
		const delta = sub2([], b, a);
		const len = mag2(delta);
		const normal = perpendicularCW(null, normalize2([], delta));
		const res = [
			a,
			...displace.map(([t, x]) =>
				addW3([], a, delta, normal, 1, t, x * len)
			),
		];
		if (!closed && i === nump - 2) res.push(b);
		return res;
	},
	size: 2,
	pre: __wrap2,
});

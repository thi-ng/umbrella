import { EPS as e } from "@thi.ng/math/api";
import { eqDelta as eq } from "@thi.ng/math/eqdelta";
import type { MultiVecOpRoVVO, ReadonlyVec, VecOpRoVVO } from "./api.js";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { vop } from "./vop.js";

/**
 * Returns true if if given 2D vectors `a` and `b` are componentwise equal with
 * `eps` as tolerance.
 */
export const eqDelta2: VecOpRoVVO<boolean, number> = (a, b, eps = e) => {
	return a.length === b.length && eq(a[0], b[0], eps) && eq(a[1], b[1], eps);
};

/**
 * Returns true if if given 3D vectors `a` and `b` are componentwise equal with
 * `eps` as tolerance.
 */
export const eqDelta3: VecOpRoVVO<boolean, number> = (a, b, eps = e) => {
	return (
		a.length === b.length &&
		eq(a[0], b[0], eps) &&
		eq(a[1], b[1], eps) &&
		eq(a[2], b[2], eps)
	);
};

/**
 * Returns true if if given 4D vectors `a` and `b` are componentwise equal with
 * `eps` as tolerance.
 */
export const eqDelta4: VecOpRoVVO<boolean, number> = (a, b, eps = e) => {
	return (
		a.length === b.length &&
		eq(a[0], b[0], eps) &&
		eq(a[1], b[1], eps) &&
		eq(a[2], b[2], eps) &&
		eq(a[3], b[3], eps)
	);
};

/**
 * Returns true if if given nD vectors `a` and `b` are componentwise equal with
 * `eps` as tolerance. Multi-method.
 */
export const eqDelta: MultiVecOpRoVVO<boolean, number> = vop(
	0,
	(v1, v2, eps = e) => {
		if (implementsFunction(v1, "eqDelta")) {
			return v1.eqDelta(v2, eps);
		}
		if (implementsFunction(v2, "eqDelta")) {
			return v2.eqDelta(v1, eps);
		}
		return eqDeltaS(v1, v2, v1.length, eps);
	},
	eqDelta2,
	eqDelta3,
	eqDelta4
);

/**
 * Checks given strided vectors for componentwise equality, taking tolerance
 * `eps` (default:
 * [`EPS`](https://docs.thi.ng/umbrella/math/variables/EPS.html)) into account.
 *
 * @param a - first vector
 * @param b - second vector
 * @param n - number of elements
 * @param eps - tolerance
 * @param ia - start index a
 * @param ib - start index b
 * @param sa - stride a
 * @param sb - stride b
 */
export const eqDeltaS = (
	a: ReadonlyVec,
	b: ReadonlyVec,
	n: number,
	eps = e,
	ia = 0,
	ib = 0,
	sa = 1,
	sb = 1
) => {
	for (; n > 0; n--, ia += sa, ib += sb) {
		if (!eq(a[ia], b[ib], eps)) {
			return false;
		}
	}
	return true;
};

export const eqDeltaArray = (a: ReadonlyVec[], b: ReadonlyVec[], eps = e) => {
	if (a === b) return true;
	if (a.length !== b.length) return false;
	for (let i = a.length; i-- > 0; ) {
		if (!eqDelta(a[i], b[i], eps)) {
			return false;
		}
	}
	return true;
};

export const isInArray = (p: ReadonlyVec, pts: ReadonlyVec[], eps = e) => {
	for (let i = pts.length; i-- > 0; ) {
		if (eqDelta(p, pts[i], eps)) {
			return true;
		}
	}
	return false;
};

// SPDX-License-Identifier: Apache-2.0
import { EPS } from "@thi.ng/math/api";
import type {
	VecOpSGVO,
	VecOpSRoV,
	VecOpSV,
	VecOpSVN,
	VecOpSVO,
} from "./api.js";
import { magS, magS2, magS3, magS4 } from "./mags.js";
import { mulNS, mulNS2, mulNS3, mulNS4 } from "./mulns.js";
import { setS, setS2, setS3, setS4 } from "./sets.js";

/**
 * Normalizes strided vector to given (optional) length (default: 1). If `out`
 * is null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const normalizeS: VecOpSGVO<number> = (
	out,
	v,
	num,
	n = 1,
	io = 0,
	ia = 0,
	so = 1,
	sa = 1
) => {
	!out && (out = v);
	const m = magS(v, num, ia, sa);
	return m >= EPS
		? mulNS(out, v, n / m, num, io, ia, so, sa)
		: out !== v
		? setS(out, v, num, io, ia, so, sa)
		: out;
};

const $ =
	(mag: VecOpSRoV<number>, mulN: VecOpSVN, set: VecOpSV): VecOpSVO<number> =>
	(out, v, n = 1, io = 0, ia = 0, so = 1, sa = 1) => {
		!out && (out = v);
		const m = mag(v, ia, sa);
		return m >= EPS
			? mulN(out, v, n / m, io, ia, so, sa)
			: out !== v
			? set(out, v, io, ia, so, sa)
			: out;
	};

/**
 * Normalizes strided 2D vector to given (optional) length (default: 1). If `out`
 * is null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const normalizeS2 = $(magS2, mulNS2, setS2);

/**
 * Normalizes vector to given (optional) length (default: 1). If `out`
 * is null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const normalizeS3 = $(magS3, mulNS3, setS3);

/**
 * Normalizes vector to given (optional) length (default: 1). If `out`
 * is null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 * @param n -
 */
export const normalizeS4 = $(magS4, mulNS4, setS4);

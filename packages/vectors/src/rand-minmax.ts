// SPDX-License-Identifier: Apache-2.0
import { type IRandom } from "@thi.ng/random";
import { SYSTEM as op } from "@thi.ng/random/system";
import type { MultiVecOpVVO, VecOpVVO } from "./api.js";
import { vop } from "./vop.js";

/**
 * Sets `out` to random 2D vector with each component in the semi-open interval
 * defined by `[min,max)`.
 *
 * @param a - vector
 * @param b - input vector (min. bounds)
 * @param c - input vector (max. bounds)
 * @param rnd - PRNG instance
 */
export const randMinMax2: VecOpVVO<IRandom> = (o, a, b, rnd = op) => {
	!o && (o = a);
	o[0] = rnd.minmax(a[0], b[0]);
	o[1] = rnd.minmax(a[1], b[1]);
	return o;
};

/**
 * Sets `out` to random 3D vector with each component in the semi-open interval
 * defined by `[min,max)`.
 *
 * @param a - vector
 * @param b - input vector (min. bounds)
 * @param c - input vector (max. bounds)
 * @param rnd - PRNG instance
 */
export const randMinMax3: VecOpVVO<IRandom> = (o, a, b, rnd = op) => {
	!o && (o = a);
	o[0] = rnd.minmax(a[0], b[0]);
	o[1] = rnd.minmax(a[1], b[1]);
	o[2] = rnd.minmax(a[2], b[2]);
	return o;
};

/**
 * Sets `out` to random 4D vector with each component in the semi-open interval
 * defined by `[min,max)`.
 *
 * @param a - vector
 * @param b - input vector (min. bounds)
 * @param c - input vector (max. bounds)
 * @param rnd - PRNG instance
 */
export const randMinMax4: VecOpVVO<IRandom> = (o, a, b, rnd = op) => {
	!o && (o = a);
	o[0] = rnd.minmax(a[0], b[0]);
	o[1] = rnd.minmax(a[1], b[1]);
	o[2] = rnd.minmax(a[2], b[2]);
	o[3] = rnd.minmax(a[3], b[3]);
	return o;
};

/**
 * Sets `out` to random nD vector with each component in the semi-open interval
 * defined by `[min,max)`. Multi-method.
 *
 * @param a - vector
 * @param b - input vector (min. bounds)
 * @param c - input vector (max. bounds)
 * @param rnd - PRNG instance
 */
export const randMinMax: MultiVecOpVVO<IRandom> = vop(
	1,
	(o, a, b, rnd = op) => {
		!o && (o = a);
		for (let i = a.length; i-- > 0; ) o[i] = rnd.minmax(a[i], b[i]);
		return o;
	}
);

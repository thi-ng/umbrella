// SPDX-License-Identifier: Apache-2.0
import { clamp as op } from "@thi.ng/math/interval";
import type { MultiVecOpVNN, VecOpVNN } from "./api.js";
import { vop } from "./vop.js";

/**
 * Componentwise constrains value of given 2D vector `a` to the closed interval
 * defined by scalars `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - scalar
 * @param c - scalar
 */
export const clampN2: VecOpVNN = (o, a, b, c) => {
	!o && (o = a);
	o[0] = op(a[0], b, c);
	o[1] = op(a[1], b, c);
	return o;
};

/**
 * Componentwise constrains value of given 3D vector `a` to the closed interval
 * defined by scalars `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - scalar
 * @param c - scalar
 */
export const clampN3: VecOpVNN = (o, a, b, c) => {
	!o && (o = a);
	o[0] = op(a[0], b, c);
	o[1] = op(a[1], b, c);
	o[2] = op(a[2], b, c);
	return o;
};

/**
 * Componentwise constrains value of given 3D vector `a` to the closed interval
 * defined by scalars `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - scalar
 * @param c - scalar
 */
export const clampN4: VecOpVNN = (o, a, b, c) => {
	!o && (o = a);
	o[0] = op(a[0], b, c);
	o[1] = op(a[1], b, c);
	o[2] = op(a[2], b, c);
	o[3] = op(a[3], b, c);
	return o;
};

/**
 * Componentwise constrains value of given nD vector `a` to the closed interval
 * defined by scalars `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - scalar
 * @param c - scalar
 */
export const clampN: MultiVecOpVNN = vop(
	1,
	(o, a, b, c) => {
		!o && (o = a);
		for (let i = a.length; i-- > 0; ) o[i] = op(a[i], b, c);
		return o;
	},
	clampN2,
	clampN3,
	clampN4
);

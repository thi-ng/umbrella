// SPDX-License-Identifier: Apache-2.0
import type { MultiVecOpV, VecOpV } from "./api.js";
import { vop } from "./vop.js";

/**
 * Copies 2D vector `a` to `o` (or if latter is null, creates a new vector).
 *
 * @param o - output vector
 * @param a - input vector
 */
export const set2: VecOpV = (o, a) => {
	!o && (o = []);
	o[0] = a[0];
	o[1] = a[1];
	return o;
};

/**
 * Copies 3D vector `a` to `o` (or if latter is null, creates a new vector).
 *
 * @param o - output vector
 * @param a - input vector
 */
export const set3: VecOpV = (o, a) => {
	!o && (o = []);
	o[0] = a[0];
	o[1] = a[1];
	o[2] = a[2];
	return o;
};

/**
 * Copies 4D vector `a` to `o` (or if latter is null, creates a new vector).
 *
 * @param o - output vector
 * @param a - input vector
 */
export const set4: VecOpV = (o, a) => {
	!o && (o = []);
	o[0] = a[0];
	o[1] = a[1];
	o[2] = a[2];
	o[3] = a[3];
	return o;
};

/**
 * Copies nD vector `a` to `o` (or if latter is null, creates a new vector).
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const set: MultiVecOpV = vop(
	1,
	(o, a) => {
		!o && (o = []);
		for (let i = a.length; i-- > 0; ) o[i] = a[i];
		return o;
	},
	set2,
	set3,
	set4
);

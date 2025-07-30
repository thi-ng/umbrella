// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec } from "./api.js";
import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV(Math.max);

/**
 * Componentwise computes `Math.max` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const max = a;

/**
 * Componentwise computes `Math.max` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const max2 = b;

/**
 * Componentwise computes `Math.max` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const max3 = c;

/**
 * Componentwise computes `Math.max` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const max4 = d;

/**
 * Returns max. vector component value. Returns -∞ if vector is empty.
 *
 * @param v
 */
export const vmax = (v: ReadonlyVec) => {
	let max = -Infinity;
	for (let i = v.length; i-- > 0; ) max = Math.max(max, v[i]);
	return max;
};

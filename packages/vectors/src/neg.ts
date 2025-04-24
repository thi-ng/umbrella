// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV((a) => -a);

/**
 * Componentwise changes the sign of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const neg = a;

/**
 * Componentwise changes the sign of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const neg2 = b;

/**
 * Componentwise changes the sign of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const neg3 = c;

/**
 * Componentwise changes the sign of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const neg4 = d;

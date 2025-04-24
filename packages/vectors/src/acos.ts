// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.acos);

/**
 * Componentwise computes `Math.acos` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const acos = a;

/**
 * Componentwise computes `Math.acos` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const acos2 = b;

/**
 * Componentwise computes `Math.acos` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const acos3 = c;

/**
 * Componentwise computes `Math.acos` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const acos4 = d;

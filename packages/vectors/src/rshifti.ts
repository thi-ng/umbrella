// SPDX-License-Identifier: Apache-2.0
import { defOpVV } from "./defopvv.js";
import { $rsI } from "./ops.js";

const [a, b, c, d] = defOpVV($rsI);

/**
 * Componentwise binary right shift of given nD signed integer vector `a`.
 * Vector `b` contains the shift amounts. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const rshiftI = a;

/**
 * Componentwise binary right shift of given 2D signed integer vector `a`.
 * Vector `b` contains the shift amounts.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const rshiftI2 = b;

/**
 * Componentwise binary right shift of given 3D signed integer vector `a`.
 * Vector `b` contains the shift amounts.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const rshiftI3 = c;

/**
 * Componentwise binary right shift of given 4D signed integer vector `a`.
 * Vector `b` contains the shift amounts.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const rshiftI4 = d;

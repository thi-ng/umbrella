// SPDX-License-Identifier: Apache-2.0
import { defOpVV } from "./defopvv.js";
import { $bandI } from "./ops.js";

const [a, b, c, d] = defOpVV($bandI);

/**
 * Componentwise binary AND of given nD signed integer vectors. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitAndI = a;

/**
 * Componentwise binary AND of given 2D signed integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitAndI2 = b;

/**
 * Componentwise binary AND of given 3D signed integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitAndI3 = c;

/**
 * Componentwise binary AND of given 4D signed integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitAndI4 = d;

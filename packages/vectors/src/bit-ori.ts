// SPDX-License-Identifier: Apache-2.0
import { defOpVV } from "./defopvv.js";
import { $borI } from "./ops.js";

const [a, b, c, d] = defOpVV($borI);

/**
 * Componentwise binary OR of given nD signed integer vectors. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrI = a;

/**
 * Componentwise binary OR of given 2D signed integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrI2 = b;

/**
 * Componentwise binary OR of given 3D signed integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrI3 = c;

/**
 * Componentwise binary OR of given 4D signed integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrI4 = d;

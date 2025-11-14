// SPDX-License-Identifier: Apache-2.0
import { defOpVV } from "./defopvv.js";
import { $mulI } from "./ops.js";

const [a, b, c, d] = defOpVV($mulI);

/**
 * Componentwise nD signed integer vector multiplication. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulI = a;

/**
 * Componentwise 2D signed integer vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulI2 = b;

/**
 * Componentwise 3D signed integer vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulI3 = c;

/**
 * Componentwise 4D signed integer vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulI4 = d;

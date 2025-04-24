// SPDX-License-Identifier: Apache-2.0
import { defOpVV } from "./defopvv.js";
import { $divI } from "./ops.js";

const [a, b, c, d] = defOpVV($divI);

/**
 * Componentwise nD signed integer vector division. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const divI = a;

/**
 * Componentwise 2D signed integer vector division.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const divI2 = b;

/**
 * Componentwise 3D signed integer vector division.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const divI3 = c;

/**
 * Componentwise 4D signed integer vector division.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const divI4 = d;

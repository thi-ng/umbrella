// SPDX-License-Identifier: Apache-2.0
import { defOpVVV } from "./defopvvv.js";
import { $subm } from "./ops.js";

const [a, b, c, d] = defOpVVV($subm);

/**
 * Componentwise nD vector subtract-multiply. `o = (a - b) * c`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const subm = a;

/**
 * Componentwise 2D vector subtract-multiply. `o = (a - b) * c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const subm2 = b;

/**
 * Componentwise 3D vector subtract-multiply. `o = (a - b) * c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const subm3 = c;

/**
 * Componentwise 4D vector subtract-multiply. `o = (a - b) * c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const subm4 = d;

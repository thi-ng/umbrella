// SPDX-License-Identifier: Apache-2.0
import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV(Math.atan2);

/**
 * Componentwise computes `Math.atan2` of the two given nD vectors.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const atan2 = a;

/**
 * Componentwise computes `Math.atan2` of the two given 2D vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const atan2_2 = b;
/**
 * Componentwise computes `Math.atan2` of the two given 3D vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const atan2_3 = c;
/**
 * Componentwise computes `Math.atan2` of the two given 4D vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const atan2_4 = d;

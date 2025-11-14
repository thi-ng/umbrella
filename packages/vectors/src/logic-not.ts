// SPDX-License-Identifier: Apache-2.0
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV<boolean>((a) => !a);

/**
 * Componentwise logic NOT of given nD boolean vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const logicNot = a;

/**
 * Componentwise logic NOT of given 2D boolean vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const logicNot2 = b;

/**
 * Componentwise logic NOT of given 3D boolean vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const logicNot3 = c;

/**
 * Componentwise logic NOT of given 4D boolean vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const logicNot4 = d;

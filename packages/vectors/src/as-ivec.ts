// SPDX-License-Identifier: Apache-2.0
import { defOpVNew } from "./defopv-new.js";

const [a, b, c, d] = defOpVNew<number, number>((x) => x | 0, 1);

/**
 * Componentwise converts given nD vector to signed integer. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asIVec = a;

/**
 * Componentwise converts given 2D vector to signed integer.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asIVec2 = b;
/**
 * Componentwise converts given 3D vector to signed integer.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asIVec3 = c;

/**
 * Componentwise converts given 4D vector to signed integer.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asIVec4 = d;

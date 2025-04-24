// SPDX-License-Identifier: Apache-2.0
import { defOpVNew } from "./defopv-new.js";

const [a, b, c, d] = defOpVNew<number, boolean>((x) => !!x, 1);

/**
 * Componentwise converts given nD vector to boolean. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asBVec = a;

/**
 * Componentwise converts given 2D vector to boolean.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asBVec2 = b;

/**
 * Componentwise converts given 3D vector to boolean.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asBVec3 = c;

/**
 * Componentwise converts given 4D vector to boolean.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asBVec4 = d;

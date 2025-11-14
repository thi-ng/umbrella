// SPDX-License-Identifier: Apache-2.0
import { defOpVNew } from "./defopv-new.js";

const [a, b, c, d] = defOpVNew<boolean, number>((x) => ~~x, 1);

/**
 * Componentwise converts given nD boolean vector to floating point (0 or 1).
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fromBVec = a;

/**
 * Componentwise converts given 2D boolean vector to floating point (0 or 1).
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fromBVec2 = b;

/**
 * Componentwise converts given 3D boolean vector to floating point (0 or 1).
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fromBVec3 = c;

/**
 * Componentwise converts given 4D boolean vector to floating point (0 or 1).
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fromBVec4 = d;

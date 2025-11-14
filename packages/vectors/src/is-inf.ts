// SPDX-License-Identifier: Apache-2.0
import { defOpVNew } from "./defopv-new.js";

const [a, b, c, d] = defOpVNew<number, boolean>((a) => !isFinite(a), 1);

/**
 * Componentwise checks if given 2D vector is infinite and writes results to
 * boolean output vector. If `out` is null, creates a new result vector.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isInf = a;

/**
 * Componentwise checks if given 2D vector is infinite and writes results to
 * boolean output vector. If `out` is null, creates a new result vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isInf2 = b;

/**
 * Componentwise checks if given 3D vector is infinite and writes results to
 * boolean output vector. If `out` is null, creates a new result vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isInf3 = c;

/**
 * Componentwise checks if given 4D vector is infinite and writes results to
 * boolean output vector. If `out` is null, creates a new result vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isInf4 = d;

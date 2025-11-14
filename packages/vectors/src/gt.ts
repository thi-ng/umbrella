// SPDX-License-Identifier: Apache-2.0
import { defOpVVNew } from "./defopvv-new.js";

const [a, b, c, d] = defOpVVNew<number, boolean>((a, b) => a > b);

/**
 * Compnentwise checks if given nD vector `a` is greater than `b` and writes
 * results to boolean output vector. If `out` is null, creates a new result
 * vector. Multi-method.
 */
export const gt = a;

/**
 * Compnentwise checks if given 2D vector `a` is greater than `b` and writes
 * results to boolean output vector. If `out` is null, creates a new result
 * vector.
 */
export const gt2 = b;

/**
 * Compnentwise checks if given 2D vector `a` is greater than `b` and writes
 * results to boolean output vector. If `out` is null, creates a new result
 * vector.
 */
export const gt3 = c;

/**
 * Compnentwise checks if given 2D vector `a` is greater than `b` and writes
 * results to boolean output vector. If `out` is null, creates a new result
 * vector.
 */
export const gt4 = d;

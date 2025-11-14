// SPDX-License-Identifier: Apache-2.0
import { defOpVVNew } from "./defopvv-new.js";

const [a, b, c, d] = defOpVVNew<number, boolean>((a, b) => a < b);

/**
 * Compnentwise checks if given nD vector `a` is less than `b` and writes
 * results to boolean output vector. If `out` is null, creates a new result
 * vector. Multi-method.
 */
export const lt = a;

/**
 * Compnentwise checks if given 2D vector `a` is less than `b` and writes
 * results to boolean output vector. If `out` is null, creates a new result
 * vector.
 */
export const lt2 = b;

/**
 * Compnentwise checks if given 2D vector `a` is less than `b` and writes
 * results to boolean output vector. If `out` is null, creates a new result
 * vector.
 */
export const lt3 = c;

/**
 * Compnentwise checks if given 2D vector `a` is less than `b` and writes
 * results to boolean output vector. If `out` is null, creates a new result
 * vector.
 */
export const lt4 = d;

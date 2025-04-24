// SPDX-License-Identifier: Apache-2.0
import { defOpVV } from "./defopvv.js";
import { $fmod } from "./ops.js";

const [a, b, c, d] = defOpVV($fmod);

/**
 * Multi-method. Similar to {@link mod}, {@link remainder}. This version of
 * modulo uses the same logic as the standard C function `fmod` and/or the JS
 * `%` operator, yielding results with the same sign as `a`, i.e. computes
 * `a-b*trunc(a/b)`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const fmod = a;

/**
 * Similar to {@link mod2}, {@link remainder2}. This version of modulo uses the
 * same logic as the standard C function `fmod` and/or the JS `%` operator,
 * yielding results with the same sign as `a`, i.e. computes `a-b*trunc(a/b)`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const fmod2 = b;

/**
 * Similar to {@link mod3}, {@link remainder3}. This version of modulo uses the
 * same logic as the standard C function `fmod` and/or the JS `%` operator,
 * yielding results with the same sign as `a`, i.e. computes `a-b*trunc(a/b)`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const fmod3 = c;

/**
 * Similar to {@link mod4}, {@link remainder4}. This version of modulo uses the
 * same logic as the standard C function `fmod` and/or the JS `%` operator,
 * yielding results with the same sign as `a`, i.e. computes `a-b*trunc(a/b)`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const fmod4 = d;

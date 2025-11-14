// SPDX-License-Identifier: Apache-2.0
import { safeDiv as op } from "@thi.ng/math/safe-div";
import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV(op);

/**
 * Componentwise divides given 2D vector `a` by vector `b`. If a divisor
 * component is zero, the result will be zero too. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const safeDiv = a;

/**
 * Componentwise divides given 2D vector `a` by vector `b`. If a divisor
 * component is zero, the result will be zero too.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const safeDiv2 = b;

/**
 * Componentwise divides given 3D vector `a` by vector `b`. If a divisor
 * component is zero, the result will be zero too.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const safeDiv3 = c;

/**
 * Componentwise divides given 4D vector `a` by vector `b`. If a divisor
 * component is zero, the result will be zero too.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const safeDiv4 = d;

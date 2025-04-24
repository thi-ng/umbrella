// SPDX-License-Identifier: Apache-2.0
import { remainder as op } from "@thi.ng/math/libc";
import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN(op);

/**
 * Same as {@link remainder2}, but but second operand is a single scalar
 * (uniform domain for all vector components). Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const remainderN = a;

/**
 * Same as {@link remainder2}, but but second operand is a single scalar
 * (uniform domain for all vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const remainderN2 = b;

/**
 * Same as {@link remainder3}, but but second operand is a single scalar
 * (uniform domain for all vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const remainderN3 = c;

/**
 * Same as {@link remainder4}, but but second operand is a single scalar
 * (uniform domain for all vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const remainderN4 = d;

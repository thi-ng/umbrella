// SPDX-License-Identifier: Apache-2.0
import { roundTo } from "@thi.ng/math/prec";
import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN(roundTo);

/**
 * Componentwise rounds given nD vector `a` to multiples of uniform scalar `n`.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const roundN = a;

/**
 * Componentwise rounds given 2D vector `a` to multiples of uniform scalar `n`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const roundN2 = b;

/**
 * Componentwise rounds given 3D vector `a` to multiples of uniform scalar `n`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const roundN3 = c;

/**
 * Componentwise rounds given 4D vector `a` to multiples of uniform scalar `n`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const roundN4 = d;

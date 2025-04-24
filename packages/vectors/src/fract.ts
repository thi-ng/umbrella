// SPDX-License-Identifier: Apache-2.0
import { fract as op } from "@thi.ng/math/prec";
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(op);

/**
 * Componentwise computes fractional parts of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fract = a;

/**
 * Componentwise computes fractional parts of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fract2 = b;

/**
 * Componentwise computes fractional parts of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fract3 = c;

/**
 * Componentwise computes fractional parts of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fract4 = d;

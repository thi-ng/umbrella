// SPDX-License-Identifier: Apache-2.0
import { deg } from "@thi.ng/math/angle";
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(deg);

/**
 * Componentwise computes converts radians to degrees of given nD vector. Also
 * see {@link radians}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const degrees = a;

/**
 * Componentwise computes converts radians to degrees of given 2D vector. Also
 * see {@link radians2}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const degrees2 = b;

/**
 * Componentwise computes converts radians to degrees of given 3D vector. Also
 * see {@link radians3}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const degrees3 = c;

/**
 * Componentwise computes converts radians to degrees of given 4D vector. Also
 * see {@link radians4}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const degrees4 = d;

// SPDX-License-Identifier: Apache-2.0
import { rad } from "@thi.ng/math/angle";
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(rad);

/**
 * Componentwise computes converts degrees to radians of given 2D vector. Also
 * see {@link degrees}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const radians = a;

/**
 * Componentwise computes converts degrees to radians of given 2D vector. Also
 * see {@link degrees2}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const radians2 = b;

/**
 * Componentwise computes converts degrees to radians of given 3D vector. Also
 * see {@link degrees3}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const radians3 = c;

/**
 * Componentwise computes converts degrees to radians of given 4D vector. Also
 * see {@link degrees4}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const radians4 = d;

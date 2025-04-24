// SPDX-License-Identifier: Apache-2.0
import { wrap as op } from "@thi.ng/math/interval";
import { defOpVVV } from "./defopvvv.js";

const [a, b, c, d] = defOpVVV(op);

/**
 * Componentwise folds given 2D vector `a` into the closed interval defined by
 * vectors `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const wrap = a;

/**
 * Componentwise folds given 2D vector `a` into the closed interval defined by
 * vectors `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const wrap2 = b;

/**
 * Componentwise folds given 3D vector `a` into the closed interval defined by
 * vectors `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const wrap3 = c;

/**
 * Componentwise folds given 4D vector `a` into the closed interval defined by
 * vectors `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const wrap4 = d;

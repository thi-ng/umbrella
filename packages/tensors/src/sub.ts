// SPDX-License-Identifier: Apache-2.0
import { $sub } from "@thi.ng/vectors/ops";
import { defOpTT } from "./defoptt.js";

const [a, b, c, d, e] = defOpTT($sub);

/**
 * Componentwise nD tensor subtraction. Writes result to `out`. If `out` is
 * null, mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const sub = a;

/**
 * Same as {@link sub} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const sub1 = b;

/**
 * Same as {@link sub} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const sub2 = c;

/**
 * Same as {@link sub} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const sub3 = d;

/**
 * Same as {@link sub} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const sub4 = e;

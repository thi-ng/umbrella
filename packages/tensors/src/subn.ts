// SPDX-License-Identifier: Apache-2.0
import { $sub } from "@thi.ng/vectors/ops";
import { defOpTN } from "./defoptn.js";

const [a, b, c, d, e] = defOpTN($sub);

/**
 * Componentwise nD tensor subtraction with uniform scalar `n`. Writes result to
 * `out`. If `out` is null, mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const subN = a;

/**
 * Same as {@link subN} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const subN1 = b;

/**
 * Same as {@link subN} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const subN2 = c;

/**
 * Same as {@link subN} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const subN3 = d;

/**
 * Same as {@link subN} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const subN4 = e;

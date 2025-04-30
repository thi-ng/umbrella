// SPDX-License-Identifier: Apache-2.0
import { $mul } from "@thi.ng/vectors/ops";
import { defOpTN } from "./defoptn.js";

const [a, b, c, d, e] = defOpTN($mul);

/**
 * Componentwise nD tensor multiplication with uniform scalar `n`. Writes result
 * to `out`. If `out` is null, mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mulN = a;

/**
 * Same as {@link mulN} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mulN1 = b;

/**
 * Same as {@link mulN} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mulN2 = c;

/**
 * Same as {@link mulN} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mulN3 = d;

/**
 * Same as {@link mulN} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mulN4 = e;

// SPDX-License-Identifier: Apache-2.0
import { $add } from "@thi.ng/vectors/ops";
import { defOpTN } from "./defoptn.js";

const [a, b, c, d, e] = defOpTN($add);

/**
 * Componentwise nD tensor addition with uniform scalar `n`. Writes result to
 * `out`. If `out` is null, mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const addN = a;

/**
 * Same as {@link addN} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const addN1 = b;

/**
 * Same as {@link addN} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const addN2 = c;

/**
 * Same as {@link addN} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const addN3 = d;

/**
 * Same as {@link addN} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const addN4 = e;

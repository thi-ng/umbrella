// SPDX-License-Identifier: Apache-2.0
import { defOpTN } from "./defoptn.js";

const [a, b, c, d, e] = defOpTN(Math.pow);

/**
 * Componentwise computes `Math.pow` of given nD tensor and uniform scalar `n`.
 * Writes result to `out`. If `out` is null, mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar exponent
 */
export const powN = a;

/**
 * Same as {@link powN} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar exponent
 */
export const powN1 = b;

/**
 * Same as {@link powN} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar exponent
 */
export const powN2 = c;

/**
 * Same as {@link powN} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar exponent
 */
export const powN3 = d;

/**
 * Same as {@link powN} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar exponent
 */
export const powN4 = e;

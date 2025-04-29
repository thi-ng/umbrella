// SPDX-License-Identifier: Apache-2.0
import { $sub } from "@thi.ng/vectors/ops";
import { defOpTN } from "./defoptn.js";

const [a, b, c, d] = defOpTN($sub);

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
 * Componentwise 1D tensor subtraction with uniform scalar `n`. Writes result to
 * `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const subN1 = b;

/**
 * Componentwise 2D tensor subtraction with uniform scalar `n`. Writes result to
 * `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const subN2 = c;

/**
 * Componentwise 3D tensor subtraction with uniform scalar `n`. Writes result to
 * `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const subN3 = d;

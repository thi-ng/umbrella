// SPDX-License-Identifier: Apache-2.0
import { $mul } from "@thi.ng/vectors/ops";
import { defOpTN } from "./defoptn.js";

const [a, b, c, d] = defOpTN($mul);

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
 * Componentwise 1D tensor multiplication with uniform scalar `n`. Writes result
 * to `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mulN1 = b;

/**
 * Componentwise 2D tensor multiplication with uniform scalar `n`. Writes result
 * to `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mulN2 = c;

/**
 * Componentwise 3D tensor multiplication with uniform scalar `n`. Writes result
 * to `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mulN3 = d;

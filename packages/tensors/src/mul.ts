// SPDX-License-Identifier: Apache-2.0
import { $mul } from "@thi.ng/vectors/ops";
import { defOpTT } from "./defoptt.js";

const [a, b, c, d] = defOpTT($mul);

/**
 * Componentwise nD tensor multiplication. Writes result to `out`. If `out` is
 * null, mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mul = a;

/**
 * Componentwise 1D tensor multiplication. Writes result to `out`. If `out` is
 * null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mul1 = b;

/**
 * Componentwise 2D tensor multiplication. Writes result to `out`. If `out` is
 * null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mul2 = c;

/**
 * Componentwise 3D tensor multiplication. Writes result to `out`. If `out` is
 * null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mul3 = d;

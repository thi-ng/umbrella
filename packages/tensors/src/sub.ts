// SPDX-License-Identifier: Apache-2.0
import { $sub } from "@thi.ng/vectors/ops";
import { defOpTT } from "./defoptt.js";

const [a, b, c, d] = defOpTT($sub);

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
 * Componentwise 1D tensor subtraction. Writes result to `out`. If `out` is
 * null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const sub1 = b;

/**
 * Componentwise 2D tensor subtraction. Writes result to `out`. If `out` is
 * null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const sub2 = c;

/**
 * Componentwise 3D tensor subtraction. Writes result to `out`. If `out` is
 * null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const sub3 = d;

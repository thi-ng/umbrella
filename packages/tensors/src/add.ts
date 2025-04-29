// SPDX-License-Identifier: Apache-2.0
import { $add } from "@thi.ng/vectors/ops";
import { defOpTT } from "./defoptt.js";

const [a, b, c, d] = defOpTT($add);

/**
 * Componentwise nD tensor addition. Writes result to `out`. If `out` is null,
 * mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const add = a;

/**
 * Componentwise 1D tensor addition. Writes result to `out`. If `out` is null,
 * mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const add1 = b;

/**
 * Componentwise 2D tensor addition. Writes result to `out`. If `out` is null,
 * mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const add2 = c;

/**
 * Componentwise 3D tensor addition. Writes result to `out`. If `out` is null,
 * mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const add3 = d;

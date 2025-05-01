// SPDX-License-Identifier: Apache-2.0
import { $add } from "@thi.ng/vectors/ops";
import { defOpTT } from "./defoptt.js";

const [a, b, c, d, e] = defOpTT($add);

/**
 * Componentwise nD tensor addition. Writes result to `out`. If `out` is null,
 * mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const add = a;

/**
 * Same as {@link add} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const add1 = b;

/**
 * Same as {@link add} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const add2 = c;

/**
 * Same as {@link add} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const add3 = d;

/**
 * Same as {@link add} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const add4 = e;

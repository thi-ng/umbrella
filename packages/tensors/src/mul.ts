// SPDX-License-Identifier: Apache-2.0
import { $mul } from "@thi.ng/vectors/ops";
import { defOpTT } from "./defoptt.js";

const [a, b, c, d, e] = defOpTT($mul);

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
 * Same as {@link mul} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mul1 = b;

/**
 * Same as {@link mul} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mul2 = c;

/**
 * Same as {@link mul} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mul3 = d;

/**
 * Same as {@link mul} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const mul4 = e;

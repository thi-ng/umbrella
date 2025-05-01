// SPDX-License-Identifier: Apache-2.0
import { $div } from "@thi.ng/vectors/ops";
import { defOpTT } from "./defoptt.js";

const [a, b, c, d, e] = defOpTT($div);

/**
 * Componentwise nD tensor division. Writes result to `out`. If `out` is null,
 * mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const div = a;

/**
 * Same as {@link div} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const div1 = b;

/**
 * Same as {@link div} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const div2 = c;

/**
 * Same as {@link div} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const div3 = d;

/**
 * Same as {@link div} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor
 */
export const div4 = e;

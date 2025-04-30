// SPDX-License-Identifier: Apache-2.0
import { clamp as op } from "@thi.ng/math/interval";
import { defOpTNN } from "./defoptnn.js";

const [a, b, c, d, e] = defOpTNN(op);

/**
 * Componentwise clamps nD tensor `a` to closed interval defined by `[b,c]`.
 * Writes result to `out`. If `out` is null, mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - scalar (min)
 * @param c - scalar (max)
 */
export const clampN = a;

/**
 * Same as {@link clampN} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - scalar (min)
 * @param c - scalar (max)
 */
export const clampN1 = b;

/**
 * Same as {@link clampN} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - scalar (min)
 * @param c - scalar (max)
 */
export const clampN2 = c;

/**
 * Same as {@link clampN} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - scalar (min)
 * @param c - scalar (max)
 */
export const clampN3 = d;

/**
 * Same as {@link clampN} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - scalar (min)
 * @param c - scalar (max)
 */
export const clampN4 = e;

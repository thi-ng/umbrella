// SPDX-License-Identifier: Apache-2.0
import { clamp as op } from "@thi.ng/math/interval";
import { defOpTTT } from "./defopttt.js";

const [a, b, c, d, e] = defOpTTT(op);

/**
 * Componentwise clamps nD tensor `a` to closed interval defined by `[b,c]`.
 * Writes result to `out`. If `out` is null, mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor (min)
 * @param c - input tensor (max)
 */
export const clamp = a;

/**
 * Same as {@link clamp} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor (min)
 * @param c - input tensor (max)
 */
export const clamp1 = b;

/**
 * Same as {@link clamp} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor (min)
 * @param c - input tensor (max)
 */
export const clamp2 = c;

/**
 * Same as {@link clamp} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor (min)
 * @param c - input tensor (max)
 */
export const clamp3 = d;

/**
 * Same as {@link clamp} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor (min)
 * @param c - input tensor (max)
 */
export const clamp4 = e;

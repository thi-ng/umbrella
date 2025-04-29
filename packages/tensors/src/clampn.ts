// SPDX-License-Identifier: Apache-2.0
import { clamp as op } from "@thi.ng/math/interval";
import { defOpTNN } from "./defoptnn.js";

const [a, b, c, d] = defOpTNN(op);

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
 * Componentwise clamps 1D tensor `a` to closed interval defined by `[b,c]`. If
 * `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - scalar (min)
 * @param c - scalar (max)
 */
export const clampN1 = b;

/**
 * Componentwise clamps 2D tensor `a` to closed interval defined by `[b,c]`. If
 * `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - scalar (min)
 * @param c - scalar (max)
 */
export const clampN2 = c;

/**
 * Componentwise clamps 3D tensor `a` to closed interval defined by `[b,c]`. If
 * `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - scalar (min)
 * @param c - scalar (max)
 */
export const clampN3 = d;

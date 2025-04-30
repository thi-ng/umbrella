// SPDX-License-Identifier: Apache-2.0
import { defOpTN } from "./defoptn.js";

const [a, b, c, d, e] = defOpTN((a, b) => (a >= b ? 1 : 0));

/**
 * Componentwise computes step function for given nD tensor and uniform scalar
 * threshold `n`. Writes result to `out`. If `out` is null, mutates `a`.
 * Multi-method.
 *
 * @remarks
 * Same logic as GLSL `step()` (but with different order of arguments). If
 * `n=0`, the op becomes the Heaviside function:
 * https://en.wikipedia.org/wiki/Heaviside_step_function
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const stepN = a;

/**
 * Same as {@link stepN} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const stepN1 = b;

/**
 * Same as {@link stepN} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const stepN2 = c;

/**
 * Same as {@link stepN} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const stepN3 = d;

/**
 * Same as {@link stepN} for 4D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar
 */
export const stepN4 = e;

// SPDX-License-Identifier: Apache-2.0
import { defOpTN } from "./defoptn.js";

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
export const stepN = defOpTN((a, b) => (a >= b ? 1 : 0));

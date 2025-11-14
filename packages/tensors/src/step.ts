// SPDX-License-Identifier: Apache-2.0
import { defOpTT } from "./defoptt.js";

/**
 * Componentwise computes step function for given nD tensor and threshold `b`.
 * Writes result to `out`. If `out` is null, mutates `a`. Multi-method. Also see
 * {@link stepN} and {@link smoothStep}.
 *
 * @remarks
 * Same logic as GLSL `step()` (but with swapped order of arguments).
 *
 * Reference:
 *
 * - https://registry.khronos.org/OpenGL-Refpages/gl4/html/step.xhtml
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - input tensor (threshold)
 */
export const step = defOpTT((a, b) => (a >= b ? 1 : 0));

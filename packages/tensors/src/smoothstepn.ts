// SPDX-License-Identifier: Apache-2.0
import { smoothStep as $ } from "@thi.ng/math/step";
import { defOpTNN } from "./defoptnn.js";

/**
 * Componentwise computes smoothstep function for given nD tensor and uniform
 * scalar thresholds `b` (low edge) and `c` (high edge). Writes result to `out`.
 * If `out` is null, mutates `a`. Multi-method. Also see {@link stepN}.
 *
 * @remarks
 * Same as GLSL `smoothstep()` (but with changed order of arguments).
 *
 * Reference:
 *
 * - https://registry.khronos.org/OpenGL-Refpages/gl4/html/smoothstep.xhtml
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param b - scalar (low edge)
 * @param c - scalar (high edge)
 */
export const smoothStepN = defOpTNN((a, b, c) => $(b, c, a));

// SPDX-License-Identifier: Apache-2.0
import { smoothStep as op } from "@thi.ng/math/step";
import { defOpVVV } from "./defopvvv.js";

const [a, b, c, d] = defOpVVV(op, 1, false);

/**
 * Componentwise computes GLSL `smoothstep()` for given nD vector `c` and using
 * "edge" vectors `a` and `b`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const smoothStep = a;

/**
 * Componentwise computes GLSL `smoothstep()` for given 2D vector `c` and using
 * "edge" vectors `a` and `b`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const smoothStep2 = b;

/**
 * Componentwise computes GLSL `smoothstep()` for given 3D vector `c` and using
 * "edge" vectors `a` and `b`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const smoothStep3 = c;

/**
 * Componentwise computes GLSL `smoothstep()` for given 4D vector `c` and using
 * "edge" vectors `a` and `b`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const smoothStep4 = d;

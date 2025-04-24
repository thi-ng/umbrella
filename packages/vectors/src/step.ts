// SPDX-License-Identifier: Apache-2.0
import { step as op } from "@thi.ng/math/step";
import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV(op, 1, false);

/**
 * Componentwise computes GLSL `step()` for given nD vector `b` and "edge"
 * vectors `a`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const step = a;

/**
 * Componentwise computes GLSL `step()` for given 2D vector `b` and "edge"
 * vectors `a`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const step2 = b;

/**
 * Componentwise computes GLSL `step()` for given 3D vector `b` and "edge"
 * vectors `a`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const step3 = c;

/**
 * Componentwise computes GLSL `step()` for given 4D vector `b` and "edge"
 * vectors `a`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const step4 = d;

// SPDX-License-Identifier: Apache-2.0
import { remainder as op } from "@thi.ng/math/libc";
import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV(op);

/**
 * Componentwise computes modulo of given nD vector. Uses the same logic as the
 * standard C function `remainder()`, i.e. componentwise `a - b * round(a / b)`.
 * Also see {@link mod}, {@link fmod}. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const remainder = a;

/**
 * Componentwise computes modulo of given 2D vector. Uses the same logic as the
 * standard C function `remainder()`, i.e. componentwise `a - b * round(a / b)`.
 * Also see {@link mod2}, {@link fmod2}.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const remainder2 = b;

/**
 * Componentwise computes modulo of given 3D vector. Uses the same logic as the
 * standard C function `remainder()`, i.e. componentwise `a - b * round(a / b)`.
 * Also see {@link mod3}, {@link fmod3}.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const remainder3 = c;

/**
 * Componentwise computes modulo of given 4D vector. Uses the same logic as the
 * standard C function `remainder()`, i.e. componentwise `a - b * round(a / b)`.
 * Also see {@link mod4}, {@link fmod4}.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const remainder4 = d;

import { clamp01 as op } from "@thi.ng/math/interval";
import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(op);

/**
 * Componentwise constrains given nD vector `a` to the closed [0,1] interval.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const clamp01 = a;

/**
 * Componentwise constrains given 2D vector `a` to the closed [0,1] interval.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const clamp01_2 = b;

/**
 * Componentwise constrains given 2D vector `a` to the closed [0,1] interval.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const clamp01_3 = c;

/**
 * Componentwise constrains given 2D vector `a` to the closed [0,1] interval.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const clamp01_4 = d;

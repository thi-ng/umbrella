import { clamp as op } from "@thi.ng/math/interval";
import { defOpVVV } from "./defopvvv.js";

const [a, b, c, d] = defOpVVV(op);

/**
 * Componentwise constrains given nD vector `a` to the closed interval defined
 * by vectors `b` and `c`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const clamp = a;

/**
 * Componentwise constrains given 2D vector `a` to the closed interval defined
 * by vectors `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const clamp2 = b;

/**
 * Componentwise constrains given 3D vector `a` to the closed interval defined
 * by vectors `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const clamp3 = c;

/**
 * Componentwise constrains given 4D vector `a` to the closed interval defined
 * by vectors `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const clamp4 = d;

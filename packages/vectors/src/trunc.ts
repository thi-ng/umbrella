import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.trunc);

/**
 * Componentwise computes `Math.trunc` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const trunc = a;

/**
 * Componentwise computes `Math.trunc` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const trunc2 = b;

/**
 * Componentwise computes `Math.trunc` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const trunc3 = c;

/**
 * Componentwise computes `Math.trunc` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const trunc4 = d;

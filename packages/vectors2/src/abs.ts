import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.abs);

/**
 * Componentwise absolute value of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const abs = a;

/**
 * Componentwise absolute value of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const abs2 = b;

/**
 * Componentwise absolute value of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const abs3 = c;

/**
 * Componentwise absolute value of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const abs4 = d;

import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV((x) => 2 ** x);

/**
 * Componentwise computes `Math.exp2` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp2 = a;

/**
 * Componentwise computes `Math.exp2` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp2_2 = b;

/**
 * Componentwise computes `Math.exp2` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp2_3 = c;

/**
 * Componentwise computes `Math.exp2` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const exp2_4 = d;

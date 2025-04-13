import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.ceil);

/**
 * Componentwise `Math.ceil` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const ceil = a;

/**
 * Componentwise `Math.ceil` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const ceil2 = b;

/**
 * Componentwise `Math.ceil` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const ceil3 = c;

/**
 * Componentwise `Math.ceil` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const ceil4 = d;

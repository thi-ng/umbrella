import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.asin);

/**
 * Componentwise computes `Math.asin` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asin = a;

/**
 * Componentwise computes `Math.asin` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asin2 = b;

/**
 * Componentwise computes `Math.asin` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asin3 = c;

/**
 * Componentwise computes `Math.asin` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asin4 = d;

import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => a + b);

/**
 * Componentwise nD vector addition. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const add = a;

/**
 * Componentwise 2D vector addition.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const add2 = b;

/**
 * Componentwise 3D vector addition.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const add3 = c;

/**
 * Componentwise 4D vector addition.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const add4 = d;

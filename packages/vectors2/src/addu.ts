import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => (a + b) >>> 0);

/**
 * Componentwise nD unsigned integer vector addition. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const addU = a;

/**
 * Componentwise 2D unsigned integer vector addition.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const addU2 = b;

/**
 * Componentwise 3D unsigned integer vector addition.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const addU3 = c;

/**
 * Componentwise 4D unsigned integer vector addition.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const addU4 = d;

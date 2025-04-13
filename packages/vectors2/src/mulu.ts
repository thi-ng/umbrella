import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => (a * b) >>> 0);

/**
 * Componentwise nD unsigned integer vector multiplication. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulU = a;

/**
 * Componentwise 2D unsigned integer vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulU2 = b;

/**
 * Componentwise 3D unsigned integer vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulU3 = c;

/**
 * Componentwise 4D unsigned integer vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulU4 = d;

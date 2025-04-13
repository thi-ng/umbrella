import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => (a / b) >>> 0);

/**
 * Componentwise nD unsigned integer vector division. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const divU = a;

/**
 * Componentwise 2D unsigned integer vector division.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const divU2 = b;

/**
 * Componentwise 3D unsigned integer vector division.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const divU3 = c;

/**
 * Componentwise 4D unsigned integer vector division.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const divU4 = d;

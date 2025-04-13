import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => a / b);

/**
 * Componentwise nD vector division. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const div = a;

/**
 * Componentwise 2D vector division.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const div2 = b;

/**
 * Componentwise 3D vector division.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const div3 = c;

/**
 * Componentwise 4D vector division.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const div4 = d;

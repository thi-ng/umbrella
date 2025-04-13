import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => a - b);

/**
 * Componentwise nD vector subtraction. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const sub = a;

/**
 * Componentwise 2D vector subtraction.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const sub2 = b;

/**
 * Componentwise 3D vector subtraction.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const sub3 = c;

/**
 * Componentwise 4D vector subtraction.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const sub4 = d;

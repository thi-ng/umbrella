import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => (a - b) | 0);

/**
 * Componentwise nD signed integer vector subtraction. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const subI = a;

/**
 * Componentwise 2D signed integer vector subtraction.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const subI2 = b;

/**
 * Componentwise 3D signed integer vector subtraction.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const subI3 = c;

/**
 * Componentwise 4D signed integer vector subtraction.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const subI4 = d;

import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => (a + b) | 0);

/**
 * Componentwise nD signed integer vector addition. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const addI = a;

/**
 * Componentwise 2D signed integer vector addition.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const addI2 = b;

/**
 * Componentwise 3D signed integer vector addition.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const addI3 = c;

/**
 * Componentwise 4D signed integer vector addition.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const addI4 = d;

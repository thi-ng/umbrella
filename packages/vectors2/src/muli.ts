import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => (a * b) | 0);

/**
 * Componentwise nD signed integer vector multiplication. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulI = a;

/**
 * Componentwise 2D signed integer vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulI2 = b;

/**
 * Componentwise 3D signed integer vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulI3 = c;

/**
 * Componentwise 4D signed integer vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mulI4 = d;

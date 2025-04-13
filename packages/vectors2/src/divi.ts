import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => (a / b) | 0);

/**
 * Componentwise nD signed integer vector division. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const divI = a;

/**
 * Componentwise 2D signed integer vector division.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const divI2 = b;

/**
 * Componentwise 3D signed integer vector division.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const divI3 = c;

/**
 * Componentwise 4D signed integer vector division.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const divI4 = d;

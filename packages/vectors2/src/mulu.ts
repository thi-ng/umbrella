import { defOpVV } from "./defopvv.js";
import { $mulU } from "./ops.js";

const [a, b, c, d] = defOpVV($mulU);

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

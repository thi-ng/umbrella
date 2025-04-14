import { defOpVV } from "./defopvv.js";
import { $subU } from "./ops.js";

const [a, b, c, d] = defOpVV($subU);

/**
 * Componentwise nD unsigned integer vector subtraction. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const subU = a;

/**
 * Componentwise 2D unsigned integer vector subtraction.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const subU2 = b;

/**
 * Componentwise 3D unsigned integer vector subtraction.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const subU3 = c;

/**
 * Componentwise 4D unsigned integer vector subtraction.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const subU4 = d;

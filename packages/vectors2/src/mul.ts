import { defOpVV } from "./defopvv.js";
import { $mul } from "./ops.js";

const [a, b, c, d] = defOpVV($mul);

/**
 * Componentwise nD vector multiplication. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mul = a;

/**
 * Componentwise 2D vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mul2 = b;

/**
 * Componentwise 3D vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mul3 = c;

/**
 * Componentwise 4D vector multiplication.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mul4 = d;

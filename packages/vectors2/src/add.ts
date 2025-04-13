import { defOpVV } from "./defopvv.js";
import { $add } from "./ops.js";

const [a, b, c, d] = defOpVV($add);

/**
 * Componentwise nD vector addition. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const add = a;

/**
 * Componentwise 2D vector addition.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const add2 = b;

/**
 * Componentwise 3D vector addition.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const add3 = c;

/**
 * Componentwise 4D vector addition.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const add4 = d;

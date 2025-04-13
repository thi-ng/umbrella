import { defOpVV } from "./defopvv.js";
import { $subI } from "./ops.js";

const [a, b, c, d] = defOpVV($subI);

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

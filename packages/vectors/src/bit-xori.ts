import { defOpVV } from "./defopvv.js";
import { $bxorI } from "./ops.js";

const [a, b, c, d] = defOpVV($bxorI);

/**
 * Componentwise binary XOR of given nD signed integer vectors. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitXorI = a;

/**
 * Componentwise binary XOR of given 2D signed integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitXorI2 = b;

/**
 * Componentwise binary XOR of given 3D signed integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitXorI3 = c;

/**
 * Componentwise binary XOR of given 4D signed integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitXorI4 = d;

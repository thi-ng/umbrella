import { defOpVV } from "./defopvv.js";
import { $borU } from "./ops.js";

const [a, b, c, d] = defOpVV($borU);

/**
 * Componentwise binary OR of given nD unsigned integer vectors. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrU = a;

/**
 * Componentwise binary OR of given 2D unsigned integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrU2 = b;

/**
 * Componentwise binary OR of given 3D unsigned integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrU3 = c;

/**
 * Componentwise binary OR of given 4D unsigned integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrU4 = d;

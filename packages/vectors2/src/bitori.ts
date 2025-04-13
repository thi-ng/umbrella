import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => a | b);

/**
 * Componentwise binary OR of given nD signed integer vectors. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrI = a;

/**
 * Componentwise binary OR of given 2D signed integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrI2 = b;

/**
 * Componentwise binary OR of given 3D signed integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrI3 = c;

/**
 * Componentwise binary OR of given 4D signed integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitOrI4 = d;

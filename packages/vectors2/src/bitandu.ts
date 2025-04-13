import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV((a, b) => (a & b) >>> 0);

/**
 * Componentwise binary AND of given nD unsigned integer vectors. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitAndU = a;

/**
 * Componentwise binary AND of given 2D unsigned integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitAndU2 = b;

/**
 * Componentwise binary AND of given 3D unsigned integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitAndU3 = c;

/**
 * Componentwise binary AND of given 4D unsigned integer vectors.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const bitAndU4 = d;

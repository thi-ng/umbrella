import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.tanh);

/**
 * Componentwise computes `Math.tanh` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tanh = a;

/**
 * Componentwise computes `Math.tanh` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tanh2 = b;

/**
 * Componentwise computes `Math.tanh` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tanh3 = c;

/**
 * Componentwise computes `Math.tanh` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const tanh4 = d;

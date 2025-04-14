import { defOpV } from "./defopv.js";

const [a, b, c, d] = defOpV(Math.floor);

/**
 * Componentwise computes `Math.floor` of given nD vector. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const floor = a;

/**
 * Componentwise computes `Math.floor` of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const floor2 = b;

/**
 * Componentwise computes `Math.floor` of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const floor3 = c;

/**
 * Componentwise computes `Math.floor` of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const floor4 = d;

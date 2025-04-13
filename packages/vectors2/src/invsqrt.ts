import { defOpV } from "./defopv.js";

const { sqrt } = Math;

const [a, b, c, d] = defOpV((a) => 1 / sqrt(a));

/**
 * Componentwise computes the inverse squareroot of given nD vector.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invSqrt = a;

/**
 * Componentwise computes the inverse squareroot of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invSqrt2 = b;

/**
 * Componentwise computes the inverse squareroot of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invSqrt3 = c;

/**
 * Componentwise computes the inverse squareroot of given 4D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const invSqrt4 = d;

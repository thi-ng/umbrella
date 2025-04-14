import { defOpVNew } from "./defopv-new.js";

const op = globalThis.isNaN;

const [a, b, c, d] = defOpVNew<number, boolean>((a) => op(a), 1);

/**
 * Componentwise checks if given 2D vector is `NaN` and writes results to
 * boolean output vector. If `out` is null, creates a new result vector.
 * Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isNaN = a;

/**
 * Componentwise checks if given 2D vector is `NaN` and writes results to
 * boolean output vector. If `out` is null, creates a new result vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isNaN2 = b;

/**
 * Componentwise checks if given 3D vector is `NaN` and writes results to
 * boolean output vector. If `out` is null, creates a new result vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isNaN3 = c;

/**
 * Componentwise checks if given 4D vector is `NaN` and writes results to
 * boolean output vector. If `out` is null, creates a new result vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isNaN4 = d;

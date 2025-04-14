import { defOpVVNew } from "./defopvv-new.js";

const [a, b, c, d] = defOpVVNew<number, boolean>((a, b) => a !== b);

/**
 * Compnentwise checks if given 4D vectors `a` and `b` are unequal (using `!==`
 * for comparison) and writes results to boolean output vector. If `out` is
 * null, creates a new result vector. Multi-method.
 */
export const neq = a;

/**
 * Compnentwise checks if given 2D vectors `a` and `b` are unequal (using `!==`
 * for comparison) and writes results to boolean output vector. If `out` is
 * null, creates a new result vector.
 */
export const neq2 = b;

/**
 * Compnentwise checks if given 3D vectors `a` and `b` are unequal (using `!==`
 * for comparison) and writes results to boolean output vector. If `out` is
 * null, creates a new result vector.
 */
export const neq3 = c;

/**
 * Compnentwise checks if given 4D vectors `a` and `b` are unequal (using `!==`
 * for comparison) and writes results to boolean output vector. If `out` is
 * null, creates a new result vector.
 */
export const neq4 = d;

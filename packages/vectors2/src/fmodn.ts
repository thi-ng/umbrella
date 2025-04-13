import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN((a, b) => a % b);

/**
 * Same as {@link fmod}, but 2nd operand is a scalar (uniform domain for all
 * vector components). Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const fmodN = a;

/**
 * Same as {@link fmod2}, but 2nd operand is a scalar (uniform domain for all
 * vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const fmodN2 = b;

/**
 * Same as {@link fmod3}, but 2nd operand is a scalar (uniform domain for all
 * vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const fmodN3 = c;

/**
 * Same as {@link fmod4}, but 2nd operand is a scalar (uniform domain for all
 * vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const fmodN4 = d;

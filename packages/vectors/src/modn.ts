import { mod as op } from "@thi.ng/math/prec";
import { defOpVN } from "./defopvn.js";

const [a, b, c, d] = defOpVN(op);

/**
 * Same as {@link mod}, but 2nd operand is a single scalar (uniform domain for
 * all vector components). Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const modN = a;

/**
 * Same as {@link mod2}, but 2nd operand is a single scalar (uniform domain for
 * all vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const modN2 = b;

/**
 * Same as {@link mod3}, but 2nd operand is a single scalar (uniform domain for
 * all vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const modN3 = c;

/**
 * Same as {@link mod4}, but 2nd operand is a single scalar (uniform domain for
 * all vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const modN4 = d;

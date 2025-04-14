import { roundTo } from "@thi.ng/math/prec";
import { defOpVV } from "./defopvv.js";

const [a, b, c, d] = defOpVV(roundTo);

/**
 * Componentwise rounds given 2D vector `a` to multiples of components in
 * vector `b`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const round = a;

/**
 * Componentwise rounds given 2D vector `a` to multiples of components in
 * vector `b`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const round2 = b;

/**
 * Componentwise rounds given 3D vector `a` to multiples of components in
 * vector `b`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const round3 = c;

/**
 * Componentwise rounds given 4D vector `a` to multiples of components in
 * vector `b`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const round4 = d;

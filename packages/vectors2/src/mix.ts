import { mix as op } from "@thi.ng/math/mix";
import { defOpVVV } from "./defopvvv.js";

const [a, b, c, d] = defOpVVV(op);

/**
 * Componentwise nD vector linear interpolation.
 * `o = a + (b - a) * c`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const mix = a;

/**
 * Componentwise 2D vector linear interpolation.
 * `o = a + (b - a) * c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const mix2 = b;

/**
 * Componentwise 3D vector linear interpolation.
 * `o = a + (b - a) * c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const mix3 = c;

/**
 * Componentwise 4D vector linear interpolation.
 * `o = a + (b - a) * c`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const mix4 = d;

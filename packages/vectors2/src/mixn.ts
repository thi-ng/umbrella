import { mix } from "@thi.ng/math/mix";
import { defOpVVN } from "./defopvvn.js";

const [a, b, c, d] = defOpVVN(mix);

/**
 * Componentwise nD vector linear interpolation with a uniform scalar factor.
 * `o = a + (b - a) * n`. Multi-method.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const mixN = a;

/**
 * Componentwise 2D vector linear interpolation with a uniform scalar factor.
 * `o = a + (b - a) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const mixN2 = b;

/**
 * Componentwise 3D vector linear interpolation with a uniform scalar factor.
 * `o = a + (b - a) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const mixN3 = c;

/**
 * Componentwise 4D vector linear interpolation with a uniform scalar factor.
 * `o = a + (b - a) * n`
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param n - scalar
 */
export const mixN4 = d;

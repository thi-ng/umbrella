import type { FnN4, FnN6, FnN8 } from "@thi.ng/api";

/**
 * Returns pairwise product sum of given components.
 *
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 */
export const dotC4: FnN4 = (a, b, c, d) => a * b + c * d;

/**
 * Returns pairwise product sum of given components.
 *
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 * @param e -
 * @param f -
 */
export const dotC6: FnN6 = (a, b, c, d, e, f) => a * b + c * d + e * f;

/**
 * Returns pairwise product sum of given components.
 *
 * @param a -
 * @param b -
 * @param c -
 * @param d -
 * @param e -
 * @param f -
 * @param g -
 * @param h -
 */
export const dotC8: FnN8 = (a, b, c, d, e, f, g, h) =>
	a * b + c * d + e * f + g * h;

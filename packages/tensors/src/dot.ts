import { defOpRTT } from "./defoprtt.js";

const [a, b, c, d] = defOpRTT(
	(acc, x, y) => acc + x * y,
	() => 0
);

/**
 * Dot product of given nD tensor. Multi-method.
 *
 * @param a - input tensor
 */
export const dot = a;

/**
 * Dot product of given 1D tensor.
 *
 * @param a - input tensor
 */
export const dot1 = b;

/**
 * Dot product of given 2D tensor.
 *
 * @param a - input tensor
 */
export const dot2 = c;

/**
 * Dot product of given 3D tensor.
 *
 * @param a - input tensor
 */
export const dot3 = d;

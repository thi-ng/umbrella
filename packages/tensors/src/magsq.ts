import { defOpRT } from "./defoprt.js";

const [a, b, c, d] = defOpRT(
	(acc, x) => acc + x * x,
	() => 0
);

/**
 * Squared magnitude of given nD tensor. Multi-method.
 *
 * @param a - input tensor
 */
export const magSq = a;

/**
 * Squared magnitude of given 1D tensor.
 *
 * @param a - input tensor
 */
export const magSq1 = b;

/**
 * Squared magnitude of given 2D tensor.
 *
 * @param a - input tensor
 */
export const magSq2 = c;

/**
 * Squared magnitude of given 3D tensor.
 *
 * @param a - input tensor
 */
export const magSq3 = d;

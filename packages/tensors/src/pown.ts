import { defOpTN } from "./defoptn.js";

const [a, b, c, d] = defOpTN(Math.pow);

/**
 * Componentwise computes `Math.pow` of given nD tensor and uniform scalar `n`.
 * Writes result to `out`. If `out` is null, mutates `a`. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar exponent
 */
export const powN = a;

/**
 * Componentwise computes `Math.pow` of given 1D tensor and uniform scalar `n`.
 * Writes result to `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar exponent
 */
export const powN1 = b;

/**
 * Componentwise computes `Math.pow` of given 2D tensor and uniform scalar `n`.
 * Writes result to `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar exponent
 */
export const powN2 = c;

/**
 * Componentwise computes `Math.pow` of given 3D tensor and uniform scalar `n`.
 * Writes result to `out`. If `out` is null, mutates `a`.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - scalar exponent
 */
export const powN3 = d;

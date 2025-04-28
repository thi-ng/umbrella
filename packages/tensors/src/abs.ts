import { defOpT } from "./defopt.js";

const [a, b, c, d] = defOpT(Math.abs);

/**
 * Componentwise computes `Math.abs` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const abs = a;

/**
 * Componentwise computes `Math.abs` of given 1D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const abs1 = b;

/**
 * Componentwise computes `Math.abs` of given 2D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const abs2 = c;

/**
 * Componentwise computes `Math.abs` of given 3D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const abs3 = d;

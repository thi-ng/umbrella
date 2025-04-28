import { defOpT } from "./defopt.js";

const [a, b, c, d] = defOpT(Math.sin);

/**
 * Componentwise computes `Math.sin` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sin = a;

/**
 * Componentwise computes `Math.sin` of given 1D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sin1 = b;

/**
 * Componentwise computes `Math.sin` of given 2D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sin2 = c;

/**
 * Componentwise computes `Math.sin` of given 3D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sin3 = d;

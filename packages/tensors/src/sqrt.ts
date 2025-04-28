import { defOpT } from "./defopt.js";

const [a, b, c, d] = defOpT(Math.sqrt);

/**
 * Componentwise computes `Math.sqrt` of given nD tensor and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sqrt = a;

/**
 * Componentwise computes `Math.sqrt` of given 1D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sqrt1 = b;

/**
 * Componentwise computes `Math.sqrt` of given 2D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sqrt2 = c;

/**
 * Componentwise computes `Math.sqrt` of given 3D tensor and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sqrt3 = d;

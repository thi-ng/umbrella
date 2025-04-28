import { defOpTT } from "./defoptt.js";

const [a, b, c, d] = defOpTT(Math.max);

/**
 * Componentwise computes `Math.max` of given nD tensors and writes result to
 * `out`. If `out` is null, mutates original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const max = a;

/**
 * Componentwise computes `Math.max` of given 1D tensors and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const max1 = b;

/**
 * Componentwise computes `Math.max` of given 2D tensors and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const max2 = c;

/**
 * Componentwise computes `Math.max` of given 3D tensors and writes result to
 * `out`. If `out` is null, mutates original.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const max3 = d;

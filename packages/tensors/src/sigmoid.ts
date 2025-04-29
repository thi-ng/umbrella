import { defOpT } from "./defopt.js";

const { exp } = Math;

const [a, b, c, d] = defOpT((x) => 1 / (1 + exp(-x)));

/**
 * Componentwise computes Sigmoid activation of given nD tensor. Writes result
 * to `out`. If `out` is null, mutates original. Multi-method.
 *
 * Reference: https://en.wikipedia.org/wiki/Sigmoid_function
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sigmoid = a;

/**
 * Same as {@link sigmoid} for 1D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sigmoid1 = b;

/**
 * Same as {@link sigmoid} for 2D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sigmoid2 = c;

/**
 * Same as {@link sigmoid} for 3D tensors.
 *
 * @param out - output tensor
 * @param a - input tensor
 */
export const sigmoid3 = d;

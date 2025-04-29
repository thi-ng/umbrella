import { defOpTN } from "./defoptn.js";

const [a, b, c, d] = defOpTN((x, n) => (x >= 0 ? x : x * n));

/**
 * Componentwise computes leaky ReLU of given nD tensor (using slope `n` for
 * negative inputs) and writes result to `out`. If `out` is null, mutates
 * original. Multi-method.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - slope
 */
export const reluN = a;

/**
 * Componentwise computes leaky ReLU of given 1D tensor (using slope `n` for
 * negative inputs) and writes result to `out`. If `out` is null, mutates
 * original.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - slope
 */
export const reluN1 = b;

/**
 * Componentwise computes leaky ReLU of given 2D tensor (using slope `n` for
 * negative inputs) and writes result to `out`. If `out` is null, mutates
 * original.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - slope
 */
export const reluN2 = c;

/**
 * Componentwise computes leaky ReLU of given 3D tensor (using slope `n` for
 * negative inputs) and writes result to `out`. If `out` is null, mutates
 * original.
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param n - slope
 */
export const reluN3 = d;

// SPDX-License-Identifier: Apache-2.0
import type { VecOpV, VecOpVN } from "./api.js";

/**
 * Componentwise computes ReLU activation of given nD vector.
 *
 * @remarks
 * Also see {@link reluN} for leaky version.
 *
 * Reference:
 * https://en.wikipedia.org/wiki/Rectifier_(neural_networks)
 *
 * @param o - output vector
 * @param a - input vector
 */
export const relu: VecOpV = (out, a) => {
	!out && (out = a);
	for (let i = a.length; i-- > 0; ) out[i] = a[i] >= 0 ? a[i] : 0;
	return out;
};

/**
 * Componentwise computes leaky ReLU activation of given nD vector with gradient
 * slope `n`.
 *
 * @remarks
 * Also see {@link relu}.
 *
 * Reference:
 * https://en.wikipedia.org/wiki/Rectifier_(neural_networks)#Piecewise-linear_variants
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - gradient slope
 */
export const reluN: VecOpVN = (out, a, n) => {
	!out && (out = a);
	for (let i = a.length; i-- > 0; ) out[i] = a[i] >= 0 ? a[i] : a[i] * n;
	return out;
};

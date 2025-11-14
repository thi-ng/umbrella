// SPDX-License-Identifier: Apache-2.0
import type { VecOpV } from "./api.js";

const { exp } = Math;

/**
 * Componentwise computes Sigmoid activation of given nD vector.
 *
 * Reference:
 * https://en.wikipedia.org/wiki/Sigmoid_function
 *
 * @param o - output vector
 * @param a - input vector
 */
export const sigmoid: VecOpV = (out, a) => {
	!out && (out = a);
	for (let i = a.length; i-- > 0; ) out[i] = 1 / (1 + exp(-a[i]));
	return out;
};

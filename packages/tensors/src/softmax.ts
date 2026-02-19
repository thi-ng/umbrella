// SPDX-License-Identifier: Apache-2.0
import type { TensorOpTNO } from "./api.js";
import { divN } from "./divn.js";
import { exp } from "./exp.js";
import { sum } from "./sum.js";

/**
 * Computes softmax (aka normalized {@link exp}) of input tensor `src` and
 * writes results to `out` (or if null, back into `src`). The optional
 * `temperature` (should be >= 1) can be used to adjust the emphasis/scaling of
 * normalized values: Higher temperatures reduce the contrast ratio between
 * min/max components.
 *
 * @remarks
 * Computes: `smax = exp(src / temp) / sum(exp(src / temp))`. The result
 * vector's components will all be in the [0,1] range and sum to 1.0.
 *
 * This function is often used as the last activation function in a neural
 * network to normalize the output to a probability distribution over predicted
 * output classes.
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/Softmax_function
 * - https://victorzhou.com/blog/softmax/
 *
 * @param out -
 * @param src -
 * @param temperature -
 */
export const softMax: TensorOpTNO = (out, src, temperature?): any => {
	const e =
		temperature !== undefined
			? exp(null, divN(<any>src.empty(), <any>src, temperature))
			: exp(<any>src.empty(), <any>src);
	return divN(<any>out || src, e, sum(e));
};

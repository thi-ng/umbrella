// SPDX-License-Identifier: Apache-2.0
import { sum as vsum } from "@thi.ng/vectors/sum";
import type { ITensor } from "./api.js";
import { sum } from "./sum.js";
import { Tensor1 } from "./tensor.js";

/**
 * Returns a 1D tensor view of the nD diagonal of the given tensor.
 *
 * @remarks
 * For 1D tensors this will merely by a shallow copy.
 */
export const diagonal = <T>(a: ITensor<T>) => {
	return new Tensor1<T>(
		a.type,
		a.storage,
		a.data,
		[Math.min(...a.shape)],
		[vsum(a.stride)],
		a.offset
	);
};

/**
 * Computes the trace of given tensor, i.e. the component sum of `diagonal(a)`.
 *
 * @param a
 */
export const trace = (a: ITensor) => sum(diagonal(a));

// SPDX-License-Identifier: Apache-2.0
import { illegalArgs } from "@thi.ng/errors";
import { equals } from "@thi.ng/vectors";
import { max } from "@thi.ng/vectors/max";
import type { ITensor, Shape } from "./api.js";

/**
 * Helper function for various tensor operators which support broadcasting.
 * Takes two tensors and attempts to adjust their shape & stride configurations
 * to be compatible, applying the steps and rules below. Returns an object of
 * adjusted shape and possibly adjusted shallow copies of both tensors.
 *
 * - if the dimensions are unequal, the smaller tensor's dimensions will be
 *   increased as needed. The size of each added dimension will be set to 1 and
 *   its stride to zero.
 * - Size of each dimension will be compared and only the following cases are
 *   accepted (otherwise will throw an error): sizes are equal or one side is 1
 * - Any of the tensors requiring shape adjustments will be shallow copied with
 *   new shape/stride config applied (via {@link ITensor.broadcast}).
 *
 * @param a
 * @param b
 */
export const broadcast = <T = number>(a: ITensor<T>, b: ITensor<T>) => {
	if (equals(a.shape, b.shape)) return { shape: <Shape>a.shape, a, b };
	const ashape = a.shape.slice();
	const astride = a.stride.slice();
	const bshape = b.shape.slice();
	const bstride = b.stride.slice();
	let da = a.dim;
	let db = b.dim;
	let bcastA = da < db;
	let bcastB = db < da;
	if (bcastA) {
		while (da < db) {
			ashape.unshift(1);
			astride.unshift(0);
			da++;
		}
	} else if (bcastB) {
		while (db < da) {
			bshape.unshift(1);
			bstride.unshift(0);
			db++;
		}
	}
	for (let i = 0; i < da; i++) {
		const sa = ashape[i];
		const sb = bshape[i];
		if (sa < sb) {
			if (sa > 1) __broadcastError(ashape, bshape);
			astride[i] = 0;
			bcastA = true;
		} else if (sb < sa) {
			if (sb > 1) __broadcastError(ashape, bshape);
			bstride[i] = 0;
			bcastB = true;
		}
	}
	const shape = <Shape>max([], ashape, bshape);
	return {
		shape,
		a: bcastA ? a.broadcast(shape, <Shape>astride) : a,
		b: bcastB ? b.broadcast(shape, <Shape>bstride) : b,
	};
};

/** @internal */
const __broadcastError = (ashape: number[], bshape: number[]) =>
	illegalArgs(
		`incompatible shapes: ${JSON.stringify(ashape)} vs ${JSON.stringify(
			bshape
		)}`
	);

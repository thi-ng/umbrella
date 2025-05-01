import { illegalArgs } from "@thi.ng/errors";
import { equals } from "@thi.ng/vectors";
import { max } from "@thi.ng/vectors/max";
import type { ITensor, Shape } from "./api.js";

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
		a: bcastA ? a.broadcast(shape, astride) : a,
		b: bcastB ? b.broadcast(shape, bstride) : b,
	};
};

/** @internal */
const __broadcastError = (ashape: number[], bshape: number[]) =>
	illegalArgs(
		`incompatible shapes: ${JSON.stringify(ashape)} vs ${JSON.stringify(
			bshape
		)}`
	);

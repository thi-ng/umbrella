import type { FnN3 } from "@thi.ng/api";
import type { MultiVecOpVNV, VecOpVNV } from "./api.js";
import { vop } from "./vop.js";

export const defOpVNV = (op: FnN3, dispatch = 1) => {
	const a: VecOpVNV = (o, a, n, b) => {
		!o && (o = a);
		for (let i = a.length; i-- > 0; ) o[i] = op(a[i], n, b[i]);
		return o;
	};
	const b: VecOpVNV = (o, a, n, b) => {
		!o && (o = a);
		o[0] = op(a[0], n, b[0]);
		o[1] = op(a[1], n, b[1]);
		return o;
	};
	const c: VecOpVNV = (o, a, n, b) => {
		!o && (o = a);
		o[0] = op(a[0], n, b[0]);
		o[1] = op(a[1], n, b[1]);
		o[2] = op(a[2], n, b[2]);
		return o;
	};
	const d: VecOpVNV = (o, a, n, b) => {
		!o && (o = a);
		o[0] = op(a[0], n, b[0]);
		o[1] = op(a[1], n, b[1]);
		o[2] = op(a[2], n, b[2]);
		o[3] = op(a[3], n, b[3]);
		return o;
	};
	return <[MultiVecOpVNV, VecOpVNV, VecOpVNV, VecOpVNV]>[
		vop(dispatch, a, b, c, d),
		b,
		c,
		d,
	];
};

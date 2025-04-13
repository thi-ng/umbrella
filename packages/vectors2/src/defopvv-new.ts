import type { FnU2 } from "@thi.ng/api";
import type { MultiVecOpVV, VecOpVV } from "./api.js";
import { vop } from "./vop.js";

export const defOpVVNew = <A, B>(op: FnU2<A, B>, dispatch = 1) => {
	const a: VecOpVV<A, B> = (o, a, b) => {
		!o && (o = []);
		for (let i = a.length; i-- > 0; ) o[i] = op(a[i], b[i]);
		return o;
	};
	const b: VecOpVV<A, B> = (o, a, b) => {
		!o && (o = []);
		o[0] = op(a[0], b[0]);
		o[1] = op(a[1], b[1]);
		return o;
	};
	const c: VecOpVV<A, B> = (o, a, b) => {
		!o && (o = []);
		o[0] = op(a[0], b[0]);
		o[1] = op(a[1], b[1]);
		o[2] = op(a[2], b[2]);
		return o;
	};
	const d: VecOpVV<A, B> = (o, a, b) => {
		!o && (o = []);
		o[0] = op(a[0], b[0]);
		o[1] = op(a[1], b[1]);
		o[2] = op(a[2], b[2]);
		o[3] = op(a[3], b[3]);
		return o;
	};
	return <[MultiVecOpVV<A, B>, VecOpVV<A, B>, VecOpVV<A, B>, VecOpVV<A, B>]>[
		vop(dispatch, a, b, c, d),
		b,
		c,
		d,
	];
};

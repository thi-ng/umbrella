import type { Fn } from "@thi.ng/api";
import type { MultiVecOpV, VecOpV } from "./api.js";
import { vop } from "./vop.js";

export const defOpVNew = <A, B>(op: Fn<A, B>, dispatch = 1) => {
	const a: VecOpV<A, B> = (o, a) => {
		!o && (o = []);
		for (let i = a.length; i-- > 0; ) o[i] = op(a[i]);
		return o;
	};
	const b: VecOpV<A, B> = (o, a) => {
		!o && (o = []);
		o[0] = op(a[0]);
		o[1] = op(a[1]);
		return o;
	};
	const c: VecOpV<A, B> = (o, a) => {
		!o && (o = []);
		o[0] = op(a[0]);
		o[1] = op(a[1]);
		o[2] = op(a[2]);
		return o;
	};
	const d: VecOpV<A, B> = (o, a) => {
		!o && (o = []);
		o[0] = op(a[0]);
		o[1] = op(a[1]);
		o[2] = op(a[2]);
		o[3] = op(a[3]);
		return o;
	};
	return <[MultiVecOpV<A, B>, VecOpV<A, B>, VecOpV<A, B>, VecOpV<A, B>]>[
		vop(dispatch, a, b, c, d),
		b,
		c,
		d,
	];
};

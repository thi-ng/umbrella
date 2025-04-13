import type { Fn } from "@thi.ng/api";
import type { MultiVecOpV, VecOpV } from "./api.js";
import { vop } from "./vop.js";

export const defOpV = <T = number>(op: Fn<T, T>, dispatch = 1) => {
	const a: VecOpV<T> = (o, a) => {
		!o && (o = a);
		for (let i = a.length; i-- > 0; ) o[i] = op(a[i]);
		return o;
	};
	const b: VecOpV<T> = (o, a) => {
		!o && (o = a);
		o[0] = op(a[0]);
		o[1] = op(a[1]);
		return o;
	};
	const c: VecOpV<T> = (o, a) => {
		!o && (o = a);
		o[0] = op(a[0]);
		o[1] = op(a[1]);
		o[2] = op(a[2]);
		return o;
	};
	const d: VecOpV<T> = (o, a) => {
		!o && (o = a);
		o[0] = op(a[0]);
		o[1] = op(a[1]);
		o[2] = op(a[2]);
		o[3] = op(a[3]);
		return o;
	};
	return <[MultiVecOpV<T>, VecOpV<T>, VecOpV<T>, VecOpV<T>]>[
		vop(dispatch, a, b, c, d),
		b,
		c,
		d,
	];
};

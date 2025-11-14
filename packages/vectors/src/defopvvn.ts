// SPDX-License-Identifier: Apache-2.0
import type { FnN3 } from "@thi.ng/api";
import type { MultiVecOpVVN, VecOpVVN } from "./api.js";
import { vop } from "./vop.js";

export const defOpVVN = (op: FnN3, dispatch = 1) => {
	const a: VecOpVVN = (o, a, b, n) => {
		!o && (o = a);
		for (let i = a.length; i-- > 0; ) o[i] = op(a[i], b[i], n);
		return o;
	};
	const b: VecOpVVN = (o, a, b, n) => {
		!o && (o = a);
		o[0] = op(a[0], b[0], n);
		o[1] = op(a[1], b[1], n);
		return o;
	};
	const c: VecOpVVN = (o, a, b, n) => {
		!o && (o = a);
		o[0] = op(a[0], b[0], n);
		o[1] = op(a[1], b[1], n);
		o[2] = op(a[2], b[2], n);
		return o;
	};
	const d: VecOpVVN = (o, a, b, n) => {
		!o && (o = a);
		o[0] = op(a[0], b[0], n);
		o[1] = op(a[1], b[1], n);
		o[2] = op(a[2], b[2], n);
		o[3] = op(a[3], b[3], n);
		return o;
	};
	return <[MultiVecOpVVN, VecOpVVN, VecOpVVN, VecOpVVN]>[
		vop(dispatch, a, b, c, d),
		b,
		c,
		d,
	];
};

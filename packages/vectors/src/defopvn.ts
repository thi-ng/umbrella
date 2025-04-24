// SPDX-License-Identifier: Apache-2.0
import type { FnN2 } from "@thi.ng/api";
import type { MultiVecOpVN, VecOpVN } from "./api.js";
import { vop } from "./vop.js";

export const defOpVN = (op: FnN2, dispatch = 1) => {
	const a: VecOpVN = (o, a, n) => {
		!o && (o = a);
		for (let i = a.length; i-- > 0; ) o[i] = op(a[i], n);
		return o;
	};
	const b: VecOpVN = (o, a, n) => {
		!o && (o = a);
		o[0] = op(a[0], n);
		o[1] = op(a[1], n);
		return o;
	};
	const c: VecOpVN = (o, a, n) => {
		!o && (o = a);
		o[0] = op(a[0], n);
		o[1] = op(a[1], n);
		o[2] = op(a[2], n);
		return o;
	};
	const d: VecOpVN = (o, a, n) => {
		!o && (o = a);
		o[0] = op(a[0], n);
		o[1] = op(a[1], n);
		o[2] = op(a[2], n);
		o[3] = op(a[3], n);
		return o;
	};
	return <[MultiVecOpVN, VecOpVN, VecOpVN, VecOpVN]>[
		vop(dispatch, a, b, c, d),
		b,
		c,
		d,
	];
};

// SPDX-License-Identifier: Apache-2.0
import type { FnU2 } from "@thi.ng/api";
import type { MultiVecOpVV, VecOpVV } from "./api.js";
import { vop } from "./vop.js";

export const defOpVV = <T = number>(op: FnU2<T>, dispatch = 1, outA = true) => {
	const a: VecOpVV<T> = outA
		? (o, a, b) => {
				!o && (o = a);
				for (let i = a.length; i-- > 0; ) o[i] = op(a[i], b[i]);
				return o;
		  }
		: (o, a, b) => {
				!o && (o = b);
				for (let i = a.length; i-- > 0; ) o[i] = op(a[i], b[i]);
				return o;
		  };
	const b: VecOpVV<T> = outA
		? (o, a, b) => {
				!o && (o = a);
				o[0] = op(a[0], b[0]);
				o[1] = op(a[1], b[1]);
				return o;
		  }
		: (o, a, b) => {
				!o && (o = b);
				o[0] = op(a[0], b[0]);
				o[1] = op(a[1], b[1]);
				return o;
		  };
	const c: VecOpVV<T> = outA
		? (o, a, b) => {
				!o && (o = a);
				o[0] = op(a[0], b[0]);
				o[1] = op(a[1], b[1]);
				o[2] = op(a[2], b[2]);
				return o;
		  }
		: (o, a, b) => {
				!o && (o = b);
				o[0] = op(a[0], b[0]);
				o[1] = op(a[1], b[1]);
				o[2] = op(a[2], b[2]);
				return o;
		  };
	const d: VecOpVV<T> = outA
		? (o, a, b) => {
				!o && (o = a);
				o[0] = op(a[0], b[0]);
				o[1] = op(a[1], b[1]);
				o[2] = op(a[2], b[2]);
				o[3] = op(a[3], b[3]);
				return o;
		  }
		: (o, a, b) => {
				!o && (o = b);
				o[0] = op(a[0], b[0]);
				o[1] = op(a[1], b[1]);
				o[2] = op(a[2], b[2]);
				o[3] = op(a[3], b[3]);
				return o;
		  };
	return <[MultiVecOpVV<T>, VecOpVV<T>, VecOpVV<T>, VecOpVV<T>]>[
		vop(dispatch, a, b, c, d),
		b,
		c,
		d,
	];
};

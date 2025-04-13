import type { FnU3 } from "@thi.ng/api";
import type { MultiVecOpVVV, VecOpVVV } from "./api.js";
import { vop } from "./vop.js";

export const defOpVVV = <T = number>(
	op: FnU3<T>,
	dispatch = 1,
	outA = true
) => {
	const a: VecOpVVV<T> = outA
		? (o, a, b, c) => {
				!o && (o = a);
				for (let i = a.length; i-- > 0; ) o[i] = op(a[i], b[i], c[i]);
				return o;
		  }
		: (o, a, b, c) => {
				!o && (o = c);
				for (let i = a.length; i-- > 0; ) o[i] = op(a[i], b[i], c[i]);
				return o;
		  };
	const b: VecOpVVV<T> = outA
		? (o, a, b, c) => {
				!o && (o = a);
				o[0] = op(a[0], b[0], c[0]);
				o[1] = op(a[1], b[1], c[1]);
				return o;
		  }
		: (o, a, b, c) => {
				!o && (o = c);
				o[0] = op(a[0], b[0], c[0]);
				o[1] = op(a[1], b[1], c[1]);
				return o;
		  };
	const c: VecOpVVV<T> = outA
		? (o, a, b, c) => {
				!o && (o = a);
				o[0] = op(a[0], b[0], c[0]);
				o[1] = op(a[1], b[1], c[1]);
				o[2] = op(a[2], b[2], c[2]);
				return o;
		  }
		: (o, a, b, c) => {
				!o && (o = c);
				o[0] = op(a[0], b[0], c[0]);
				o[1] = op(a[1], b[1], c[1]);
				o[2] = op(a[2], b[2], c[2]);
				return o;
		  };
	const d: VecOpVVV<T> = outA
		? (o, a, b, c) => {
				!o && (o = a);
				o[0] = op(a[0], b[0], c[0]);
				o[1] = op(a[1], b[1], c[1]);
				o[2] = op(a[2], b[2], c[2]);
				o[3] = op(a[3], b[3], c[3]);
				return o;
		  }
		: (o, a, b, c) => {
				!o && (o = c);
				o[0] = op(a[0], b[0], c[0]);
				o[1] = op(a[1], b[1], c[1]);
				o[2] = op(a[2], b[2], c[2]);
				o[3] = op(a[3], b[3], c[3]);
				return o;
		  };
	return <[MultiVecOpVVV<T>, VecOpVVV<T>, VecOpVVV<T>, VecOpVVV<T>]>[
		vop(dispatch, a, b, c, d),
		b,
		c,
		d,
	];
};

import type { FnN3 } from "@thi.ng/api";
import type { VecOpSGVVV, VecOpSVVV } from "./api.js";

export const defOpSVVV = (
	op: FnN3
): [VecOpSGVVV, VecOpSVVV, VecOpSVVV, VecOpSVVV] => [
	(
		o,
		a,
		b,
		c,
		k,
		io = 0,
		ia = 0,
		ib = 0,
		ic = 0,
		so = 1,
		sa = 1,
		sb = 1,
		sc = 1
	) => {
		!o && (o = a);
		while (k-- > 0)
			o[io + k * so] = op(a[ia + k * sa], b[ib + k * sb], c[ic + k * sc]);
		return o;
	},
	(
		o,
		a,
		b,
		c,
		io = 0,
		ia = 0,
		ib = 0,
		ic = 0,
		so = 1,
		sa = 1,
		sb = 1,
		sc = 1
	) => {
		!o && (o = a);
		o[io] = op(a[ia], b[ib], c[ic]);
		o[io + so] = op(a[ia + sa], b[ib + sb], c[ic + sc]);
		return o;
	},
	(
		o,
		a,
		b,
		c,
		io = 0,
		ia = 0,
		ib = 0,
		ic = 0,
		so = 1,
		sa = 1,
		sb = 1,
		sc = 1
	) => {
		!o && (o = a);
		o[io] = op(a[ia], b[ib], c[ic]);
		o[io + so] = op(a[ia + sa], b[ib + sb], c[ic + sc]);
		o[io + 2 * so] = op(a[ia + 2 * sa], b[ib + 2 * sb], c[ic + 2 * sc]);
		return o;
	},
	(
		o,
		a,
		b,
		c,
		io = 0,
		ia = 0,
		ib = 0,
		ic = 0,
		so = 1,
		sa = 1,
		sb = 1,
		sc = 1
	) => {
		!o && (o = a);
		o[io] = op(a[ia], b[ib], c[ic]);
		o[io + so] = op(a[ia + sa], b[ib + sb], c[ic + sc]);
		o[io + 2 * so] = op(a[ia + 2 * sa], b[ib + 2 * sb], c[ic + 2 * sc]);
		o[io + 3 * so] = op(a[ia + 3 * sa], b[ib + 3 * sb], c[ic + 3 * sc]);
		return o;
	},
];

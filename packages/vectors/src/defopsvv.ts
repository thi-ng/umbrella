import type { FnN2 } from "@thi.ng/api";
import type { VecOpSGVV, VecOpSVV } from "./api.js";

export const defOpSVV = (
	op: FnN2
): [VecOpSGVV, VecOpSVV, VecOpSVV, VecOpSVV] => [
	(o, a, b, k, io = 0, ia = 0, ib = 0, so = 1, sa = 1, sb = 1) => {
		!o && (o = a);
		while (k-- > 0) o[io + k * so] = op(a[ia + k * sa], b[ib + k * sb]);
		return o;
	},
	(o, a, b, io = 0, ia = 0, ib = 0, so = 1, sa = 1, sb = 1) => {
		!o && (o = a);
		o[io] = op(a[ia], b[ib]);
		o[io + so] = op(a[ia + sa], b[ib + sb]);
		return o;
	},
	(o, a, b, io = 0, ia = 0, ib = 0, so = 1, sa = 1, sb = 1) => {
		!o && (o = a);
		o[io] = op(a[ia], b[ib]);
		o[io + so] = op(a[ia + sa], b[ib + sb]);
		o[io + 2 * so] = op(a[ia + 2 * sa], b[ib + 2 * sb]);
		return o;
	},
	(o, a, b, io = 0, ia = 0, ib = 0, so = 1, sa = 1, sb = 1) => {
		!o && (o = a);
		o[io] = op(a[ia], b[ib]);
		o[io + so] = op(a[ia + sa], b[ib + sb]);
		o[io + 2 * so] = op(a[ia + 2 * sa], b[ib + 2 * sb]);
		o[io + 3 * so] = op(a[ia + 3 * sa], b[ib + 3 * sb]);
		return o;
	},
];

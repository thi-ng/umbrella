import type { FnN2 } from "@thi.ng/api";
import type { VecOpSGVN, VecOpSVN } from "./api.js";

export const defOpSVN = (
	op: FnN2
): [VecOpSGVN, VecOpSVN, VecOpSVN, VecOpSVN] => [
	(o, a, n, k, io = 0, ia = 0, so = 1, sa = 1) => {
		!o && (o = a);
		while (k-- > 0) o[io + k * so] = op(a[ia + k * sa], n);
		return o;
	},
	(o, a, n, io = 0, ia = 0, so = 1, sa = 1) => {
		!o && (o = a);
		o[io] = op(a[ia], n);
		o[io + so] = op(a[ia + sa], n);
		return o;
	},
	(o, a, n, io = 0, ia = 0, so = 1, sa = 1) => {
		!o && (o = a);
		o[io] = op(a[ia], n);
		o[io + so] = op(a[ia + sa], n);
		o[io + 2 * so] = op(a[ia + 2 * sa], n);
		return o;
	},
	(o, a, n, io = 0, ia = 0, so = 1, sa = 1) => {
		!o && (o = a);
		o[io] = op(a[ia], n);
		o[io + so] = op(a[ia + sa], n);
		o[io + 2 * so] = op(a[ia + 2 * sa], n);
		o[io + 3 * so] = op(a[ia + 3 * sa], n);
		return o;
	},
];

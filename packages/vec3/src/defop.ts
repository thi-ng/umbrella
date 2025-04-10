import type { FnN, FnN2, FnN3 } from "@thi.ng/api";
import type { VecOpV, VecOpVN, VecOpVV, VecOpVVV } from "@thi.ng/vec-api";

export const defOpV =
	(op: FnN): VecOpV =>
	(o, a) => {
		!o && (o = a);
		o[0] = op(a[0]);
		o[1] = op(a[1]);
		o[2] = op(a[2]);
		return o;
	};

/**
 * @remarks
 * - result=0 new default out
 * - result=1 default out `a` (default)
 * - result=2 default out `b`
 *
 * @param op
 * @param result
 */
export const defOpVV = (op: FnN2, result = 1): VecOpVV => {
	switch (result) {
		case 0:
			throw new Error();
		case 1:
		default:
			return (o, a, b) => {
				!o && (o = a);
				o[0] = op(a[0], b[0]);
				o[1] = op(a[1], b[1]);
				o[2] = op(a[2], b[2]);
				return o;
			};
		case 2:
			return (o, a, b) => {
				!o && (o = b);
				o[0] = op(a[0], b[0]);
				o[1] = op(a[1], b[1]);
				o[2] = op(a[2], b[2]);
				return o;
			};
	}
};

export const defOpVN =
	(op: FnN2): VecOpVN =>
	(o, a, n) => {
		!o && (o = a);
		o[0] = op(a[0], n);
		o[1] = op(a[1], n);
		o[2] = op(a[2], n);
		return o;
	};

export const defOpVVV = (op: FnN3, result = 1): VecOpVVV => {
	switch (result) {
		case 0:
			throw new Error();
		case 1:
		default:
			return (o, a, b, c) => {
				!o && (o = a);
				o[0] = op(a[0], b[0], c[0]);
				o[1] = op(a[1], b[1], c[1]);
				o[2] = op(a[2], b[2], c[2]);
				return o;
			};
		case 2:
			return (o, a, b, c) => {
				!o && (o = c);
				o[0] = op(a[0], b[0], c[0]);
				o[1] = op(a[1], b[1], c[1]);
				o[2] = op(a[2], b[2], c[2]);
				return o;
			};
	}
};

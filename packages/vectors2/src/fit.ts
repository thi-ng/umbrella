import { fit as op } from "@thi.ng/math/fit";
import type { MultiVecOpVVVVV, VecOpVVVVV } from "./api.js";
import { vop } from "./vop.js";

/**
 * Componentwise maps given 2D vector `a` from the closed source interval
 * defined by `[b,c]` to the target interval `[d,e]`. Writes result into `o`
 * (or if null, back into `a`)
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 * @param d - input vector
 * @param e - input vector
 */
export const fit2: VecOpVVVVV = (o, a, b, c, d, e) => {
	!o && (o = a);
	o[0] = op(a[0], b[0], c[0], d[0], e[0]);
	o[1] = op(a[1], b[1], c[1], d[1], e[1]);
	return o;
};

/**
 * Componentwise maps given 3D vector `a` from the closed source interval
 * defined by `[b,c]` to the target interval `[d,e]`. Writes result into `o`
 * (or if null, back into `a`)
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 * @param d - input vector
 * @param e - input vector
 */
export const fit3: VecOpVVVVV = (o, a, b, c, d, e) => {
	!o && (o = a);
	o[0] = op(a[0], b[0], c[0], d[0], e[0]);
	o[1] = op(a[1], b[1], c[1], d[1], e[1]);
	return o;
};

/**
 * Componentwise maps given 4D vector `a` from the closed source interval
 * defined by `[b,c]` to the target interval `[d,e]`. Writes result into `o`
 * (or if null, back into `a`)
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 * @param d - input vector
 * @param e - input vector
 */
export const fit4: VecOpVVVVV = (o, a, b, c, d, e) => {
	!o && (o = a);
	o[0] = op(a[0], b[0], c[0], d[0], e[0]);
	o[1] = op(a[1], b[1], c[1], d[1], e[1]);
	return o;
};

export const fit: MultiVecOpVVVVV = vop(
	1,
	(o, a, b, c, d, e) => {
		!o && (o = a);
		for (let i = a.length; i-- > 0; )
			o[i] = op(a[i], b[i], c[i], d[i], e[i]);
		return o;
	},
	fit2,
	fit3,
	fit4
);

import { fit01, fit11, fit as op } from "@thi.ng/math/fit";
import type { VecOpVVVVV } from "@thi.ng/vec-api";
import { defOpVVV } from "./defop.js";

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
 * Componentwise maps given 2D vector `a` from the closed `[0,1]` interval to
 * the closed target defined by `[b,c]`. Writes result into `o` (or if null,
 * back into `a`)
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const fit01_2 = defOpVVV(fit01);

/**
 * Componentwise maps given 2D vector `a` from the closed `[-1,1]` interval to
 * the closed target defined by `[b,c]`. Writes result into `o` (or if null,
 * back into `a`)
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const fit11_2 = defOpVVV(fit11);

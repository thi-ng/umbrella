import { clamp, clamp01, clamp11 } from "@thi.ng/math/interval";
import { defOpV, defOpVVV } from "./defop.js";
import type { VecOpVNN } from "@thi.ng/vec-api";

/**
 * Componentwise constrains given 2D vector `a` to the closed interval defined
 * by vectors `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const clamp3 = defOpVVV(clamp);

/**
 * Componentwise constrains given 2D vector `a` to the closed [0,1] interval.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const clamp01_3 = defOpV(clamp01);

/**
 * Componentwise constrains given 2D vector `a` to the closed [-1,1] interval.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const clamp11_3 = defOpV(clamp11);

/**
 * Componentwise constrains value of given 2D vector `a` to the closed interval
 * defined by scalars `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - scalar
 * @param c - scalar
 */
export const clampN3: VecOpVNN = (o, a, n, m) => {
	!o && (o = a);
	o[0] = clamp(a[0], n, m);
	o[1] = clamp(a[1], n, m);
	o[2] = clamp(a[2], n, m);
	return o;
};

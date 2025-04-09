import { roundTo as op } from "@thi.ng/math/prec";
import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise rounds given nD vector `a` to multiples of components in
 * vector `b`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const round: VecOpVV = (o,a,b)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i],b[i]);}return o;};
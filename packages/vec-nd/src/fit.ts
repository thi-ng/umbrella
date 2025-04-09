import { fit as op } from "@thi.ng/math/fit";
import type { VecOpVVVVV } from "@thi.ng/vec-api";

/**
 * Componentwise maps given nD vector `a` from the closed source interval
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
export const fit: VecOpVVVVV = (o,a,b,c,d,e)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i],b[i],c[i],d[i],e[i]);}return o;};
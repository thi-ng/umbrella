import { fit11 as op } from "@thi.ng/math/fit";
import type { VecOpVVV } from "@thi.ng/vec-api";

/**
 * Componentwise maps given nD vector `a` from the closed `[-1,1]` interval to
 * the closed target defined by `[b,c]`. Writes result into `o` (or if null,
 * back into `a`)
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const fit11: VecOpVVV = (o,a,b,c)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i],b[i],c[i]);}return o;};
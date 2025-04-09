import { mod as op } from "@thi.ng/math/prec";
import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Same as {@link mod}, but 2nd operand is a single scalar (uniform domain for
 * all vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const modN: VecOpVN = (o,a,n)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i],n);}return o;};
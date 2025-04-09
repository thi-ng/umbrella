import { remainder as op } from "@thi.ng/math/libc";
import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Same as {@link remainder}, but but second operand is a single scalar
 * (uniform domain for all vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const remainderN: VecOpVN = (o,a,n)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i],n);}return o;};
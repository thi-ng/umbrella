import { safeDiv as op } from "@thi.ng/math/safe-div";
import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise divides given nD vector `a` by vector `b`. If a divisor
 * component is zero, the result will be zero too.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const safeDiv: VecOpVV = (o,a,b)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i],b[i]);}return o;};
import { deg as op } from "@thi.ng/math/angle";
import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes converts radians to degrees of given nD vector. Also
 * see {@link radians}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const degrees: VecOpV = (o,a)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i]);}return o;};
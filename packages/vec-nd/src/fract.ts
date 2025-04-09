import { fract as op } from "@thi.ng/math/prec";
import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes fractional parts of given nD vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fract: VecOpV = (o,a)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i]);}return o;};
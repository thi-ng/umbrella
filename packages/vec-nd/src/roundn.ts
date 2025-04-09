import { roundTo as op } from "@thi.ng/math/prec";
import type { VecOpVO } from "@thi.ng/vec-api";

/**
 * Componentwise rounds given nD vector `a` to multiples of uniform scalar `n`
 * (default: 1).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const roundN: VecOpVO<number> = (o,a,n=1)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i],n);}return o;};
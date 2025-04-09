import { roundTo as op } from "@thi.ng/math/prec";
import type { VecOpVO } from "@thi.ng/vec-api";

/**
 * Componentwise rounds given 4D vector `a` to multiples of uniform scalar `n`
 * (default: 1).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const roundN4: VecOpVO<number> = (o,a,n=1)=>{!o && (o=a);o[0]=op(a[0],n);o[1]=op(a[1],n);o[2]=op(a[2],n);o[3]=op(a[3],n);return o;};
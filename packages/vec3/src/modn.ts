import { mod as op } from "@thi.ng/math/prec";
import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Same as {@link mod3}, but 2nd operand is a single scalar (uniform domain for
 * all vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const modN3: VecOpVN = (o,a,n)=>{!o && (o=a);o[0]=op(a[0],n);o[1]=op(a[1],n);o[2]=op(a[2],n);return o;};
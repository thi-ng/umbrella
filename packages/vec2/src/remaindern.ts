import { remainder as op } from "@thi.ng/math/libc";
import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Same as {@link remainder2}, but but second operand is a single scalar
 * (uniform domain for all vector components).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const remainderN2: VecOpVN = (o,a,n)=>{!o && (o=a);o[0]=op(a[0],n);o[1]=op(a[1],n);return o;};
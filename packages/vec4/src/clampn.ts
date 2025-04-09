import { clamp as op } from "@thi.ng/math/interval";
import type { VecOpVNN } from "@thi.ng/vec-api";

/**
 * Componentwise constrains value of given 4D vector `a` to the closed interval
 * defined by scalars `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - scalar
 * @param c - scalar
 */
export const clampN4: VecOpVNN = (o,a,n,m)=>{!o && (o=a);o[0]=op(a[0],n,m);o[1]=op(a[1],n,m);o[2]=op(a[2],n,m);o[3]=op(a[3],n,m);return o;};
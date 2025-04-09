import { clamp as op } from "@thi.ng/math/interval";
import type { VecOpVNN } from "@thi.ng/vec-api";

/**
 * Componentwise constrains value of given 2D vector `a` to the closed interval
 * defined by scalars `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - scalar
 * @param c - scalar
 */
export const clampN2: VecOpVNN = (o,a,n,m)=>{!o && (o=a);o[0]=op(a[0],n,m);o[1]=op(a[1],n,m);return o;};
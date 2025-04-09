import { clamp as op } from "@thi.ng/math/interval";
import type { VecOpVNN } from "@thi.ng/vec-api";

/**
 * Componentwise constrains value of given nD vector `a` to the closed interval
 * defined by scalars `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - scalar
 * @param c - scalar
 */
export const clampN: VecOpVNN = (o,a,n,m)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i],n,m);}return o;};
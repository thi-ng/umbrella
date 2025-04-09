import { clamp11 as op } from "@thi.ng/math/interval";
import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise constrains given nD vector `a` to the closed [-1,1] interval.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const clamp11: VecOpV = (o,a)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i]);}return o;};
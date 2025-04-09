import { rad as op } from "@thi.ng/math/angle";
import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes converts degrees to radians of given nD vector. Also
 * see {@link degrees}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const radians: VecOpV = (o,a)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i]);}return o;};
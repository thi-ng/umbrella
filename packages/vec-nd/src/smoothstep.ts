import { smoothStep as op } from "@thi.ng/math/step";
import type { VecOpVVV } from "@thi.ng/vec-api";

/**
 * Componentwise computes GLSL `smoothstep()` for given nD vector `c` and using
 * "edge" vectors `a` and `b`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const smoothStep: VecOpVVV = (o,e1,e2,a)=>{!o&&(o=a);for(let i=a.length;--i>=0;) {o[i]=op(e1[i],e2[i],a[i]);}return o;};
import { step as op } from "@thi.ng/math/step";
import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise computes GLSL `step()` for given nD vector `b` and "edge"
 * vectors `a`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const step: VecOpVV = (o,e,a)=>{!o&&(o=a);for(let i=a.length;--i>=0;) {o[i]=op(e[i],a[i]);}return o;};
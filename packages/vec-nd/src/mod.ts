import { mod as op } from "@thi.ng/math/prec";
import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise computes modulo of given nD vector. Similar to {@link fmod},
 * {@link remainder}. Returns `a - b * floor(a / b)` (same as GLSL `mod(a,
 * b)`).
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mod: VecOpVV = (o,a,b)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i],b[i]);}return o;};
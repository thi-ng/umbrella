import { remainder as op } from "@thi.ng/math/libc";
import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise computes modulo of given nD vector. Uses the same logic as the
 * standard C function `remainder()`, i.e. componentwise `a - b * round(a /
 * b)`. Also see {@link mod}, {@link fmod}.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const remainder: VecOpVV = (o,a,b)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i],b[i]);}return o;};
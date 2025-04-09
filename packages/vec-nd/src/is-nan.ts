import type { ToBVecOpV } from "@thi.ng/vec-api";

const op = globalThis.isNaN;

/**
 * Componentwise checks if given nD vector is NaN and writes results to boolean
 * output vector. If `out` is null, creates a new result vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isNaN: ToBVecOpV = (o,a)=>{!o&&(o=[]);for(let i=a.length;--i>=0;) {o[i]=op(a[i]);}return o;};
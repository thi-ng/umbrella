import type { ToBVecOpV } from "@thi.ng/vec-api";

const op = globalThis.isNaN;

/**
 * Componentwise checks if given 4D vector is NaN and writes results to boolean
 * output vector. If `out` is null, creates a new result vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const isNaN4: ToBVecOpV = (o,a)=>{!o&&(o=[]);o[0]=op(a[0]);o[1]=op(a[1]);o[2]=op(a[2]);o[3]=op(a[3]);return o;};
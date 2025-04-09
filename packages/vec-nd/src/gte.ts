import type { CompareOp } from "@thi.ng/vec-api";

/**
 * Compnentwise checks if given nD vector `a` is greater than or equal to `b`
 * and writes results to boolean output vector. If `out` is null, creates a new
 * result vector.
 */
export const gte: CompareOp = (o,a,b) => {
!o&&(o=[]);for(let i=a.length;--i>=0;) {o[i]=a[i]>=b[i];}return o;
};
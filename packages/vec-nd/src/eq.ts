import type { CompareOp } from "@thi.ng/vec-api";

/**
 * Compnentwise checks if given nD vectors `a` and `b` are equal (using `===`
 * for comparison) and writes results to boolean output vector. If `out` is
 * null, creates a new result vector.
 */
export const eq: CompareOp = (o,a,b) => {
!o&&(o=[]);for(let i=a.length;--i>=0;) {o[i]=a[i]===b[i];}return o;
};
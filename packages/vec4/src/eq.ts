import type { CompareOp } from "@thi.ng/vec-api";

/**
 * Compnentwise checks if given 4D vectors `a` and `b` are equal (using `===`
 * for comparison) and writes results to boolean output vector. If `out` is
 * null, creates a new result vector.
 */
export const eq4: CompareOp = (o,a,b) => {
!o&&(o=[]);o[0]=a[0]===b[0];o[1]=a[1]===b[1];o[2]=a[2]===b[2];o[3]=a[3]===b[3];return o;
};
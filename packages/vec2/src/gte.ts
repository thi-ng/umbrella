import type { CompareOp } from "@thi.ng/vec-api";

/**
 * Compnentwise checks if given 2D vector `a` is greater than or equal to `b`
 * and writes results to boolean output vector. If `out` is null, creates a new
 * result vector.
 */
export const gte2: CompareOp = (o,a,b) => {
!o&&(o=[]);o[0]=a[0]>=b[0];o[1]=a[1]>=b[1];return o;
};
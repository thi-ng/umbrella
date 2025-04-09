import type { VecOpSGN } from "@thi.ng/vec-api";

/**
 * Sets all components of nD strided vector to scalar value `n`.
 *
 * @param out - output vector
 * @param n - scalar
 * @param size - vector size
 * @param io - index (default: 0)
 * @param so - stride (default: 1)
 */
export const setNS: VecOpSGN = (o,n,k,io=0,so=1) => {
!o&&(o=[]);while(k-->0) {o[io+k*so]=n;}return o;
};
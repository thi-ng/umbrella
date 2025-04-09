import type { VecOpSGV } from "@thi.ng/vec-api";

/**
 * Copies nD strided vector `a` to `o`.
 *
 * @param out - output vector
 * @param a - input vector
 * @param size - vector size
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 */
export const setS: VecOpSGV = (o,a,k,io=0,ia=0,so=1,sa=1) => {
!o&&(o=[]);while(k-->0) {o[io+k*so]=a[ia+k*sa];}return o;
};
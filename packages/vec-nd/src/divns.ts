import type { VecOpSGVN } from "@thi.ng/vec-api";

/**
 * Componentwise nD strided vector division with uniform scalar.
 *
 * @param out - output vector
 * @param a - input vector
 * @param n - scalar
 * @param size - vector size
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 */
export const divNS: VecOpSGVN = (o,a,n,k,io=0,ia=0,so=1,sa=1) => {
!o&&(o=a);while(k-->0) {o[io+k*so]=a[ia+k*sa]/n;}return o;
};
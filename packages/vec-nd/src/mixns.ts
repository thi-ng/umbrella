import type { VecOpSGVVN } from "@thi.ng/vec-api";

/**
 * Componentwise nD strided vector linear interpolation with uniform scalar.
 * `o = a + (b - a) * n`
 *
 * @param out - output vector
 * @param a - input vector
 * @param n - scalar
 * @param b - input vector
 * @param size - vector size
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param ib - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 * @param sb - stride (default: 1)
 */
export const mixNS: VecOpSGVVN = (o,a,b,n,k,io=0,ia=0,ib=0,so=1,sa=1,sb=1) => {
!o&&(o=a);while(k-->0) {o[io+k*so]=a[ia+k*sa]+(b[ib+k*sb]-a[ia+k*sa])*n;}return o;
};
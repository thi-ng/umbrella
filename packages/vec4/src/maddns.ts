import type { VecOpSVNV } from "@thi.ng/vec-api";

/**
 * Componentwise 4D strided vector multiply-add with uniform scalar.
 * `o = a * n + b`
 *
 * @param out - output vector
 * @param a - input vector
 * @param n - scalar
 * @param b - input vector
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param ib - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 * @param sb - stride (default: 1)
 */
export const maddNS4: VecOpSVNV = (o,a,n,b,io=0,ia=0,ib=0,so=1,sa=1,sb=1) => {
!o && (o=a);o[io]=(a[ia]*n)+b[ib];o[io+so]=(a[ia+sa]*n)+b[ib+sb];o[io+2*so]=(a[ia+2*sa]*n)+b[ib+2*sb];o[io+3*so]=(a[ia+3*sa]*n)+b[ib+3*sb];return o;
};
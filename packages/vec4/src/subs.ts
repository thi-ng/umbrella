import type { VecOpSVV } from "@thi.ng/vec-api";

/**
 * Componentwise 4D strided vector subtraction.
 *
 * @param out - output vector
 * @param a - input vector
 * @param b - input vector
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param ib - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 * @param sb - stride (default: 1)
 */
export const subS4: VecOpSVV = (o,a,b,io=0,ia=0,ib=0,so=1,sa=1,sb=1) => {
!o && (o=a);o[io]=a[ia]-b[ib];o[io+so]=a[ia+sa]-b[ib+sb];o[io+2*so]=a[ia+2*sa]-b[ib+2*sb];o[io+3*so]=a[ia+3*sa]-b[ib+3*sb];return o;
};
import type { VecOpSVVV } from "@thi.ng/vec-api";

/**
 * Componentwise 4D strided vector multiply-add.
 * `o = a * b + c`
 *
 * @param out - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param ib - index (default: 0)
 * @param ic - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 * @param sb - stride (default: 1)
 * @param sc - stride (default: 1)
 */
export const maddS4: VecOpSVVV = (o,a,b,c,io=0,ia=0,ib=0,ic=0,so=1,sa=1,sb=1,sc=1) => {
!o && (o=a);o[io]=(a[ia]*b[ib])+c[ic];o[io+so]=(a[ia+sa]*b[ib+sb])+c[ic+sc];o[io+2*so]=(a[ia+2*sa]*b[ib+2*sb])+c[ic+2*sc];o[io+3*so]=(a[ia+3*sa]*b[ib+3*sb])+c[ic+3*sc];return o;
};
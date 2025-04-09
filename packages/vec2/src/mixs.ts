import type { VecOpSVVV } from "@thi.ng/vec-api";

/**
 * Componentwise 2D strided vector linear interpolation.
 * `o = a + (b - a) * c`
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
export const mixS2: VecOpSVVV = (o,a,b,c,io=0,ia=0,ib=0,ic=0,so=1,sa=1,sb=1,sc=1) => {
!o && (o=a);o[io]=a[ia]+(b[ib]-a[ia])*c[ic];o[io+so]=a[ia+sa]+(b[ib+sb]-a[ia+sa])*c[ic+sc];return o;
};
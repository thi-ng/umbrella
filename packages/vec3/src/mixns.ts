import type { VecOpSVVN } from "@thi.ng/vec-api";

/**
 * Componentwise 3D strided vector linear interpolation with uniform scalar.
 * `o = a + (b - a) * n`
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
export const mixNS3: VecOpSVVN = (o,a,b,n,io=0,ia=0,ib=0,so=1,sa=1,sb=1) => {
!o && (o=a);o[io]=a[ia]+(b[ib]-a[ia])*n;o[io+so]=a[ia+sa]+(b[ib+sb]-a[ia+sa])*n;o[io+2*so]=a[ia+2*sa]+(b[ib+2*sb]-a[ia+2*sa])*n;return o;
};
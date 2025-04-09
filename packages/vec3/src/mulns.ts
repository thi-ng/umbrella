import type { VecOpSVN } from "@thi.ng/vec-api";

/**
 * Componentwise 3D strided vector multiplication with uniform scalar.
 *
 * @param out - output vector
 * @param a - input vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 */
export const mulNS3: VecOpSVN = (o,a,n,io=0,ia=0,so=1,sa=1) => {
!o && (o=a);o[io]=a[ia]*n;o[io+so]=a[ia+sa]*n;o[io+2*so]=a[ia+2*sa]*n;return o;
};
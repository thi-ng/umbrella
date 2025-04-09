import type { VecOpSV } from "@thi.ng/vec-api";

/**
 * Copies 4D strided vector `a` to `o`.
 *
 * @param out - output vector
 * @param a - input vector
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 */
export const setS4: VecOpSV = (o,a,io=0,ia=0,so=1,sa=1) => {
!o&&(o=[]);o[io]=a[ia];o[io+so]=a[ia+sa];o[io+2*so]=a[ia+2*sa];o[io+3*so]=a[ia+3*sa];return o;
};
import type { VecOpSN } from "@thi.ng/vec-api";

/**
 * Sets all components of 3D strided vector to scalar value `n`.
 *
 * @param out - output vector
 * @param n - scalar
 * @param io - index (default: 0)
 * @param so - stride (default: 1)
 */
export const setNS3: VecOpSN = (o,n,io=0,so=1) => {
!o&&(o=[]);o[io]=n;o[io+so]=n;o[io+2*so]=n;return o;
};
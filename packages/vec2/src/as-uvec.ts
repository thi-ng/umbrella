import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise converts given 2D vector to unsigned integer.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asUVec2: VecOpV = (o,a) => {
!o&&(o=[]);o[0]=a[0]>>>0;o[1]=a[1]>>>0;return o;
};
import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise converts given 3D vector to signed integer.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const asIVec3: VecOpV = (o,a) => {
!o&&(o=[]);o[0]=a[0]|0;o[1]=a[1]|0;o[2]=a[2]|0;return o;
};
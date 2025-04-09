import type { VecOpVN } from "@thi.ng/vec-api";

/**
 * Componentwise 3D vector division with a uniform scalar.
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const divN3: VecOpVN = (o,a,n) => {
!o && (o=a);o[0]=a[0]/n;o[1]=a[1]/n;o[2]=a[2]/n;return o;
};
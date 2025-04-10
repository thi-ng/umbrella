import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise changes the sign of given 3D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const neg3: VecOpV = (o,a) => {
!o && (o=a);o[0]=-a[0];o[1]=-a[1];o[2]=-a[2];return o;
};

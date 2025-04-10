import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise changes the sign of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const neg2: VecOpV = (o,a) => {
!o && (o=a);o[0]=-a[0];o[1]=-a[1];return o;
};

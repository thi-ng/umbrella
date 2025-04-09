import type { VecOpN } from "@thi.ng/vec-api";

/**
 * Sets all components of 2D vector to scalar value `n`.
 *
 * @param a - vector
 * @param n - scalar
 */
export const setN2: VecOpN = (a,n) => {
a[0]=n;a[1]=n;return a;
};
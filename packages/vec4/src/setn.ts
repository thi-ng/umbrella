import type { VecOpN } from "@thi.ng/vec-api";

/**
 * Sets all components of 4D vector to scalar value `n`.
 *
 * @param a - vector
 * @param n - scalar
 */
export const setN4: VecOpN = (a,n) => {
a[0]=n;a[1]=n;a[2]=n;a[3]=n;return a;
};
import type { VecOpN } from "@thi.ng/vec-api";

/**
 * Sets all components of nD vector to scalar value `n`.
 *
 * @param a - vector
 * @param n - scalar
 */
export const setN: VecOpN = (a,n) => {
for(let i=a.length;--i>=0;) {a[i]=n;}return a;
};
import type { Vec, VecOpN } from "@thi.ng/vec-api";

/**
 * Sets all components of 2D vector to scalar value `n`.
 *
 * @param a - vector
 * @param n - scalar
 */
export const setN2: VecOpN = (a, n) => {
	a[0] = n;
	a[1] = n;
	return a;
};

export const zeroes2 = (): Vec => [0, 0];

export const ones2 = (): Vec => [1, 1];

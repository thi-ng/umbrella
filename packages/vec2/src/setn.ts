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

export const zeroes = (n: number): Vec => new Array<number>(n).fill(0);

export const ones = (n: number): Vec => new Array<number>(n).fill(1);

// SPDX-License-Identifier: Apache-2.0
import type { MultiVecOpN, Vec, VecOpN } from "./api.js";
import { vop } from "./vop.js";

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

/**
 * Sets all components of 3D vector to scalar value `n`.
 *
 * @param a - vector
 * @param n - scalar
 */
export const setN3: VecOpN = (a, n) => {
	a[0] = n;
	a[1] = n;
	a[2] = n;
	return a;
};

/**
 * Sets all components of 4D vector to scalar value `n`.
 *
 * @param a - vector
 * @param n - scalar
 */
export const setN4: VecOpN = (a, n) => {
	a[0] = n;
	a[1] = n;
	a[2] = n;
	a[3] = n;
	return a;
};

export const setN: MultiVecOpN = vop(
	0,
	(a, n) => {
		for (let i = a.length; i-- > 0; ) a[i] = n;
		return a;
	},
	setN2,
	setN3,
	setN4
);

export const zero = (a: Vec) => setN(a, 0);
export const one = (a: Vec) => setN(a, 1);

export const zeroes = (n: number): Vec => Array<number>(n).fill(0);
export const ones = (n: number): Vec => Array<number>(n).fill(1);

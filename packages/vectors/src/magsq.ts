// SPDX-License-Identifier: Apache-2.0
import type { MultiVecOpRoV, VecOpRoV } from "./api.js";
import { vop } from "./vop.js";

/**
 * Computes magnitude of given 2D vector.
 */
export const magSq2: VecOpRoV<number> = (a) => a[0] * a[0] + a[1] * a[1];

/**
 * Computes magnitude of given 3D vector.
 */
export const magSq3: VecOpRoV<number> = (a) =>
	a[0] * a[0] + a[1] * a[1] + a[2] * a[2];

/**
 * Computes magnitude of given 4D vector.
 */
export const magSq4: VecOpRoV<number> = (a) =>
	a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];

/**
 * Computes magnitude of given nD vector. Multi-method.
 */
export const magSq: MultiVecOpRoV<number> = vop(
	0,
	(a) => {
		let sum = 0;
		for (let i = a.length; i-- > 0; ) sum += a[i] * a[i];
		return sum;
	},
	magSq2,
	magSq3,
	magSq4
);

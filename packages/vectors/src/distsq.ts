// SPDX-License-Identifier: Apache-2.0
import type { DistanceFn, MultiVecOpRoVV } from "./api.js";
import { vop } from "./vop.js";

/**
 * Computes the squared Eucledian distance between given 2D vectors.
 */
export const distSq2: DistanceFn = (a, b) => {
	const dx = a[0] - b[0];
	const dy = a[1] - b[1];
	return dx * dx + dy * dy;
};

/**
 * Computes the squared Eucledian distance between given 3D vectors.
 */
export const distSq3: DistanceFn = (a, b) => {
	const dx = a[0] - b[0];
	const dy = a[1] - b[1];
	const dz = a[2] - b[2];
	return dx * dx + dy * dy + dz * dz;
};

/**
 * Computes the squared Eucledian distance between given 4D vectors.
 */
export const distSq4: DistanceFn = (a, b) => {
	const dx = a[0] - b[0];
	const dy = a[1] - b[1];
	const dz = a[2] - b[2];
	const dw = a[3] - b[3];
	return dx * dx + dy * dy + dz * dz + dw * dw;
};

/**
 * Computes the squared Eucledian distance between given nD vectors.
 * Multi-method.
 */
export const distSq: MultiVecOpRoVV<number> = vop(
	0,
	(a, b) => {
		let sum = 0;
		for (let i = a.length; i-- > 0; ) {
			const d = a[i] - b[i];
			sum += d * d;
		}
		return sum;
	},
	distSq2,
	distSq3,
	distSq4
);

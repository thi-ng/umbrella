import type { MultiVecOpRoVV, VecOpRoVV } from "./api.js";
import { vop } from "./vop.js";

/**
 * Computes dot product of given 2D vectors.
 */
export const dot2: VecOpRoVV<number> = (a, b) => a[0] * b[0] + a[1] * b[1];

/**
 * Computes dot product of given 3D vectors.
 */
export const dot3: VecOpRoVV<number> = (a, b) =>
	a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/**
 * Computes dot product of given 4D vectors.
 */
export const dot4: VecOpRoVV<number> = (a, b) =>
	a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];

/**
 * Computes dot product of given nD vectors. Multi-method.
 */
export const dot: MultiVecOpRoVV<number> = vop(
	0,
	(a, b) => {
		let sum = 0;
		for (let i = a.length; i-- > 0; ) sum += a[i] * b[i];
		return sum;
	},
	dot2,
	dot3,
	dot4
);

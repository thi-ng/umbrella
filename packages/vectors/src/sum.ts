// SPDX-License-Identifier: Apache-2.0
import type { MultiVecOpRoV, VecOpRoV } from "./api.js";
import { vop } from "./vop.js";

/**
 * Returns component sum of 2D vector `v`.
 *
 * @param v -
 */
export const sum2: VecOpRoV<number> = (a) => a[0] + a[1];

/**
 * Returns component sum of 3D vector `v`.
 *
 * @param v -
 */
export const sum3: VecOpRoV<number> = (a) => a[0] + a[1] + a[2];

/**
 * Returns component sum of 4D vector `v`.
 *
 * @param v -
 */
export const sum4: VecOpRoV<number> = (a) => a[0] + a[1] + a[2] + a[3];

/**
 * Returns component sum of nD vector `v`. Multi-method.
 *
 * @param v -
 */
export const sum: MultiVecOpRoV<number> = vop(
	0,
	(v) => {
		let res = 0;
		for (let i = v.length; i-- > 0; ) res += v[i];
		return res;
	},
	sum2,
	sum3,
	sum4
);

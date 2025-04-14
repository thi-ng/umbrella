// SPDX-License-Identifier: Apache-2.0
import type { MultiVecOpRoV, VecOpRoV } from "./api.js";
import { vop } from "./vop.js";

export const sum2: VecOpRoV<number> = (a) => a[0] + a[1];
export const sum3: VecOpRoV<number> = (a) => a[0] + a[1] + a[2];
export const sum4: VecOpRoV<number> = (a) => a[0] + a[1] + a[2] + a[3];

/**
 * Returns component sum of vector `v`.
 *
 * @param v -
 */
export const sum: MultiVecOpRoV<number> = vop(
	0,
	(v) => {
		let sum = 0;
		for (let i = v.length; i-- > 0; ) sum += v[i];
		return sum;
	},
	sum2,
	sum3,
	sum4
);

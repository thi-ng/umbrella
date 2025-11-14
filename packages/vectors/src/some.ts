// SPDX-License-Identifier: Apache-2.0
import type { BVecOpRoV, MultiBVecOpRoV } from "./api.js";
import { vop } from "./vop.js";

/**
 * Returns true if at least one component in 2D vector `v` is truthy.
 */
export const some2: BVecOpRoV<boolean> = (a) => a[0] || a[1];

/**
 * Returns true if at least one component in 3D vector `v` is truthy.
 */
export const some3: BVecOpRoV<boolean> = (a) => a[0] || a[1] || a[2];

/**
 * Returns true if at least one component in 4D vector `v` is truthy.
 */
export const some4: BVecOpRoV<boolean> = (a) => a[0] || a[1] || a[2] || a[3];

/**
 * Returns true if at least one component in nD vector `v` is truthy.
 */
export const some: MultiBVecOpRoV<boolean> = vop(
	0,
	(v) => {
		for (let i = v.length; i-- > 0; ) {
			if (v[i]) return true;
		}
		return false;
	},
	some2,
	some3,
	some4
);

// SPDX-License-Identifier: Apache-2.0
import type { BVecOpRoV, MultiBVecOpRoV } from "./api.js";
import { vop } from "./vop.js";

/**
 * Returns returns true if all components in 2D vector `v` are truthy.
 */
export const every2: BVecOpRoV<boolean> = (a) => a[0] && a[1];

/**
 * Returns returns true if all components in 3D vector `v` are truthy.
 */
export const every3: BVecOpRoV<boolean> = (a) => a[0] && a[1] && a[2];

/**
 * Returns returns true if all components in 4D vector `v` are truthy.
 */
export const every4: BVecOpRoV<boolean> = (a) => a[0] && a[1] && a[2] && a[3];

/**
 * Returns returns true if all components in nD vector `v` are truthy.
 */
export const every: MultiBVecOpRoV<boolean> = vop(
	0,
	(v) => {
		for (let i = v.length; i-- > 0; ) {
			if (!v[i]) return false;
		}
		return true;
	},
	every2,
	every3,
	every4
);

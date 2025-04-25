// SPDX-License-Identifier: Apache-2.0
import type { MultiVecOpRoV, VecOpRoV } from "./api.js";
import { vop } from "./vop.js";

/**
 * Returns component product of 2D vector `v`.
 *
 * @param v -
 */
export const product2: VecOpRoV<number> = (a) => a[0] * a[1];

/**
 * Returns component product of 3D vector `v`.
 *
 * @param v -
 */
export const product3: VecOpRoV<number> = (a) => a[0] * a[1] * a[2];

/**
 * Returns component product of 4D vector `v`.
 *
 * @param v -
 */
export const product4: VecOpRoV<number> = (a) => a[0] * a[1] * a[2] * a[3];

/**
 * Returns component product of nD vector `v`. Multi-method.
 *
 * @param v -
 */
export const product: MultiVecOpRoV<number> = vop(
	0,
	(v) => {
		let res = 1;
		for (let i = v.length; i-- > 0; ) res *= v[i];
		return res;
	},
	product2,
	product3,
	product4
);

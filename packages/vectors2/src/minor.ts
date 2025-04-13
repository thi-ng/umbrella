// SPDX-License-Identifier: Apache-2.0
import { max2id, max3id, max4id } from "@thi.ng/math/interval";
import type { MultiVecOpRoV, VecOpRoV } from "./api.js";
import { vop } from "./vop.js";

const { abs } = Math;

/**
 * Returns index of minor component in 2D vector `v`, i.e. where `|v[i]|`
 * is the smallest.
 */
export const minor2: VecOpRoV<number> = (a) => max2id(abs(a[0]), abs(a[1]));

/**
 * Returns index of minor component in 3D vector `v`, i.e. where `|v[i]|`
 * is the smallest.
 */
export const minor3: VecOpRoV<number> = (a) =>
	max3id(abs(a[0]), abs(a[1]), abs(a[2]));

/**
 * Returns index of minor component in nD vector `v`, i.e. where `|v[i]|`
 * is the smallest.
 */
export const minor4: VecOpRoV<number> = (a) =>
	max4id(abs(a[0]), abs(a[1]), abs(a[2]), abs(a[3]));

/**
 * Returns index of minor component in nD vector `v`, i.e. where `|v[i]|`
 * is the smallest.
 */
export const minor: MultiVecOpRoV<number> = vop(
	0,
	(a) => {
		let id = -1;
		let min = Infinity;
		for (let i = a.length; i-- > 0; ) {
			const x = abs(a[i]);
			if (x < min) {
				min = x;
				id = i;
			}
		}
		return id;
	},
	minor2,
	minor3,
	minor4
);

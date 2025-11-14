// SPDX-License-Identifier: Apache-2.0
import { max2id, max3id, max4id } from "@thi.ng/math/interval";
import type { MultiVecOpRoV, VecOpRoV } from "./api.js";
import { vop } from "./vop.js";

const { abs } = Math;

/**
 * Returns index of major component/axis in 2D vector `v`, i.e. where `|v[i]|`
 * is the largest.
 */
export const major2: VecOpRoV<number> = (a) => max2id(abs(a[0]), abs(a[1]));

/**
 * Returns index of major component/axis in 3D vector `v`, i.e. where `|v[i]|`
 * is the largest.
 */
export const major3: VecOpRoV<number> = (a) =>
	max3id(abs(a[0]), abs(a[1]), abs(a[2]));

/**
 * Returns index of major component/axis in nD vector `v`, i.e. where `|v[i]|`
 * is the largest.
 */
export const major4: VecOpRoV<number> = (a) =>
	max4id(abs(a[0]), abs(a[1]), abs(a[2]), abs(a[3]));

/**
 * Returns index of major component/axis in nD vector `v`, i.e. where `|v[i]|`
 * is the largest.
 */
export const major: MultiVecOpRoV<number> = vop(
	0,
	(a) => {
		let id = -1;
		let max = -Infinity;
		for (let i = a.length; i-- > 0; ) {
			const x = abs(a[i]);
			if (x > max) {
				max = x;
				id = i;
			}
		}
		return id;
	},
	major2,
	major3,
	major4
);

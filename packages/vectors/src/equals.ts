// SPDX-License-Identifier: Apache-2.0
import type { MultiVecOpRoVV, VecOpRoVV } from "./api.js";
import { vop } from "./vop.js";

export const equals2: VecOpRoVV<boolean> = (a, b) =>
	a.length === b.length && a[0] === b[0] && a[1] === b[1];

export const equals3: VecOpRoVV<boolean> = (a, b) =>
	a.length === b.length && a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

export const equals4: VecOpRoVV<boolean> = (a, b) =>
	a.length === b.length &&
	a[0] === b[0] &&
	a[1] === b[1] &&
	a[2] === b[2] &&
	a[3] === b[3];

export const equals: MultiVecOpRoVV<boolean> = vop(
	0,
	(a, b) => {
		let l = a.length;
		if (l === b.length) {
			while (l-- > 0 && a[l] === b[l]);
		}
		return l < 0;
	},
	equals2,
	equals3,
	equals4
);

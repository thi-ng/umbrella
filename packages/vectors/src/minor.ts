// SPDX-License-Identifier: Apache-2.0
import { min2id, min3id, min4id } from "@thi.ng/math/interval";
import type { MultiVecOpRoV } from "./api.js";
import { vop } from "./vop.js";

const abs = Math.abs;

/**
 * Returns index of minor component/axis in `v`, i.e. where `|v[i]|` is
 * the smallest.
 *
 * @param v -
 */
export const minor: MultiVecOpRoV<number> = vop();

minor.default((a) => {
	let id = -1;
	let min = Infinity;
	for (let i = 0, n = a.length; i < n; i++) {
		const x = abs(a[i]);
		if (x < min) {
			min = x;
			id = i;
		}
	}
	return id;
});

export const minor2 = minor.add(2, (a) => min2id(abs(a[0]), abs(a[1])));
export const minor3 = minor.add(3, (a) =>
	min3id(abs(a[0]), abs(a[1]), abs(a[2]))
);
export const minor4 = minor.add(4, (a) =>
	min4id(abs(a[0]), abs(a[1]), abs(a[2]), abs(a[3]))
);

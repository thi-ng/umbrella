// SPDX-License-Identifier: Apache-2.0
import type { DistanceFn } from "./api.js";

/** @internal */
const { abs } = Math;

/**
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Canberra_distance
 *
 * @param a -
 * @param b -
 */
export const distCanberra: DistanceFn = (a, b) => {
	let delta = 0;
	for (let i = a.length; i-- > 0; ) {
		const aa = a[i];
		const bb = b[i];
		const d = abs(aa) + abs(bb);
		d > 0 && (delta += abs(aa - bb) / d);
	}
	return delta;
};

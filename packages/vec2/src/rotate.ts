// SPDX-License-Identifier: Apache-2.0
import type { VecOpVN } from "@thi.ng/vec-api";
import { set2 } from "./set.js";

/**
 * Rotates given 2D vector `a` by angle `theta` (in radians) and writes result
 * to `out`. If `out` is null, modifies `a` in-place.
 *
 * @param out
 * @param a
 * @param theta
 */
export const rotate2: VecOpVN = (out, a, theta) => {
	out ? out !== a && set2(out, a) : (out = a);
	const s = Math.sin(theta);
	const c = Math.cos(theta);
	const x = a[0];
	const y = a[1];
	out[0] = x * c - y * s;
	out[1] = x * s + y * c;
	return out;
};

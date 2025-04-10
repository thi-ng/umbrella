// SPDX-License-Identifier: Apache-2.0
import type { VecOpV } from "@thi.ng/vec-api";
import { mag2 } from "./mag.js";
import { setC2 } from "./setc.js";

/**
 * Converts 2D cartesian vector `v` to polar coordinates, i.e. `[r,θ]` (angle in
 * radians). See {@link cartesian2} for reverse operation. If `out` is null,
 * modifies `v` in place.
 *
 * @param out - output vector
 * @param v - input vector
 */
export const polar2: VecOpV = (out, v) =>
	setC2(out || v, mag2(v), Math.atan2(v[1], v[0]));

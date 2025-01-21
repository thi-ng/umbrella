// SPDX-License-Identifier: Apache-2.0
import type { MultiVecOpV } from "./api.js";
import { mag } from "./mag.js";
import { setC2, setC3 } from "./setc.js";
import { vop } from "./vop.js";

const sqrt = Math.sqrt;
const asin = Math.asin;
const atan2 = Math.atan2;

/**
 * Converts cartesian vector `v` to polar coordinates. See {@link cartesian}
 * for reverse operation. If `out` is null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 */
export const polar: MultiVecOpV = vop(1);

/**
 * Converts 2D cartesian vector `v` to polar coordinates, i.e. `[r,θ]`
 * (angle in radians). See {@link cartesian} for reverse operation. If `out`
 * is null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 */
export const polar2 = polar.add(2, (out, v) =>
	setC2(out || v, mag(v), atan2(v[1], v[0]))
);

/**
 * Converts 3D cartesian vector `v` to spherical coordinates, i.e.
 * `[r,θ,ϕ]` (angles in radians). See {@link cartesian} for reverse
 * operation. If `out` is null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 */
export const polar3 = polar.add(3, (out, v) => {
	const x = v[0];
	const y = v[1];
	const z = v[2];
	const r = sqrt(x * x + y * y + z * z);
	return r > 0
		? setC3(out || v, r, asin(z / r), atan2(y, x))
		: setC3(out || v, 0, 0, 0);
});

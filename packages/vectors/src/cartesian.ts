// SPDX-License-Identifier: Apache-2.0
import { cossin } from "@thi.ng/math/angle";
import { add2 } from "./add.js";
import { ZERO2, ZERO3, type MultiVecOpVO, type ReadonlyVec } from "./api.js";
import { setC3 } from "./setc.js";
import { vop } from "./vop.js";

const cos = Math.cos;
const sin = Math.sin;

/**
 * Converts polar vector `v` to cartesian coordinates and adds optional
 * `offset`. See {@link polar} for reverse operation. If `out` is null,
 * modifies `v` in place.
 *
 * @param out -
 * @param v -
 * @param offset -
 */
export const cartesian: MultiVecOpVO<ReadonlyVec> = vop(1);

/**
 * Converts 2D polar vector `v` to cartesian coordinates and adds
 * optional `offset`. See {@link polar} for reverse operation. If `out` is
 * null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 * @param offset -
 */
export const cartesian2 = cartesian.add(2, (out, v, offset = ZERO2) =>
	add2(out || v, cossin(v[1], v[0]), offset)
);

/**
 * Converts 3D polar vector `v` to cartesian coordinates and adds
 * optional `offset`. See {@link polar} for reverse operation. If `out` is
 * null, modifies `v` in place.
 *
 * @param out -
 * @param v -
 * @param offset -
 */
export const cartesian3 = cartesian.add(3, (out, v, offset = ZERO3) => {
	const r = v[0];
	const theta = v[1];
	const phi = v[2];
	const ct = cos(theta);
	return setC3(
		out || v,
		r * ct * cos(phi) + offset[0],
		r * ct * sin(phi) + offset[1],
		r * sin(theta) + offset[2]
	);
});

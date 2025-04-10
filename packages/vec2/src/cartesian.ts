// SPDX-License-Identifier: Apache-2.0
import { cossin } from "@thi.ng/math/angle";
import { ZERO2, type ReadonlyVec, type VecOpVO } from "@thi.ng/vec-api";
import { add2 } from "./add.js";

/**
 * Converts 2D polar vector `v` to cartesian coordinates and adds optional
 * `offset`. See {@link polar2} for reverse operation. If `out` is null,
 * modifies `v` in place.
 *
 * @param out - output vector
 * @param v - input vector
 * @param offset - input vector
 */
export const cartesian2: VecOpVO<ReadonlyVec> = (out, v, offset = ZERO2) =>
	add2(out || v, cossin(v[1], v[0]), offset);

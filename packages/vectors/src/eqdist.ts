// SPDX-License-Identifier: Apache-2.0
import { EPS } from "@thi.ng/math/api";
import type { VecOpRoVVO } from "./api.js";

/**
 * Similar to {@link eqDelta2}, but uses eucledian distance instead of per-axis
 * distances as tolerance.
 *
 * @param a
 * @param b
 * @param eps
 */
export const eqDist2: VecOpRoVVO<boolean, number> = (
	[ax, ay],
	[bx, by],
	eps = EPS
) => (ax -= bx) * ax + (ay -= by) * ay <= eps * eps;

/**
 * Similar to {@link eqDelta3}, but uses eucledian distance instead of per-axis
 * distances as tolerance.
 *
 * @param a
 * @param b
 * @param eps
 */
export const eqDist3: VecOpRoVVO<boolean, number> = (
	[ax, ay, az],
	[bx, by, bz],
	eps = EPS
) => (ax -= bx) * ax + (ay -= by) * ay + (az -= bz) * az <= eps * eps;

// SPDX-License-Identifier: Apache-2.0
import { comp } from "@thi.ng/transducers/comp";
import { mapcatIndexed } from "@thi.ng/transducers/mapcat-indexed";
import { partition } from "@thi.ng/transducers/partition";
import { push } from "@thi.ng/transducers/push";
import { transduce } from "@thi.ng/transducers/transduce";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { SubdivKernel } from "./api.js";

/**
 * Takes an array of `points` and an array of subdivision `kernels`. Iterativel
 * applies kernels in given order (each iteration operating on the result of the
 * previous iteration). The `closed` flag (default: false) indicates if the
 * points define a closed or open geometry (i.e. polygon vs. polyline).
 *
 * @remarks
 * References:
 *
 * - https://web.archive.org/web/20060816003547/https://algorithmicbotany.org/papers/subgpu.sig2003.pdf
 * - https://www.csl.mtu.edu/cs3621/common/Subdivision.pdf
 *
 * @param points - source points
 * @param kernels - subdivision scheme(s)
 * @param closed
 */
export function subdivide(
	points: ReadonlyVec[],
	kernels: SubdivKernel[],
	closed = false
): ReadonlyVec[] {
	for (const { fn, pre, size } of kernels) {
		const nump = points.length;
		points = transduce<ReadonlyVec, ReadonlyVec, Vec[]>(
			comp(
				partition(size, 1),
				mapcatIndexed((i, pts) => fn(pts, i, nump, closed))
			),
			push(),
			pre ? pre(points, closed) : points
		);
	}
	return points;
}

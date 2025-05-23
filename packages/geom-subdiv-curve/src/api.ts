// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export interface SubdivKernel {
	/**
	 * Subdivision function. Called with an array of {@link SubdivKernel.size}
	 * consecutive points of the original curve and can produce any number of
	 * result points. Additionally is passed the index `i` of the processed
	 * point and `nump`, the total number of point in the curve/polyline. The
	 * latter 2 args are useful to implement custom behaviors for the start /
	 * end points of the curve.
	 *
	 * @param pts
	 * @param i
	 * @param nump
	 * @param closed
	 */
	fn: (pts: ReadonlyVec[], i: number, nump: number, closed: boolean) => Vec[];
	/**
	 * Optional function to pre-process the original curve points prior
	 * to each subdivision iteration and MUST yield an iterable of
	 * points (e.g. for closed curves / polygons to prepend the last
	 * point before the first). If omitted, the curve points are
	 * processed as is.
	 *
	 * @param pts
	 * @param closed
	 */
	pre?: (pts: ReadonlyVec[], closed: boolean) => Iterable<ReadonlyVec>;
	/**
	 * Kernal size. The subdivision function `fn` always receives `size`
	 * number consecutive points.
	 */
	size: number;
}

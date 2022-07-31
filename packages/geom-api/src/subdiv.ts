import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export interface SubdivKernel {
	/**
	 * Subdivision function. Called with an array of `size` consecutive
	 * points of the original curve and can produce any number of result
	 * points. Additionally is passed the index `i` of the processed
	 * point and `nump`, the total number of point in the
	 * curve/polyline. The latter 2 args are useful to implement custom
	 * behaviors for the start / end points of the curve.
	 */
	fn: (pts: ReadonlyVec[], i: number, nump: number) => Vec[];
	/**
	 * Optional function to pre-process the original curve points prior
	 * to each subdivision iteration and MUST yield an iterable of
	 * points (e.g. for closed curves / polygons to prepend the last
	 * point before the first). If omitted, the curve points are
	 * processed as is.
	 */
	pre?: (pts: ReadonlyVec[]) => Iterable<ReadonlyVec>;
	/**
	 * Kernal size. The subdivision function `fn` always receives `size`
	 * number consecutive points.
	 */
	size: number;
}

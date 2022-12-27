import type { FnU2, Predicate } from "@thi.ng/api";
import type { GridIterator2D, PointTransform } from "@thi.ng/grid-iterators";
import type { ReadonlyMat } from "@thi.ng/matrices";
import type { IntBuffer } from "@thi.ng/pixel";

export interface TraceOpts {
	/**
	 * Integer-based pixel buffer (image).
	 *
	 * @remarks
	 * IMPORTANT: The pixel values in the buffer **will** be mutated as part of
	 * the tracing process!
	 */
	img: IntBuffer;
	/**
	 * Predicate function to determine if a pixel value is considered part of a
	 * line.
	 */
	select: Predicate<number>;
	/**
	 * Minimum length of line segments (in pixels).
	 *
	 * @defaultValue 2
	 */
	min?: number;
	/**
	 * Clear value to replace extracted pixels with.
	 *
	 * @defaultValue 0
	 */
	clear?: number;
	/**
	 * If true (default), lines not terminating at a border will use the
	 * coordinates of the first non-selected pixel as their end point, rather
	 * than those of the last selected pixel.
	 *
	 * @defaultValue true
	 */
	last?: boolean;
}

export interface TraceBitmapOpts extends TraceOpts {
	/**
	 * Optional sequence of {@link Trace} directions/modes to perform. By
	 * default _all_ directions are traced in this order:
	 *
	 * - (h)orizontal
	 * - (v)ertical
	 * - (d)iagonal
	 * - (p)oints
	 */
	dir?: (TraceDir | TraceDirImpl)[];
	/**
	 * Optional 2x3 transformation matrix to transform all extracted coordinates
	 */
	mat?: ReadonlyMat;
}

/**
 * Predefined line trace directions:
 *
 * - `d1`: Diagonal to bottom-left
 * - `d2`: Diagonal to bottom-right
 * - `h`: Horizontal (left to right)
 * - `v`: Vertical (top to bottom)
 * - `p`: Points only
 */
export type TraceDir = "d1" | "d2" | "h" | "p" | "v";

export interface TraceDirImpl {
	/**
	 * Grid iterator, providing stream of pixel coordinates in a certain order.
	 */
	order: GridIterator2D;
	/**
	 * Border predicate function. Called for every selected pixel (coordinates)
	 * and returns true if considered a border pixel.
	 *
	 * @remarks
	 * See {@link borderX}, {@link borderY}, {@link borderXY}.
	 */
	border?: BorderFn;
	/**
	 * Optional point transform passed to {@link TraceDirImpl.order} (e.g. to
	 * flip iteration order and therefore line direction)
	 */
	tx?: PointTransform;
}

export type BorderFn = FnU2<number, Predicate<[number, number]>>;

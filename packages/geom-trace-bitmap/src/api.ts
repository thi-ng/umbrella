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

export type TraceDir = "d" | "h" | "p" | "v";

export interface TraceDirImpl {
	order: GridIterator2D;
	tx?: PointTransform;
	border?: BorderFn;
}

export type BorderFn = FnU2<number, Predicate<[number, number]>>;

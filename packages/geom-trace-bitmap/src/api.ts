import type { Predicate } from "@thi.ng/api";
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
	dir?: TraceDir[];
	/**
	 * Optional 2x3 transformation matrix to transform all extracted coordinates
	 */
	tx?: ReadonlyMat;
}

export type TraceDir = "d" | "h" | "p" | "v";

import type { Fn, UIntArray } from "@thi.ng/api";
import { clamp, clamp01 } from "@thi.ng/math/interval";
import { intBufferFromCanvas, type IntBuffer } from "@thi.ng/pixel/int";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export interface RenderPixelOpts {
	x?: number;
	y?: number;
	w?: number;
	h?: number;
	bufW: number;
	bufH: number;
	offsetX?: number;
	offsetY?: number;
	imgH?: number;
	/**
	 * Format conversion from float RGBA to packed integer.
	 */
	fmt: Fn<ReadonlyVec, number>;
}

export const rgbaBgra8888 = (rgba: ReadonlyVec) =>
	((clamp01(rgba[0]) * 255.5) << 0) |
	((clamp01(rgba[1]) * 255.5) << 8) |
	((clamp01(rgba[2]) * 255.5) << 16) |
	((clamp01(rgba[3]) * 255.5) << 24);

export const rgbaRgb565 = (rgba: ReadonlyVec) =>
	(((clamp01(rgba[0]) * 255.5) & 0xf8) << 8) |
	(((clamp01(rgba[1]) * 255.5) & 0xfc) << 3) |
	(((clamp01(rgba[2]) * 255.5) & 0xf8) >> 3);

const clampCoord = (x: number, maxW: number, w?: number) =>
	w !== undefined ? Math.min(x + w, maxW) : maxW;

/**
 * Low-level function used by {@link canvasRenderer} and {@link renderBuffer}.
 * Applies shader function `fn` to each pixel in the given region of the
 * `pixels` buffer (e.g. a `Uint32Array`). The render region is defined via
 * options. The top-left `x`, `y` coords and `w`, `h` dimensions. The remaining
 * parameters `bufW`, `bufH`, `bufOffsetX`, `bufOffsetY` and `imgH` are used to
 * define the actual location of the given buffer in the full image to be
 * computed and to support use cases where the target array only defines a
 * sub-region of the full image (e.g. when splitting rendering over multiple
 * workers, each with their own buffer).
 *
 * @param fn -
 * @param pixels -
 * @param opts
 */
export const renderPixels = (
	fn: Fn<ReadonlyVec, Vec>,
	pixels: UIntArray,
	{ x, y, w, h, bufW, bufH, offsetX, offsetY, imgH, fmt }: RenderPixelOpts
) => {
	offsetX = offsetX || 0;
	offsetY = offsetY || 0;
	imgH = (imgH || bufH) - 1 - offsetY;
	x = clamp(x || 0, 0, bufW);
	y = clamp(y || 0, 0, bufH);
	const x2 = clampCoord(x, bufW, w);
	const y2 = clampCoord(y, bufH, h);
	const fragCoord = [];
	for (let yy = y; yy < y2; yy++) {
		fragCoord[1] = imgH - yy;
		let i = yy * bufW + x;
		for (let xx = x; xx < x2; xx++) {
			fragCoord[0] = xx + offsetX;
			pixels[i++] = fmt(fn(fragCoord));
		}
	}
	return pixels;
};

/**
 * Takes a
 * [`IntBuffer`](https://docs.thi.ng/umbrella/pixel/classes/IntBuffer.html)
 * pixel buffer from thi.ng/pixel, and options to define a buffer-local render
 * region. Applies shader function `fn` to each pixel in that region (or the
 * full buffer by default).
 *
 * @remarks
 * In case the buffer only defines a sub-region of a larger image,
 * {@link RenderPixelOpts.offsetX}, {@link RenderPixelOpts.offsetY} and
 * {@link RenderPixelOpts.imgH} can be given to configure the location and full
 * image height.
 *
 * The default target pixel format is `ABGR8888` using {@link rgbaBgra8888} as
 * default {@link RenderPixelOpts.fmt} conversion.
 *
 * @param fn -
 * @param buf -
 * @param x -
 * @param y -
 * @param w -
 * @param h -
 * @param bufOffsetX -
 * @param bufOffsetY -
 * @param imgH -
 */
export const renderBuffer = (
	fn: Fn<ReadonlyVec, Vec>,
	buf: IntBuffer,
	opts?: Partial<RenderPixelOpts>
) => {
	renderPixels(fn, buf.data, {
		fmt: rgbaBgra8888,
		bufW: buf.width,
		bufH: buf.height,
		x: 0,
		y: 0,
		...opts,
	});
	return buf;
};

/**
 * Higher order function accepting an `HTMLCanvasElement` and returning a render
 * function which accepts the following parameters:
 *
 * - `fn` - shader function (compiled via `targetJS().compile(ast)`)
 * - `x`, `y`, `w`, `h` - optional args to define a sub-region to be updated
 *   (default to full image update)
 *
 * @param canvas -
 */
export const canvasRenderer = (canvas: HTMLCanvasElement) => {
	const buf = intBufferFromCanvas(canvas);
	const data = new ImageData(canvas.width, canvas.height);
	return (
		fn: Fn<ReadonlyVec, Vec>,
		x = 0,
		y = 0,
		w = canvas.width,
		h = canvas.height
	) => {
		renderBuffer(fn, buf, { x, y, w, h });
		buf.blitCanvas(canvas, { data });
	};
};

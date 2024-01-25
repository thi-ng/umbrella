import { canvas2d, type Canvas2DOpts } from "@thi.ng/canvas";
import { isNumber } from "@thi.ng/checks/is-number";
import type { RawPixelBuffer } from "./api.js";
import type { FloatBuffer } from "./float.js";
import type { IntBuffer } from "./int.js";

/**
 * Accepts either an existing canvas or creates a new one of given size.
 * Returns object of canvas, 2d context, img data and wrapped img data
 * as u32 ABGR pixel array.
 */
export function canvasPixels(canvas: HTMLCanvasElement): RawPixelBuffer;
export function canvasPixels(
	width: number,
	height?: number,
	parent?: HTMLElement | null,
	opts?: Partial<Canvas2DOpts>
): RawPixelBuffer;
export function canvasPixels(
	width: HTMLCanvasElement | number,
	height?: number,
	parent?: HTMLElement | null,
	opts?: Partial<Canvas2DOpts>
): RawPixelBuffer {
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	if (isNumber(width)) {
		const c = canvas2d(width, height, parent, opts);
		canvas = c.canvas;
		ctx = c.ctx;
	} else {
		canvas = width;
		ctx = canvas.getContext("2d")!;
	}
	if (parent) parent.appendChild(canvas);
	const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = new Uint32Array(img.data.buffer);
	return {
		canvas,
		ctx,
		img,
		data,
	};
}

/**
 * Creates an HTML canvas from the given pixel buffer and returns it. The canvas
 * can be attached/appended to a given `parent` element and configured via given
 * `opts`.
 *
 * @param buf
 * @param parent
 * @param opts
 */
export const canvasFromPixelBuffer = (
	buf: IntBuffer | FloatBuffer,
	parent?: HTMLElement | null,
	opts?: Partial<Canvas2DOpts>
) => {
	const { canvas } = canvas2d(buf.width, buf.height, parent, opts);
	buf.blitCanvas(canvas);
	return canvas;
};

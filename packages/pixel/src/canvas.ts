import { isNumber } from "@thi.ng/checks/is-number";
import type { RawPixelBuffer } from "./api.js";
import { canvas2d } from "@thi.ng/canvas";

/**
 * Accepts either an existing canvas or creates a new one of given size.
 * Returns object of canvas, 2d context, img data and wrapped img data
 * as u32 ABGR pixel array.
 */
export function canvasPixels(canvas: HTMLCanvasElement): RawPixelBuffer;
export function canvasPixels(width: number, height?: number): RawPixelBuffer;
export function canvasPixels(
	width: HTMLCanvasElement | number,
	height?: number
): RawPixelBuffer {
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	if (isNumber(width)) {
		const c = canvas2d(width, height);
		canvas = c.canvas;
		ctx = c.ctx;
	} else {
		canvas = width;
		ctx = canvas.getContext("2d")!;
	}
	const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = new Uint32Array(img.data.buffer);
	return {
		canvas,
		ctx,
		img,
		data,
	};
}

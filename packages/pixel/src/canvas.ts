import { isNumber } from "@thi.ng/checks/is-number";
import type { CanvasContext, RawPixelBuffer } from "./api.js";

/**
 * Creates a canvas element of given size, obtains its 2D drawing
 * context and returns object of both. If `parent` is given, the canvas
 * is appended to it as child.
 *
 * @param width -
 * @param height -
 * @param parent -
 */
export const canvas2d = (
    width: number,
    height = width,
    parent?: HTMLElement
): CanvasContext => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    parent && parent.appendChild(canvas);
    return {
        canvas,
        ctx: canvas.getContext("2d")!,
    };
};

/**
 * Accepts either an existing canvas or creates a new one of given size.
 * Returns object of canvas, 2d context, img data and wrapped img data
 * as u32 ABGR pixel array.
 */
export function canvasPixels(canvas: HTMLCanvasElement): RawPixelBuffer;
export function canvasPixels(width: number, height?: number): RawPixelBuffer;
// prettier-ignore
export function canvasPixels(width: HTMLCanvasElement | number, height?: number): RawPixelBuffer {
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
    const pixels = new Uint32Array(img.data.buffer);
    return {
        canvas,
        ctx,
        img,
        pixels
    };
}

/**
 * Creates canvas for given image and draws image, optionally with given
 * new size. If no width/height is given, the canvas will be of same
 * size as image. If `parent` is given, the canvas is appended to it as
 * child.
 *
 * @param img -
 * @param width -
 * @param height -
 * @param parent -
 */
export const imageCanvas = (
    img: HTMLImageElement,
    width?: number,
    height = width,
    parent?: HTMLElement
): CanvasContext => {
    const ctx = isNumber(width)
        ? canvas2d(width, height, parent)
        : canvas2d(img.width, img.height, parent);
    ctx.ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    return ctx;
};

/**
 * Async function. Loads image from given `src` URL. By default, the image will
 * have its `crossorigin` HTML attribute set to 'anonymous' to avoid errors with
 * tainted image data in canvas elements. Can be reconfigured via optional
 * `cors` arg.
 *
 * @remarks
 * Reference:
 * - https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
 * - https://stackoverflow.com/a/55136314/294515
 *
 * @param src -
 * @param cors -
 */
export const imagePromise = async (src: string, cors = "anonymous") => {
    const img = new Image();
    img.crossOrigin = cors;
    img.src = src;
    await img.decode();
    return img;
};

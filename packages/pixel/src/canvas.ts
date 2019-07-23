import { isNumber } from "@thi.ng/checks";
import { CanvasContext } from "./api";

/**
 * Creates a canvas element of given size, obtains its 2D drawing
 * context and returns object of both.
 *
 * @param width
 * @param height
 */
export const canvas2d = (width: number, height = width): CanvasContext => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return {
        canvas,
        ctx: canvas.getContext("2d")!
    };
};

/**
 * Creates a new canvas of given size and returns object of canvas, 2d
 * context, img data and wrapped img data as u32 ABGR pixel array.
 *
 * @param width
 * @param height
 */
export const canvasPixels = (width: number, height = width) => {
    const ctx = canvas2d(width, height);
    const img = ctx.ctx.getImageData(0, 0, width, height);
    const pix = new Uint32Array(img.data.buffer);
    return {
        ...ctx,
        img,
        pix
    };
};

/**
 * Creates canvas for given image and draws image, optionally with given
 * new size. If no width/height is given, the canvas will be of same
 * size as image.
 *
 * @param img
 * @param width
 * @param height
 */
export const imageCanvas = (
    img: HTMLImageElement,
    width?: number,
    height = width
): CanvasContext => {
    const ctx = isNumber(width)
        ? canvas2d(width, height)
        : canvas2d(img.width, img.height);
    ctx.ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    return ctx;
};

/**
 * Async function. Loads image from given `src` URL.
 *
 * @param src
 */
export const imagePromise = async (src: string) => {
    const img = new Image();
    img.src = src;
    await img.decode();
    return img;
};
